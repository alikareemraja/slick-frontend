import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';

export default class Wardrobe extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        {/* TODO: Fake data, remove after implementing data load from database
        this.state = {
            loading: false,            
            data: [{imageURL: "https://image.flaticon.com/icons/png/128/118/118781.png", title: "This is a very very very very long title my dear friend"}, {imageURL: "https://dictionary.cambridge.org/images/thumb/ball_noun_001_01090.jpg", title: "ball This is a very very very very long title my dear friend"}, {imageURL: "https://image.flaticon.com/icons/png/128/118/118781.png", title: "This is a very very very very long title my dear friend"},{imageURL: "https://dictionary.cambridge.org/images/thumb/ball_noun_001_01090.jpg", title: "ball"}]
        };*/}

        {/* TODO: Fake userId, get actual userId from cookie*/}
        let fakeUserId = "5d0baa4849c47a1732d2b4e8"
        UserService.getOwnedItems(fakeUserId).then((data) => {
            console.log("Data: " + data.ownedItems + ", keys: " + Object.keys(data.ownedItems))
            this.setState({
                data: data.ownedItems,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        {/* Check whether deleteOwnedItem works -> It does
    UserService.deleteOwnedItem(fakeUserId, "5d2ef28a1b848d2f582a3cd1")*/}
    }
    
    deleteOwnedItem(itemId) {
        {/* TODO: Fake userId, get actual userId from cookie*/}
        let fakeUserId = "5d0baa4849c47a1732d2b4e8"
        UserService.deleteOwnedItem(fakeUserId, itemId).then((msg) => {
            console.log(msg);
            this.setState({
                data: this.state.data.filter(item => item._id != itemId),
                loading: false
            });
        }).catch((e) => {
            console.log(e);

        });
    }

    render() {
    {/* Add modifyItem? */}
    if(this.state.loading){
        return("Loading the wardrobe...")
    }
    else{
        return (<div className="row">

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
                    {/* There should be owned items here */}
                        {this.state.data.map((item) => {return(<WardrobeItem key={item._id} item={item} onDelete={(itemId) => this.deleteOwnedItem(itemId)}/>);})}
                    </div>
                    <div className="text-center">
                        You have {this.state.data.length} item(s) in your wardrobe.
                    </div>
                </div>
                <div className="tab-pane" id="wishlist">
                    This is wishlist
                    {/* There should be owned items here */}
                    {/*<WardrobeItem />*/}
                    </div>
            </div>

            {/* TODO: Add big plus sign to open add-item-popup*/}
            </div>
);
}
    }
}
