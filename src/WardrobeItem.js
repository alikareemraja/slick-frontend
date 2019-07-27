import React, { Component } from 'react';

const card = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    background: "#222d32",
    borderRadius: "5px",
    transition: "0.3s",
    maxWidth: "300px",
    minWidth: "150px",
    margin: "20px auto"
}

const styleDelButton = {
    position: "absolute",
    top: "5px",
    height: "30px",
    width: "30px",
    transform: "translate(-50%, 0%)",
    borderRadius: "25px",
    padding: "0px"
};

const styleImg = {
    borderRadius: "5px",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    padding: "3px 3px 0px 3px"
}

export default class WardrobeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        // Shorten the title so that it fits the title box
        let MAX_LENGTH = 15;
        if (this.props.item.title) {
            let len = this.props.item.title.length;
            console.log("title: " + this.props.item.title + ", length: " + this.props.item.title.length);
            if (len > MAX_LENGTH) {
                this.props.item.title = this.props.item.title.substring(0, MAX_LENGTH - 3) + "..."
            }
        }
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div style={card}>
                    
                    {this.props.isOwn ? <button className="btn btn-danger" style={styleDelButton} onClick={() => this.props.onDelete(this.props.item._id)}><span className="glyphicon glyphicon-remove" /></button> : null}

                    <div className="col" style={{ height: "350px", maxWidth: "300px", minWidth: "150px", }}>
                        <a href={this.props.link}>
                            <img src={"http://localhost:3001/items/photo/" + this.props.item._id} alt={this.props.item.title} style={styleImg} />
                        </a>
                    </div>

                    <div className="col text-center" style={{ maxWidth: "300px", padding: "5px 5px 5px 5px" }}>
                        <a href={this.props.link}>
                            <h4><b style={{ "color": "#ffffff" }}>{this.props.item.title} </b></h4>
                        </a>
                    </div>

                </div>
            </div>
        );
    }
}
