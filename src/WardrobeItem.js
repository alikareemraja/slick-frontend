import React, { Component } from 'react';

export default class WardrobeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };

        // Shorten the title so that it fits the title box
        let MAX_LENGTH = 34;
        let len = this.props.item.title.length;
        console.log("title: " + this.props.item.title + ", length: " + this.props.item.title.length);
        if (len > MAX_LENGTH){
            this.props.item.title = this.props.item.title.substring(0, MAX_LENGTH-3) + "..."
        }
    }

    render() {        
        return(
        <div className="col-sm-4" style={{"marginTop": "10px"}}>
            <div className="text-center">
                <img src={this.props.item.imageURL} alt={this.props.item.title} style={{"maxWidth": "200px", "maxHeight": "200px"}}/>
                {/* TODO: Ask the user if they are sure before deleting */}
                <button className="btn btn-danger" style={{"position": "absolute", "top": "0", "height": "35px", "width": "35px", "transform": "translate(-100%, 0)"}} onClick={() => this.props.onDelete(this.props.item._id)}>X</button>
                <h4>{this.props.item.title}</h4>
            </div>
            {/* TODO: Add link on image div to pop-up item modal*/}
        </div>
        );
    }
}