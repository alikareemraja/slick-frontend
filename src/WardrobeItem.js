import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const card = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    background: "#222d32",
    borderRadius: "5px",
    transition: "0.3s",
    maxWidth: "300px",
    maxHeight: "400px",

    margin: "20px 20px"
}
const card_hover = {
    ".card:hover": { boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }
};

const container = { padding: "2px 16px" };


export default class WardrobeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        // Shorten the title so that it fits the title box
        let MAX_LENGTH = 34;
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
            <div className="col-lg-3">
                <div style={card}  >
                    {/*<Link to={this.props.link}><img src={this.props.item.imageURL} alt="Avatar" style={{ width: '100%' }} /> </Link>*/}
                    <a href={this.props.link}><img src={this.props.item.imageURL} alt={this.props.item.title} style={{ width: '100%' }} /> </a>
                    <div style={container}>
                        {this.props.isOwn ? <button className="btn btn-danger" style={{ "position": "absolute", "top": "5px", "height": "35px", "width": "35px", "transform": "translate(-100%, 0)", "borderRadius": "25px" }} onClick={() => this.props.onDelete(this.props.item._id)}>X</button> : null}
                        <h4><b style={{ "color": "#ffffff" }}>{this.props.item.title}</b></h4>

                    </div>
                </div>
            </div>

            // <div className="col-sm-4" style={{ "marginTop": "10px" }}>
            //     <div className="text-center">
            //     <Link to={"/wardrobe/ownedItem/" + this.props.item._id}><img src={this.props.item.imageURL} alt={this.props.item.title} style={{ "maxWidth": "200px", "maxHeight": "200px" }} /></Link>
            //         <button className="btn btn-danger" style={{ "position": "absolute", "top": "0", "height": "35px", "width": "35px", "transform": "translate(-100%, 0)" }} onClick={() => this.props.onDelete(this.props.item._id)}>X</button>
            //         <h4>{this.props.item.title}</h4>
            //     </div>
            //     {/* TODO: Add link on image div to pop-up item modal*/}
            // </div>
        );
    }
}
