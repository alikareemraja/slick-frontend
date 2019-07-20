import React, { Component } from 'react';
import UserService from './UserService';
import Thread from './Thread';
import ItemModal from './ItemModal';

export default class OwnedItemPage extends Component {

    static userId;

    constructor(props) {
        super(props);

        this.userId = UserService.getCurrentUser().id;
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        UserService.getOwnedItem(this.userId, this.props.match.params.itemId).then((data) => {
            console.log("OwnedItemPage got the data:");
            console.log(data);
            console.log("OwnedItemPage data has the keys: ");
            console.log(Object.keys(data));
            this.setState({
                item: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        {/* TODO: Add editItem */ }
        if (this.state.loading)
            return (<div>Loading your item...</div>);
        console.log("Rendering item_id: " + this.state.item._id);
        return (
            <div className="row d-flex justify-content-center">
                <div className="text-center">
                    <img src={this.state.item.imageURL} alt={this.state.item.title} style={{ "maxWidth": "300px", "maxHeight": "500px" }} />
                    <h4>{this.state.item.title}</h4>
                    <button data-toggle="modal" data-target="#itemModal" style={{whiteSpace: "pre"}} ><span className="glyphicon glyphicon-pencil" />  Edit your item</button>
            </div>
            <Thread userId={this.userId} itemId={this.state.item._id}/>
            <ItemModal title={this.state.item.title} imgSrc={this.state.item.imageURL} description={this.state.item.description} itemId={this.props.match.params.itemId}/>
            </div>
        );
    }
}