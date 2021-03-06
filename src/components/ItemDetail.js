"use strict";

import { Link } from "react-router-dom";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Image from "react-bootstrap/Image";
import SlickService from "../services/SlickService";
import UserService from "../UserService";
import Thread from "../Thread";

export class ItemDetail extends React.Component {
  constructor(props) {
    super(props);

    //disable Add to WishList button for already added items
    let index = 0;
    let array = UserService.getWishlistItems(
      UserService.getCurrentUser().id
    ).then(data => {
      for (index = 0; index < data.length; index++) {
        if (this.props.item._id == data[index]._id) {
          this.setState({ disabled: true });
        }
      }
    });

    this.state = {
      buyLink: this.props.item.retailers[0].website,
      price: this.props.item.retailers[0].price,
      ritem: [{}, {}, {}]
    };

    this.myFunction = this.myFunction.bind(this);
    this.menu = this.menu.bind(this);

    this.getRelated();
  }

  //Function to get the related items from the reccommender
  getRelated() {
    SlickService.getRelItems(this.props.item._id)
      .then(rdata => {
        for (var index = 0; index < 2; index++) {
          if (this.props.item._id == rdata[index]._id) {
            rdata[index] = rdata[2];
            break;
          }
        }
        this.setState({
          ritem: rdata
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  //change the state after event
  myFunction(id) {
    this.setState({
      buyLink: id.website,
      price: id.price
    });
  }

  //generating the list fields from which the user can choose the retailer he wants
  //and the onclick support to change the price
  menu() {
    let menuItems = [];
    var i = 0;
    for (i = 0; i < this.props.item.retailers.length; i++) {
      menuItems.push(
        <ListGroup.Item
          id={i}
          action
          href={"#link" + this.props.item.retailers[i].name}
          onClick={() => this.myFunction}
          onClick={this.myFunction.bind(this, this.props.item.retailers[i])}
          value={i}
        >
          {this.props.item.retailers[i].name}
        </ListGroup.Item>
      );
    }
    return menuItems;
  }

  //function to handle clicks and redirect to the retailers' website
  handleClick() {
    window.location.assign(this.state.buyLink);
  }

  // Handler for on wishlist click
  handleWishClick = event => {
      UserService.addWishlistItem(
      UserService.getCurrentUser().id,
      this.props.item._id
    );

    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
  };

  imageClick(id){
    window.location.href = "/home/show/" + id;

  }

  //rendering
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={7}>
              <div
                className="details"
                style={{
                  width: 680,
                  height: 850,
                  backgroundColor: "#ffffff",
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 40,
                  paddingRight: 40,
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  padding: 10
                }}
              >
                <div
                  style={{
                    color: "#504F5A",
                    marginTop: 15,
                    marginBottom: 20,
                    fontSize: 22
                  }}
                >
                  {this.props.item.title}
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: 350,
                      height: 350,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 40,
                      paddingRight: 40,
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                  >
                    <div>
                      <Image
                        alt={this.props.item.imageURL}
                        style={{
                          objectFit: "contain",
                          height: 320,
                          width: 270
                        }}
                        src={this.props.item.imageURL}
                        fluid
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      marginLeft: 20,
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 20
                    }}
                  >
                    <div
                      style={{ fontSize: 18, marginTop: 10, marginBottom: 20 }}
                    >
                      Price: {this.state.price}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <Tab.Container
                        id="list-group-tabs"
                        defaultActiveKey={
                          "#link" + this.props.item.retailers[0].name
                        }
                      >
                        <Row>
                          <Col sm={6}>
                            <ListGroup>{this.menu()}</ListGroup>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={this.handleWishClick}
                        disabled={this.state.disabled}
                      >
                        {this.state.disabled
                          ? "In WishList"
                          : "Add to WishList"}
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={this.handleClick.bind(this)}
                        type="button"
                        class="btn btn-success"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    color: "#504F5A",
                    marginTop: 40,
                    marginBottom: 20,
                    fontSize: 22
                  }}
                >
                  Product Description
                </div>

                <div
                  style={{
                    color: "green",
                    textAlign: "justify",
                    maxHeight: 200,
                    fontSize: 16,
                    overflow: "auto"
                  }}
                >
                  Item: "{this.props.item.title}"
                </div>

                <div
                  style={{
                    color: "green",
                    textAlign: "justify",
                    maxHeight: 200,
                    fontSize: 16,
                    overflow: "auto"
                  }}
                >
                  Category: "{this.props.item.category}"
                </div>

                <div
                  style={{
                    color: "green",
                    textAlign: "justify",
                    maxHeight: 200,
                    fontSize: 16,
                    overflow: "auto"
                  }}
                >
                  Brand: "{this.props.item.brand}"
                </div>

                <div
                  style={{
                    color: "gray",
                    textAlign: "justify",
                    maxHeight: 200,
                    fontSize: 16,
                    overflow: "auto"
                  }}
                >
                  {this.props.item.description}
                </div>
              </div>
            </Col>

            <Col sm={3}>
              <div
                className="details2"
                style={{
                  width: 320,
                  height: 850,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: "#ffffff",
                  paddingLeft: 40,
                  paddingRight: 40,
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  padding: 10
                }}
              >
                <div
                  style={{
                    color: "#504F5A",
                    marginTop: 20,
                    marginBottom: 20,
                    fontSize: 22
                  }}
                >
                  Related Items
                </div>

                <div
                  style={{
                    width: 280,
                    height: 280,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 50,
                    paddingRight: 40,
                    marginLeft: 8,
                    marginBottom: 22,
                    marginTop: 35,
                    border: "1px solid lightgray",
                    borderRadius: "5px"
                  }}
                >
                  <div>
                    
                      <Image
                        alt={this.state.ritem[0].title}
                        style={{
                          objectFit: "contain",
                          height: 250,
                          width: 200
                        }}
                        
                        onClick={this.imageClick.bind(this, this.state.ritem[0]._id)}
                        src={this.state.ritem[0].imageURL}
                        fluid
                      />
                    
                  </div>

                  <div
                    style={{
                      color: "blue",
                      textAlign: "center",
                      maxHeight: 200,
                      marginTop: -23,
                      fontSize: 21,
                      overflow: "auto"
                    }}
                  >
                    {this.state.ritem[0].title}
                  </div>
                </div>

                <div
                  style={{
                    width: 280,
                    height: 280,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 40,
                    paddingRight: 40,
                    marginLeft: 8,
                    marginTop: 30,
                    marginBottom: 22,
                    border: "1px solid lightgray",
                    borderRadius: "5px"
                  }}
                >
                  <div>
                    
                      <Image
                        alt={this.state.ritem[1].title}
                        style={{
                          objectFit: "contain",
                          height: 250,
                          width: 200
                        }}
                        onClick={this.imageClick.bind(this, this.state.ritem[1]._id)}
                        src={this.state.ritem[1].imageURL}
                        fluid
                      />
                    
                  </div>
                  <div
                    style={{
                      color: "blue",
                      textAlign: "center",
                      maxHeight: 200,
                      marginTop: -14,
                      fontSize: 21,
                      overflow: "auto"
                    }}
                  >
                    {this.state.ritem[1].title}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Col sm={10}>
            <div
              style={{
                backgroundColor: "#ffffff",
                width: 999,
                marginLeft: -12
              }}
            >
              <div
                style={{
                  color: "#504F5A",
                  marginTop: 5,
                  marginBottom: 20,
                  marginLeft: 10,
                  fontSize: 22
                }}
              >
                Reviews
              </div>

              <div className="row d-flex justify-content-center">
                <Thread itemId={this.props.item._id} />
              </div>
            </div>
          </Col>

          <Row />
        </Container>
      </div>
    );
  }
}
