
"use strict";

import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'



export class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          buyLink: this.props.item.retailers[0].website,
          price: this.props.item.retailers[0].price,
        };
        
        this.myFunction=this.myFunction.bind(this);
        this.menu=this.menu.bind(this);
    }


myFunction(id){
  console.log(id);
  this.setState({
    buyLink: id.website,
    price: id.price,
  });

}

menu(){

  let menuItems = [];
  var i = 0;
  for (i = 0; i < this.props.item.retailers.length; i++) {
      menuItems.push(
      <ListGroup.Item id={i} action href={"#link" + this.props.item.retailers[i].name}
      
      onClick={() => this.myFunction} onClick={this.myFunction.bind(this, this.props.item.retailers[i])} value={i}
     >
          {this.props.item.retailers[i].name}
      </ListGroup.Item>);
  }
  return menuItems

}



handleClick() {
  window.location.assign(this.state.buyLink);
}


    render() {


        return (
            //<Page>
          <div>
    
                        <Container>
    
                          <Row>
    
                            <Col sm={7}>
                            
                        <div className="details" style={{ 
                          width: 680,
                                height: 700,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                //marginLeft: 20,
                                border: "1px solid lightgray",
                                borderRadius: "5px",
                          padding: 10 }}>
                          <div
                            style={{
                              color: "#504F5A",
                              marginTop: 15,
                              marginBottom: 20,
                              //marginLeft: 240,
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
                                //marginLeft: 240,
                                border: "1px solid lightgray",
                                borderRadius: "5px"
                          
                              }}
                            >
    
                                    <div>
                                      <img
                                        alt="Item"
                                        style={{
                                          objectFit: "contain",
                                          height: 320,
                                          width: 320
                                        }}
                                        src={this.props.item.posters.detailed} 
                                      />
                                    </div>
    
                                    
    
                            </div>
    
    
    
                            <div
                              style={{
                                flex: 1,
                                marginLeft: 20,
                                display: "flex",
                                flexDirection: "column"
                              }}
                            >
                              <div style={{ fontSize: 18, marginTop: 10 }}>
                                Price: {this.state.price}
                              </div>
    
    
    
                              <div>
    
                                <Tab.Container id="list-group-tabs" defaultActiveKey={"#link" + this.props.item.retailers[0].name}>
                                  <Row>
                                    <Col sm={6}>
                                    
                                      <ListGroup>
                                    
                                      {this.menu()}
                                        
                                      </ListGroup>
                                    </Col>

                                  </Row>
                                </Tab.Container>
                                </div>
    
    
    
                              <div>
                              <Link to="/list">
                                <button type="button" class="btn btn-info">Back to Products</button>
                              </Link>
                               </div>
                               <div>
                              <Link to="/list">
                                <button type="button" class="btn btn-info">Add to Wardrobe</button>
                              </Link>
                          </div>
                              <div>
    
                              <button onClick={this.handleClick.bind(this)} type="button" class="btn btn-success">Buy</button>
    
                              </div>
    
                            </div>
                          
                          
    
    
                          </div>
    
                          <div
                            style={{
                              color: "#504F5A",
                              marginTop: 50,
                              marginBottom: 10,
                              //marginLeft: 240,
                              fontSize: 22
                            }}
                          >
                            Product Description
                          </div>
    
                          
                            <div
                              style={{
                                color: "gray",
                                //marginLeft: 240,
                                //marginRight: 400,
                                textAlign: "justify",
                                maxHeight: 200,
                                fontSize: 16,
                                overflow: "auto"
                              }}
                            >
                                {this.props.item.synopsis}
                            </div>
    
                          
    
    
                        </div>
    
    
                        <div className="details3" style={{ 
                          width: 900,
                                height: 250,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                marginLeft: 190,
                                border: "1px solid transparent",
                                borderRadius: "5px",
                          padding: 10 }}>
    
    
                            <div
                            style={{
                              color: "#504F5A",
                              marginTop: 10,
                              marginBottom: 20,
                              //marginLeft: 240,
                              fontSize: 22
                            }}
                          >
                            Reviews
                         
                          </div>
    
                            </div>
    
    
    
                        </Col>
    
                            <Col sm={3}>
    
                        <div className="details2" style={{ 
                          width: 320,
                                height: 700,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                //marginLeft: 720,
                                //marginTop: -1250,
                                flex: 2,
                                //marginLeft: 20,
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid lightgray",
                                borderRadius: "5px",
                          padding: 10 }}>
    
                          <div
                            style={{
                              color: "#504F5A",
                              marginTop: 10,
                              marginBottom: 20,
                              //marginLeft: 240,
                              fontSize: 22
                            }}
                          >
                            Related Items
                          </div>
    
    
                            <div
                              style={{
                                width: 280,
                                height: 280,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                //marginLeft: 240,
                                border: "1px solid lightgray",
                                borderRadius: "5px"
                          
                              }}
                            >
    
                                    <div>
                                      <img
                                        alt="Item"
                                        style={{
                                          objectFit: "contain",
                                          height: 250,
                                          width: 250
                                        }}
                                        src={this.props.item.posters.detailed}
                                      />
                                    </div>
    
                                    
    
                            </div>
    
    
    
    
    
                          </div>
    
                          </Col>
                          </Row>
                        </Container>
                  
                  </div>

                  //</Page>
                )
    
        }

}