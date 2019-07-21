/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import CommentService from './CommentService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import UserService from './UserService'

const actionButtonStyle = {
    margin: '2px',
};


export default class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.getUser(this.props.userId);
        this.state = { editMode : false, updateText : "", userName : "", loggedInUser : "" };
        var user = UserService.getCurrentUser()
        this.state.loggedInUser =  UserService.getCurrentUser().id;
        var result = props.userId === this.state.loggedInUser;
        
        
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
        CommentService.deleteComment(commentId)
        .then((data) => {            
            console.log("success!")
            NotificationManager.success('Comment Deleted');
            this.props.callback()
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Comment Failed to delete');
        })

    }

    castVote = function(vote){
        
        CommentService.castVote(this.props.comment._id, this.props.comment.votes + vote )
        .then((data) => {
            NotificationManager.success('Vote cast');
            this.props.callback()
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Failed to cast vote');
        })
    }

    replyToComment = function (userId, commentId, text) {
        CommentService.replyToComment(userId, commentId, text)
        .then((data) => {
            console.log("success!")
            this.setState({updateText: ""});
            NotificationManager.success('Reply posted');
            this.props.callback()
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Reply Failed to post');
        })

    }

    getUser = function(userId){

        CommentService.getUser(userId)
        .then((data) => {
            console.log("success!")
            this.setState({userName: data.username});
            this.props.callback()
            
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('User details not found');
        })
        
    }

    updateComment = function (commentId, text) {
        CommentService.updateComment(commentId, text)
        .then((data) => {
            console.log("success!")
            this.setState({updateText: ""});
            this.props.callback()
            NotificationManager.success('Comment updated');
            this.toggleEdit();
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Comment Failed to update');
        })

    }

    render() {
        return (
            <div style={{marginTop: "15px"}}>
                <div className="media">
                    {/* first comment */}
                    <div className="media-heading">
                        <button className="btn btn-default btn-xs" type="button" data-toggle="collapse" data-target={"#collapse"+ this.props.comment._id} aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true" /></button> <span className="label label-info">{this.props.comment.votes}</span> {this.state.userName} {new Date(this.props.comment.date).toLocaleTimeString()  }
        </div>
                    <div className="panel-collapse collapse in" id={"collapse" + this.props.comment._id}>
                        <div className="media-left">
                            <div className="vote-wrap">
                                {/* <div className="save-post">
                                    <a href="fake_url"><span className="glyphicon glyphicon-star" aria-label="Save" /></a>
                                </div> */}
                                <div className="vote up">
                                    <i className="glyphicon glyphicon-menu-up" onClick={this.castVote.bind(this, 1)} style={{cursor: "pointer"}} />
                                </div>
                                <div className="vote inactive">
                                <i className="glyphicon glyphicon-menu-down" onClick={this.castVote.bind(this, -1)} style={{cursor: "pointer"}} />
                                </div>
                            </div>
                            {/* vote-wrap */}
                        </div>
                        {/* media-left */}
                        <div className="media-body">
                            <p>{ this.state.editMode ? null : this.props.comment.text} </p>
                            <div className="collapse" id={"editComment" + this.props.comment._id}>
                                    <div>
                                        <div className="form-group">
                                            <textarea name="comment" className="form-control" rows={3} defaultValue={this.props.comment.text} onChange={this.handleChange} />
                                        </div>
                                        <button data-toggle="collapse" href={"#editComment" + this.props.comment._id} onClick={this.updateComment.bind(this, this.props.comment._id, this.state.updateText)} className="btn btn-default">Update</button>
                                    </div>
                                </div>
                            <div className="comment-meta">
                                { this.state.loggedInUser === this.props.userId ? 
                                <span><a className role="button" onClick={this.deleteComment.bind(this, this.props.comment._id)} style={actionButtonStyle}>Delete</a></span> : null
                                }
                                
                                { this.state.loggedInUser === this.props.userId ? 
                                <span>
                                <a className role="button" data-toggle="collapse" href={"#editComment" + this.props.comment._id} style={actionButtonStyle} aria-expanded="false" aria-controls="collapseExample" onClick={this.toggleEdit}>Edit</a>
                                </span>: null
                                }
                                
                                <span>
                                    <a className role="button" data-toggle="collapse" href={"#replyComment" + this.props.comment._id} style={actionButtonStyle} aria-expanded="false" aria-controls="collapseExample">Reply</a>
                                </span>
                                <div className="collapse" id={"replyComment" + this.props.comment._id}>
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="comment">Your Comment</label>
                                            <textarea name="comment" className="form-control" rows={3} defaultValue={""} onChange={this.handleChange} />
                                        </div>
                                        <button data-toggle="collapse" href={"#replyComment" + this.props.comment._id} onClick={this.replyToComment.bind(this, this.props.userId, this.props.comment._id, this.state.updateText)}  className="btn btn-default">Post</button>
                                    </div>
                                </div>
                            </div>
                            {/* comment-meta */}
                            {this.props.comment.replies.map((reply) => (
                                <div >
                                    <Comment comment={reply} userId={this.props.userId} callback={this.props.callback} />
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
