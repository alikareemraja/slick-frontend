import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';

export default class Wardrobe extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        {/* TODO: Fake data, remove after implementing data load from database
        this.state = {
            loading: false,            
            data: [{imageURL: "https://image.flaticon.com/icons/png/128/118/118781.png", title: "This is a very very very very long title my dear friend"}, {imageURL: "https://dictionary.cambridge.org/images/thumb/ball_noun_001_01090.jpg", title: "ball This is a very very very very long title my dear friend"}, {imageURL: "https://image.flaticon.com/icons/png/128/118/118781.png", title: "This is a very very very very long title my dear friend"},{imageURL: "https://dictionary.cambridge.org/images/thumb/ball_noun_001_01090.jpg", title: "ball"}]
        };*/}

        {/* TODO: Fake userId, get actual userId from cookie*/ }
        let fakeUserId = "5d0baa4849c47a1732d2b4e8";
        let defaultImgSrc = "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
        UserService.getOwnedItems(fakeUserId).then((data) => {
            console.log("Data: " + data.ownedItems + ", keys: " + Object.keys(data.ownedItems))
            this.setState({
                data: data.ownedItems,
                loading: false,
                imgSrc: defaultImgSrc
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    onFilePick = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                imgSrc: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    deleteOwnedItem(itemId) {
        // Make the user confirm before actually deleting the item
        if (!window.confirm("Are you sure? The item will be deleted if you click 'OK'."))
            return;

        {/* TODO: Fake userId, get actual userId from cookie*/ }
        let fakeUserId = "5d0baa4849c47a1732d2b4e8"
        UserService.deleteOwnedItem(fakeUserId, itemId).then((msg) => {
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
        {/* Add modifyItem? */ }
        if (this.state.loading) {
            return ("Loading the wardrobe...")
        }

        return (
            <div className="row">

                {/* Nav tabs */}
                <ul className="nav nav-tabs row">
                    <li className="nav-item col-sm-5 active">
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
                                            <h5 class="modal-title" id="modalTitle">Add new item</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form class="col">
                                                <div class="form-group">
                                                    <input id="filePicker" type="file" class="form-control-file" accept=".gif,.jpg,.jpeg,.png" onChange={this.onFilePick} />
                                                </div>

                                                <div class="form-group">
                                                    <img id="image" src={this.state.imgSrc} alt="File to upload" style={{ maxWidth: "200px", maxHeight: "200px" }} class=""></img>
                                                </div>

                                                <div class="form-group">
                                                    <label for="title">Title:</label>
                                                    <input type="text" class="form-control" id="title" placeholder="Title" required />
                                                </div>

                                                <div class="form-group">
                                                    <label for="description">Description:</label>
                                                    <textarea class="form-control" rows="5" id="description" placeholder="Description"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Add to Wardrobe</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Each item in OwnedItems is displayed in a WardrobeItem */}
                            {this.state.data.map((item) => { return (<WardrobeItem key={item._id} item={item} onDelete={(itemId) => this.deleteOwnedItem(itemId)} />); })}
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
        );
    }
}
