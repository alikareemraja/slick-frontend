import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';
import ItemModal from './ItemModal';

export default class Wardrobe extends Component {

    static defaultImgSrc;
    static userId;
    static itemCount;
    constructor(props) {
        super(props);

        this.defaultImgSrc = "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
        this.userId = UserService.getCurrentUser().id;
        console.log("Loading wardrobe for userid: " + this.userId);

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
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemModal" style={{ position: "fixed", bottom: "10px", right: "10px", width: "80px", height: "80px", borderRadius: "100%", fontSize: "50px", lineHeight: "50px", paddingTop: "0px", zIndex: "99" }}>+</button>

                                <ItemModal />

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
