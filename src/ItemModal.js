import React, { Component } from 'react';

import WardrobeItem from './WardrobeItem';
import UserService from './UserService';

export default class Wardrobe extends Component {

    static defaultImgSrc;
    static userId;
    static itemId;

    constructor(props) {
        super(props);

        this.defaultImgSrc = "http://icons.iconarchive.com/icons/iconsmind/outline/256/T-Shirt-icon.png";
        this.userId = UserService.getCurrentUser().id;
        this.itemId = this.props.itemId;

        this.state = {
            imgSrc: this.props.imgSrc ? this.props.imgSrc : this.defaultImgSrc,
            title: this.props.title,
            description: this.props.description,
            isAdd: this.props.title === undefined,
        };

        console.log("Item model was called with " + Object.keys(this.props).length + " props. They are:");
        console.log(this.state);

        console.log("Loading wardrobe for userid: " + this.userId);

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(event) {
        if (event.target && event.target.id && event.target.value) {
            switch (event.target.id) {
                case "title":
                    this.setState({
                        title: event.target.value
                    });
                    break;
                case "description":
                    this.setState({
                        description: event.target.value
                    });
                    break;
                case "filePicker":
                    if (event.target.files && event.target.files[0]) {
                        this.setState({
                            imgSrc: URL.createObjectURL(event.target.files[0])
                        });
                    }
                    break;
                default:
            }
        }
    }

    handleFormSubmit(event) {
        console.log("ItemForm is submitted. IsAdd: " + this.state.isAdd);
        let item = {
            title: this.state.title,
            imageURL: this.state.imgSrc,
            description: this.state.description
        }
        console.log("The submitted item is: ");
        console.log(item)
        console.log("State is: ");
        console.log(this.state);

        if (this.state.isAdd) {
            if (!window.confirm("Are you sure? The item will be added to your wardrobe if you click 'OK'.")) {
                event.preventDefault();
                return;
            }

            console.log("User said OK.")

            UserService.addOwnedItem(this.userId, item).then((msg) => {
                console.log(msg);
            }).catch((e) => {
                console.log(e);
            });
        }
        else {
            item._id = this.itemId;
            UserService.updateOwnedItem(this.userId, this.itemId, item).then((msg) => {
                console.log(msg);
            }).catch((e) => {
                console.log(e);
            });
        }

    }

    render() {
        return (
            <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modalTitle">{this.state.isAdd ? "Add new item" : "Edit your item"}
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button></h3>
                        </div>
                        <form onSubmit={this.handleFormSubmit}>
                            <div class="modal-body">
                                <div class="col">
                                    <div class="form-group">
                                        <input id="filePicker" type="file" class="form-control-file" accept=".gif,.jpg,.jpeg,.png" onChange={this.handleFormChange} />
                                    </div>

                                    <div class="form-group">
                                        <img id="image" src={this.state.imgSrc} alt="File to upload" style={{ maxWidth: "200px", maxHeight: "200px" }} class=""></img>
                                    </div>

                                    <div class="form-group">
                                        <label for="title">Title:</label>
                                        <input type="text" class="form-control" id="title" placeholder="Title" required={true} onChange={this.handleFormChange} value={this.state.title} />
                                    </div>

                                    <div class="form-group">
                                        <label for="description">Description:</label>
                                        <textarea class="form-control" rows="5" id="description" placeholder="Description" onChange={this.handleFormChange} value={this.state.description}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">{this.state.isAdd ? "Add to Wardrobe" : "Edit Item"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}