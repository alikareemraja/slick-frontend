/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'


const actionButtonStyle = {
    margin: '2px',
};

export default class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.state = { editMode : false, updateText : "" };
    }

    handleChange = (e) =>{ 
        this.setState({updateText: e.target.value});
      }
    toggleEdit = (e) =>{
        this.setState(prevState => ({
            editMode: !prevState.editMode
          }));
    }

    toggleCollapse = (e) => {
        console.log('testing e',e)
        if (e.target.class === 'collapse') {
            e.target.className = 'collapse.in'
        } else {
            e.target.className = 'collapse'
        }
    }
    deleteComment = function (commentId) {
        fetch('http://localhost:3001/comment/delete/' + commentId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => 
            res.json()
            )
        .then((data) => {            
            console.log("success!")
            this.props.callback()
        })
        .catch(console.log)

    }

    replyToComment = function (userId, commentId, text) {
        fetch('http://localhost:3001/comment/add/' + commentId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId,
                date: new Date().getTime() / 1000,
                text: text,
            })
        }).then((data) => {
            console.log("success!")
            
            this.props.callback()
        }).catch(console.log)

    }

    updateComment = function (commentId, text) {
        fetch('http://localhost:3001/comment/update/' + commentId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
            })
        }).then((data) => {
            console.log("success!")
            this.props.callback()
            this.toggleEdit();
        }).catch(console.log)

    }

    render() {
        return (
            <div>
                <div className="media">
                    {/* first comment */}
                    <div className="media-heading">
                        <button className="btn btn-default btn-xs" type="button" data-toggle="collapse" data-target={"#collapse"+ this.props.comment._id} aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true" /></button> <span className="label label-info">12314</span> terminator {new Date(this.props.comment.date).toLocaleTimeString()  }
        </div>
                    <div className="panel-collapse collapse in" id={"collapse" + this.props.comment._id}>
                        <div className="media-left">
                            <div className="vote-wrap">
                                <div className="save-post">
                                    <a href="fake_url"><span className="glyphicon glyphicon-star" aria-label="Save" /></a>
                                </div>
                                <div className="vote up">
                                    <i className="glyphicon glyphicon-menu-up" />
                                </div>
                                <div className="vote inactive">
                                    <i className="glyphicon glyphicon-menu-down" />
                                </div>
                            </div>
                            {/* vote-wrap */}
                        </div>
                        {/* media-left */}
                        <div className="media-body">
                            <p>{ this.state.editMode ? null : this.props.comment.text}</p>
                            <div className="collapse" id={"editComment" + this.props.comment._id}>
                                    <div>
                                        <div className="form-group">
                                            <textarea name="comment" className="form-control" rows={3} defaultValue={this.props.comment.text} onChange={this.handleChange} />
                                        </div>
                                        <button data-toggle="collapse" href={"#editComment" + this.props.comment._id} onClick={this.updateComment.bind(this, this.props.comment._id, this.state.updateText)} className="btn btn-default">Update</button>
                                    </div>
                                </div>
                            <div className="comment-meta">
                                <span><a className role="button" onClick={this.deleteComment.bind(this, this.props.comment._id)} style={actionButtonStyle}>delete</a></span>
                                <span>
                                    <a className role="button" data-toggle="collapse" href={"#editComment" + this.props.comment._id} aria-expanded="false" aria-controls="collapseExample" onClick={this.toggleEdit}>edit</a>
                                </span>
                                <span>
                                    <a className role="button" data-toggle="collapse" href={"#replyComment" + this.props.comment._id} aria-expanded="false" aria-controls="collapseExample">reply</a>
                                </span>
                                <div className="collapse" id={"replyComment" + this.props.comment._id}>
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="comment">Your Comment</label>
                                            <textarea name="comment" className="form-control" rows={3} defaultValue={""} onChange={this.handleChange} />
                                        </div>
                                        <button data-toggle="collapse" href={"#replyComment" + this.props.comment._id} onClick={this.replyToComment.bind(this, "5d2a04e2d20c25e7b4276e16",this.props.comment._id, this.state.updateText)}  className="btn btn-default">Post</button>
                                    </div>
                                </div>
                            </div>
                            {/* comment-meta */}
                            {this.props.comment.replies.map((reply) => (
                                <div >
                                    <Comment comment={reply} callback={this.props.callback} />
                                    {/* {this.props.comment.replies.length > 0 ? <Comment comment={} /> : 'no replies here'} */}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* comments */}
                </div>
            </div>
        )
    }
}
