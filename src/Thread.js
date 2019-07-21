import React, { Component } from 'react'
import Comment from './Comment'
import CommentService from './CommentService'
import UserService from './UserService'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const commentStyle = {
    marginTop: '10px',
};

export default class Thread extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: [], text : "", refresh: false , loggedInUser: ""};
        this.state.loggedInUser =  UserService.getCurrentUser().id;
    }

    handleChange = (e) =>{ 
        this.setState({text: e.target.value});
      }

    reloadThread = (e) => {
        this.setState({refresh: !this.state.refresh})
        this.componentDidMount();
        console.log("updated!");
    }
    postComment = function (itemId, text) {
        if(text === "" || text === undefined){
            NotificationManager.warning('Cannot post empty comment');
            return;
        } 
        CommentService.postComment(itemId, this.state.loggedInUser, text)
        .then((data) => {
            console.log("success!")
            this.setState({text: ""});
            NotificationManager.success('Comment Posted');
            this.reloadThread();
        }).catch(console.log)

    }

    componentDidMount() {
        
        CommentService.getComments(this.props.itemId)
            .then((data) => {
                this.setState({ thread: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <div className="post-comments">
                    <div className="row">
                    <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label htmlFor="comment" >Your Comment</label>
                            <textarea name="comment" className="form-control" style={{"maxWidth":"600px", "margin":"0 auto"}} rows={3} value={this.state.text} onChange={this.handleChange} />
                        </div>
                        <button  onClick={this.postComment.bind(this, this.props.itemId, this.state.text)} className="btn btn-default">Post</button>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="row" style={commentStyle}>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                    {this.state.thread.map((comment) => (
                            <div >
                                <Comment comment={comment[0]}  callback={this.reloadThread}/>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-3"></div>
                    </div>
                </div>
            </div>

        )
    }
}
