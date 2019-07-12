import React, { Component } from 'react'

const commentStyle = {
    marginTop: '10px',
  };
const actionButtonStyle = {
    margin: '2px',
};
export default class Comment extends Component {
    render() {
        return (
            <div className="container">
                <div className="post-comments">
                    <form>
                        <div className="form-group">
                            <label htmlFor="comment">Your Comment</label>
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
                        <div className="media">
                            {/* first comment */}
                            <div className="media-heading">
                                <button className="btn btn-default btn-xs" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true" /></button> <span className="label label-info">12314</span> terminator 12 hours ago
        </div>
                            <div className="panel-collapse collapse in" id="collapseOne">
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
                                    <p>yazmayın artık amk, görmeyeyim sol framede. insan bi meraklanıyor, ümitleniyor. sonra yine özlem dolu yazıları görüp hayal kırıklığıyla okuyorum.</p>
                                    <div className="comment-meta">
                                        <span><a href="fake_url" style={actionButtonStyle}>delete</a></span>
                                        <span><a href="fake_url" style={actionButtonStyle}>report</a></span>
                                        <span><a href="fake_url" style={actionButtonStyle}>hide</a></span>
                                        <span>
                                            <a className role="button" data-toggle="collapse" href="#replyCommentT" aria-expanded="false" aria-controls="collapseExample">reply</a>
                                        </span>
                                        <div className="collapse" id="replyCommentT">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="comment">Your Comment</label>
                                                    <textarea name="comment" className="form-control" rows={3} defaultValue={""} />
                                                </div>
                                                <button type="submit" className="btn btn-default">Send</button>
                                            </form>
                                        </div>
                                    </div>
                                    {/* comment-meta */}
                                    <div className="media">
                                        {/* answer to the first comment */}
                                        <div className="media-heading">
                                            <button className="btn btn-default btn-collapse btn-xs" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseExample"><span className="glyphicon glyphicon-minus" aria-hidden="true" /></button> <span className="label label-info">12314</span> vertu 12 sat once yazmis
              </div>
                                        <div className="panel-collapse collapse in" id="collapseTwo">
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
                                                <p>yazmayın artık amk, görmeyeyim sol framede. insan bi meraklanıyor, ümitleniyor. sonra yine özlem dolu yazıları görüp hayal kırıklığıyla okuyorum.</p>
                                                <div className="comment-meta">
                                                    <span><a href="fake_url" style={actionButtonStyle}>delete</a></span>
                                                    <span><a href="fake_url" style={actionButtonStyle}>report</a></span>
                                                    <span><a href="fake_url" style={actionButtonStyle}>hide</a></span>
                                                    <span>
                                                        <a className role="button" data-toggle="collapse" href="#replyCommentThree" aria-expanded="false" aria-controls="collapseExample">reply</a>
                                                    </span>
                                                    <div className="collapse" id="replyCommentThree">
                                                        <form>
                                                            <div className="form-group">
                                                                <label htmlFor="comment">Your Comment</label>
                                                                <textarea name="comment" className="form-control" rows={3} defaultValue={""} />
                                                            </div>
                                                            <button type="submit" className="btn btn-default">Send</button>
                                                        </form>
                                                    </div>
                                                </div>
                                                {/* comment-meta */}
                                            </div>
                                        </div>
                                        {/* comments */}
                                    </div>
                                    {/* answer to the first comment */}
                                </div>
                            </div>
                            {/* comments */}
                        </div>
                    </div>
                </div>
                {/* post-comments */}
            </div>

        )
    }
}
