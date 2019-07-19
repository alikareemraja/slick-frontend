import React, { Component } from 'react'
import Comment from './Comment'

const commentStyle = {
    marginTop: '10px',
};

export default class Thread extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: [], text : "", refresh: false };
    }

    handleChange = (e) =>{ 
        this.setState({text: e.target.value});
      }

    reloadThread = (e) => {
        this.setState({refresh: !this.state.refresh})
        this.componentDidMount();
        console.log("updated!");
    }
    postComment = function (itemId, userId, text) {
        fetch('http://localhost:3001/comment/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: itemId,
                user: userId,
                date: new Date().getTime() / 1000,
                text: text,
            })
        }).then((data) => {
            console.log("success!")
            this.reloadThread();
        }).catch(console.log)

    }

    componentDidMount() {
        fetch('http://localhost:3001/comment/get/5d2a0555d20c25e7b4276e3e')
            .then(res => res.json())
            .then((data) => {
                this.setState({ thread: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <div className="post-comments">
                    <div>
                        <div className="form-group">
                            <label htmlFor="comment">Your Comment ({this.state.thread.length})</label>
                            <textarea name="comment" className="form-control" rows={3} value={this.state.text} onChange={this.handleChange} />
                        </div>
                        <button  onClick={this.postComment.bind(this, "5d2a0555d20c25e7b4276e3e", "5d2a04e2d20c25e7b4276e16", this.state.text)} className="btn btn-default">Post</button>
                    </div>
                    {/* <div className="comments-nav">
                        <ul className="nav nav-pills">
                            <li role="presentation" className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="fake_url" role="button" aria-haspopup="true" aria-expanded="false">
                                    there are 2593 comments <span className="caret" />
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="fake_url">Best</a></li>
                                    <li><a href="fake_url">Hot</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div> */}

                    <div className="row" style={commentStyle}>

                        {this.state.thread.map((comment) => (
                            <div >
                                <Comment comment={comment[0]} callback={this.reloadThread}/>
                            </div>
                        ))}


                    </div>
                </div>
            </div>

        )
    }
}
