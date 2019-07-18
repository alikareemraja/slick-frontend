import React, { Component } from 'react'
import Comment from './Comment'

const commentStyle = {
    marginTop: '10px',
};

export default class Thread extends Component {

    state = {
        thread: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/comment/get/5d2d1e0294b2c46ded1c7baa')
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
                    <form>
                        <div className="form-group">
                            <label htmlFor="comment">Your Comment ({this.state.thread.length})</label>
                            <textarea name="comment" className="form-control" rows={3} defaultValue={""} />
                        </div>
                        <button type="submit" className="btn btn-default">Send</button>
                    </form>
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
                            <Comment comment={comment}/>
                        </div>
                        ))}
                        
                        
                    </div>
                </div>
            </div>

        )
    }
}
