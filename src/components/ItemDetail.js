
"use strict";

import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Header from '../Header';
import Menu from '../Menu';


export class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          buyLink: "",
          price: this.props.item.retailers[0].price,
        };
        this.myFunction=this.myFunction.bind(this);
    }


myFunction(){

  this.setState(state => ({
    buyLink: this.props.item.retailers[0].website,
    price: this.props.item.retailers[1].price,
  }));

}


handleClick() {
  window.location.assign(this.props.item.retailers[0].website);
}


    render() {

        return (
            //<Page>
          <div>
            <Header />
            <Menu />
    
                        <Container>
    
                          <Row>
    
                            <Col>
                            
                        <div className="details" style={{ 
                          width: 700,
                                height: 1000,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                marginLeft: 190,
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
                                width: 450,
                                height: 450,
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
                                          height: 450,
                                          width: 450
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
    
                                <Tab.Container id="list-group-tabs" defaultActiveKey="link">
                                  <Row>
                                    <Col sm={9}>
                                    
                                      <ListGroup>

                                        <ListGroup.Item action href="#link1" onClick={
                                                  (this.myFunction)

                                        }>
                                        {this.props.item.retailers[0].name}
                                        </ListGroup.Item>
                                  
                                        <ListGroup.Item action href="#link2">
                                        {this.props.item.retailers[1].name}
                                        </ListGroup.Item>
                                        
                                      </ListGroup>
                                    </Col>
                                    <Col sm={5}>
                                      <Tab.Content>
                                        <Tab.Pane eventKey="#link1">
                                      
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#link2">
                                        
                                        </Tab.Pane>
                                      </Tab.Content>
                                    </Col>

                                  </Row>
                                </Tab.Container>
                                </div>
    
    
    
                              <div>
                              <Link to="/list">
                                <button type="button" class="btn btn-success">Back to Products</button>
                              </Link>
                               
                              <Link to="/list">
                                <button type="button" class="btn btn-success">Add to Wardrobe</button>
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
    
                            <Col>
    
                        <div className="details2" style={{ 
                          width: 300,
                                height: 1000,
                                paddingTop: 5,
                                paddingBottom: 5,
                                paddingLeft: 40,
                                paddingRight: 40,
                                marginLeft: 900,
                                marginTop: -1250,
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
                                          height: 280,
                                          width: 280
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