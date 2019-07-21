import React, { Component } from 'react';
import UserService from './UserService';
import Thread from './Thread';
import ItemModal from './ItemModal';

export default class OwnedItemPage extends Component {


    constructor(props) {
        super(props);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        UserService.getOwnedItem(this.props.match.params.uid, this.props.match.params.itemId).then((data) => {
            console.log("OwnedItemPage got the data:");
            console.log(data);
            console.log("OwnedItemPage data has the keys: ");
            console.log(Object.keys(data));
            this.setState({
                item: data,
                loading: false,
                isOwnPage: UserService.getCurrentUser().id === this.props.match.params.uid,
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
            <div>
                <section className="content-header">
                    <h1>
                        Wardrobe
              <small>your custom choice</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/home"> <i className="fa fa-dashboard" /> Home</a>
                        </li>
                        <li>
                            <a href="/home"> <i /> Wardrobe</a>
                        </li>
                        <li className="active">Item</li>
                    </ol>
                </section>
                <div className="row d-flex justify-content-center">
                    <div className="text-center">
                        <img src={this.state.item.imageURL} alt={this.state.item.title} style={{ "maxWidth": "600px", "maxHeight": "600px", "minWidth": "350px", "minHeight": "350px", "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)", "borderRadius": "5px" }} />
                        <h4>{this.state.item.title}</h4>
                        {this.state.isOwnPage ? <button data-toggle="modal" data-target="#itemModal" style={{ whiteSpace: "pre" }} ><span className="glyphicon glyphicon-pencil" />  Edit your item</button> : null}
                    </div>
                    <Thread userId={this.userId} itemId={this.state.item._id} />
                    <ItemModal title={this.state.item.title} imgSrc={this.state.item.imageURL} description={this.state.item.description} itemId={this.props.match.params.itemId} />
                </div>
            </div>

        );
    }
}