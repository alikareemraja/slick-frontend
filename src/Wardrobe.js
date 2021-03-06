import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';
import ItemModal from './ItemModal';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class Wardrobe extends Component {

    static defaultImgSrc;
    static userId;
    constructor(props) {
        super(props);
        this.defaultImgSrc = "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
        this.userId = UserService.getCurrentUser().id;
    }

    componentWillMount(props) {
        let uid
        if (this.props.userId) {
            uid = this.props.userId
        }
        else if (this.props.match && this.props.match.params.uid) {
            uid = this.props.match.params.uid
        }
        else {
            window.location = "/home/"
        }
        this.setState({
            loading: true,
            addItemImgSrc: this.defaultImgSrc,
            ownedItems: [],
            wishlistItems: [],
            friends: [],
            isOwnPage: UserService.getCurrentUser().id === uid,
            userId: uid
        });

        console.log("Loading wardrobe of userid: " + uid + ", current userid: " + this.userId);

        UserService.getOwnedItems(uid).then((data) => {
            console.log("Owned Items Data: " + data)
            this.setState({
                ownedItems: data.ownedItems
            });
        }).then(
            UserService.getWishlistItems(uid).then((data) => {
                console.log("Wishlist Items Data: ")
                console.log(data);
                this.setState({
                    wishlistItems: data
                });
            })).then(
                UserService.getFriends(uid).then((data) => {
                    console.log("Friends Data: ")
                    console.log(data);
                    this.setState({
                        friends: data,
                        loading: false
                    });
                })).catch((e) => {
                    console.error(e);
                });


    }

    deleteOwnedItem(itemId) {
        // Make the user confirm before actually deleting the item
        if (!window.confirm("Are you sure? The item will be deleted if you click 'OK'."))
            return;

        UserService.deleteOwnedItem(this.userId, itemId).then((msg) => {
            console.log(msg);
            NotificationManager.success("Item deleted");
            this.setState({
                ownedItems: this.state.ownedItems.filter(item => item._id !== itemId),
                loading: false
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    deleteWishlistItem(itemId) {
        // Make the user confirm before actually deleting the item
        if (!window.confirm("Are you sure? The item will be deleted if you click 'OK'."))
            return;

        UserService.deleteWishlistItem(this.userId, itemId).then((msg) => {
            console.log(msg);
            NotificationManager.success("Deleted from wishlist");
            this.setState({
                wishlistItems: this.state.wishlistItems.filter(item => item._id !== itemId),
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
                        Wardrobe<small>your custom choice</small>
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
                        <li className="nav-item col-sm-4 active" >
                            <a data-toggle="tab" href="#owned">Owned Items</a>
                        </li>
                        <li className="nav-item col-sm-4">
                            <a data-toggle="tab" href="#wishlist">Wishlist</a>
                        </li>
                        <li className="nav-item col-sm-4">
                            <a data-toggle="tab" href="#friends">Friends</a>
                        </li>
                    </ul>

                    {/* Nav panes */}
                    <div className="tab-content">

                        <div className="tab-pane active" id="owned">
                            {/* Big plus button, a modal shows up when clicked */}
                            {this.state.isOwnPage ? <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemModal" style={{ position: "fixed", bottom: "60px", right: "10px", width: "80px", height: "80px", borderRadius: "100%", fontSize: "50px", lineHeight: "50px", paddingTop: "0px", zIndex: "99" }}>+</button> : null}

                            <ItemModal />

                            <div className="row" style={{ margin: "0px 0px 0px 0px" }}>
                                {this.state.ownedItems.map((item) => {
                                    return (
                                        <WardrobeItem key={item._id} item={item} onDelete={(itemId) => this.deleteOwnedItem(itemId)} link={"/home/user/" + this.state.userId + "/ownedItem/" + item._id} isOwn={this.state.isOwnPage} />
                                    );
                                })
                                }
                            </div>
                            <div className="text-center">
                                There are {this.state.ownedItems.length} item(s) in the wardrobe.
                            </div>
                        </div>

                        <div className="tab-pane" id="wishlist">
                            <div className="row" style={{ margin: "0px 0px 0px 0px" }}>
                                {this.state.wishlistItems.map((item) => {
                                    return (
                                        <WardrobeItem key={item._id} item={item} onDelete={(itemId) => { this.deleteWishlistItem(itemId) }} link={"/home/show/" + item._id} isOwn={this.state.isOwnPage} />
                                    );
                                })
                                }
                            </div>
                            <div className="text-center">
                                There are {this.state.wishlistItems.length} item(s) in the wishlist.
                            </div>
                        </div>

                        <div className="tab-pane" id="friends">
                            <div className="row" style={{ margin: "0px 0px 0px 0px" }}>
                                {this.state.friends.map((item) => {
                                    item["title"] = item.name;
                                    return (
                                        <WardrobeItem key={item._id} item={item} onDelete={(itemId) => { }} link={"/home/user/" + item._id} isOwn={this.state.isOwnPage} />
                                    );
                                })
                                }
                            </div>
                            <div className="text-center">
                                There are {this.state.friends.length} friend(s).
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
