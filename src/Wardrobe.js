import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';

export default class Wardrobe extends Component {

    static defaultImgSrc;
    static userId;
    static itemCount;
    constructor(props) {
        super(props);

        this.defaultImgSrc = "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
        this.userId = UserService.getCurrentUser().id;
        console.log("Loading wardrobe for userid: " + this.userId);

        this.handleAddItemFormChange = this.handleAddItemFormChange.bind(this);
        this.handleAddItemFormSubmit = this.handleAddItemFormSubmit.bind(this);
        this.itemCount = 0;
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });


        UserService.getOwnedItems(this.userId).then((data) => {
            console.log("Data: " + data.ownedItems + ", keys: " + Object.keys(data.ownedItems))
            this.setState({
                data: data.ownedItems,
                loading: false,
                addItemImgSrc: this.defaultImgSrc
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    handleAddItemFormChange(event) {
        if (event.target && event.target.id && event.target.value) {
            switch (event.target.id) {
                case "title":
                    this.setState({
                        addItemTitle: event.target.value
                    });
                    break;
                case "description":
                    this.setState({
                        addItemDescription: event.target.value
                    });
                    break;
                case "filePicker":
                    if (event.target.files && event.target.files[0]) {
                        this.setState({
                            addItemImgSrc: URL.createObjectURL(event.target.files[0])
                        });
                    }
                    break;
                default:
            }
        }
    }

    handleAddItemFormSubmit(event) {
        if (!window.confirm("Are you sure? The item will be added to your wardrobe if you click 'OK'.")) {
            event.preventDefault();
            return;
        }

        console.log("AddItemForm is submitted.");
        let item = {
            title: this.state.addItemTitle,
            imageURL: this.state.addItemImgSrc,
            description: this.state.addItemDescription
        }
        console.log("The submitted item is: ");
        console.log(item)
        UserService.addOwnedItem(this.userId, item).then((msg) => {
            console.log(msg);
        }).catch((e) => {
            console.log(e);
        });
    }

    deleteOwnedItem(itemId) {
        // Make the user confirm before actually deleting the item
        if (!window.confirm("Are you sure? The item will be deleted if you click 'OK'."))
            return;

        UserService.deleteOwnedItem(this.userId, itemId).then((msg) => {
            console.log(msg);
            this.setState({
                data: this.state.data.filter(item => item._id !== itemId),
                loading: false
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return ("Loading the wardrobe...")
        }

        return (
            <div>
                <section className="content-header">
                    <h1>
                        Wardrobe
              <small>your custom choice</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/home">
                                <i className="fa fa-dashboard" /> Home
                </a>
                        </li>
                        <li className="active">Wardrobe</li>
                    </ol>
                </section>
                <div className="row">

                    {/* Nav tabs */}
                    <ul className="nav nav-tabs row">
                        <li className="nav-item col-sm-5 active" >
                            <a data-toggle="tab" href="#owned">Owned Items</a>
                        </li>
                        <li className="nav-item col-sm-5">
                            <a data-toggle="tab" href="#wishlist">Wishlist</a>
                        </li>
                    </ul>

                    {/* Nav panes */}
                    <div className="tab-content">
                        <div className="tab-pane active" id="owned">
                            <div className="row">

                                {/* Big plus button, a modal shows up when clicked */}
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addItemModal" style={{ position: "fixed", bottom: "10px", right: "10px", width: "80px", height: "80px", borderRadius: "100%", fontSize: "50px", lineHeight: "50px", paddingTop: "0px", zIndex: "99" }}>+</button>

                                {/* Modal that contains add item form */}
                                <div class="modal fade" id="addItemModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h3 class="modal-title" id="modalTitle">Add new item
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button></h3>
                                            </div>
                                            <form onSubmit={this.handleAddItemFormSubmit}>
                                                <div class="modal-body">
                                                    <div class="col">
                                                        <div class="form-group">
                                                            <input id="filePicker" type="file" class="form-control-file" accept=".gif,.jpg,.jpeg,.png" onChange={this.handleAddItemFormChange} />
                                                        </div>

                                                        <div class="form-group">
                                                            <img id="image" src={this.state.addItemImgSrc} alt="File to upload" style={{ maxWidth: "200px", maxHeight: "200px" }} class=""></img>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="title">Title:</label>
                                                            <input type="text" class="form-control" id="title" placeholder="Title" required={true} onChange={this.handleAddItemFormChange} />
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="description">Description:</label>
                                                            <textarea class="form-control" rows="5" id="description" placeholder="Description" onChange={this.handleAddItemFormChange}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Add to Wardrobe</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Each item in OwnedItems is displayed in a WardrobeItem */}
                                {this.state.data.map((item) => {
                                    return (

                                        <WardrobeItem key={item._id} item={item} onDelete={(itemId) => this.deleteOwnedItem(itemId)} />

                                    );
                                })}
                            </div>



                            {/* Show number of items in OwnedItems */}
                            <div className="text-center">
                                You have {this.state.data.length} item(s) in your wardrobe.
                    </div>
                        </div>
                        <div className="tab-pane" id="wishlist">
                            This is wishlist
                    {/* There should be wishlist items here */}
                            {/*<WardrobeItem />*/}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
