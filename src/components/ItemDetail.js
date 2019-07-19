/*"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';

import Page from './Page';

import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <Grid className="grid-example" >
                        <Cell size={3}>
                            <Media aspectRatio="1-1">
                                <img src={this.props.movie.posters.detailed} alt={this.props.movie.title} />
                            </Media>
                        </Cell>
                        <Cell size={7}/>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Link to={{pathname: `/edit/${this.props.movie._id}`, state : {movie : this.props.movie}}}><Button icon>mode_edit</Button></Link>
                                : <Link to={'/login'}><Button icon>mode_edit</Button></Link>
                            }
                        </Cell>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Button onClick={() => this.props.onDelete(this.props.movie._id)} icon>delete</Button>
                                :   <Link to={'/login'}><Button icon>delete</Button></Link>
                            }
                        </Cell>
                    </Grid>

                    <CardTitle title={this.props.movie.title} subtitle={this.props.movie.year} />

                    <CardText>
                        <p>
                            {this.props.movie.mpaa_rating}
                        </p>
                        <p>
                            {this.props.movie.synopsis}
                        </p>
                    </CardText>
                </Card>
            </Page>
        );
    }
}
*/
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
                                Year: {this.props.item.year}
                              </div>
    
    
    
                              <div>
    
                                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                  <Row>
                                    <Col sm={9}>
                                      <ListGroup>
                                        <ListGroup.Item action href="#link1">
                                          Link 1
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                          Link 2
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
    
                                <Link to="/list">
                                <button type="button" class="btn btn-success">Buy</button>
                              </Link>
    
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