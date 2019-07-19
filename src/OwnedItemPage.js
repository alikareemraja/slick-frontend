import React, { Component } from 'react';
import UserService from './UserService';
import Thread from './Thread';

export default class OwnedItemPage extends Component {

    static fakeUserId;

    constructor(props) {
        super(props);

        this.fakeUserId = "5d0baa4849c47a1732d2b4e8";
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        {/* TODO: Fake userId, get actual userId from cookie*/ }
        UserService.getOwnedItem(this.fakeUserId, this.props.match.params.itemId).then((data) => {
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
        if (this.state.loading)
            return (<div>Loading your item...</div>);
        console.log("Rendering item_id: " + this.state.item._id);
        return (
            <div className="row d-flex justify-content-center">
                <div className="text-center">
                    <img src={this.state.item.imageURL} alt={this.state.item.title} style={{ "maxWidth": "200px", "maxHeight": "200px" }} />
                    <h4>{this.state.item.title}</h4>
                </div>
                {/* TODO: Change fakeuserId with the real one*/}
                {console.log("Passing itemId: " + this.props.match.params.id + " to Thread.")}
                {/*<Thread userId={this.fakeUserId} itemId={this.state.item._id}/>*/}
            </div>
        );
    }
}