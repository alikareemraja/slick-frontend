"use strict";

import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'

import SlickService from '../services/SlickService';



export class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        //console.log("itemdetailed called")
        //console.log(this.props.ritem)
        this.state = {
          buyLink: this.props.item.retailers[0].website,
          price: this.props.item.retailers[0].price,
          ritem: [{},{},{}]
        };
        
        this.myFunction=this.myFunction.bind(this);
        this.menu=this.menu.bind(this);
        //this.getRelated=this.getRelated.bind(this);

        this.getRelated();
    }

 getRelated(){
    
    SlickService.getRelItems(this.props.item._id).then((rdata) => {
      console.log("state of rdata")
      console.log(rdata)
      this.setState({
          ritem: rdata,
      });
      //console.log("state of ritem")
      //console.log(this.state.ritem)
    }).catch((e) => {
        console.error(e);
    });

  }



//change the state after event
myFunction(id){
  //console.log(id);
  this.setState({
    buyLink: id.website,
    price: id.price,
  });

}


//generating the list fields from which the user can choose the retailer he wants 
//and the onclick support to change the price
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


//function to handle clicks and redirect to the retailers' website
handleClick() {
  window.location.assign(this.state.buyLink);
}

    //rendering
    render() {
    
      

      //console.log("state of ritem")
      //console.log(this.props.ritem)

        return (
           
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
                                        alt={this.props.item.imageURL}
                                        style={{
                                          objectFit: "contain",
                                          height: 320,
                                          width: 320
                                        }}
                                        src={this.props.item.imageURL} 
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
                                <button type="button" class="btn btn-info">Add to Wishlist</button>
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
                                {this.props.item.description}
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
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 50,
                                paddingRight: 40,
                                marginLeft: 8,
                                marginBottom: 22,
                                marginTop: 5,
                                border: "1px solid lightgray",
                                borderRadius: "5px"
                          
                              }}
                            >
    
                                    <div>
                                      <img
                                        alt={this.state.ritem[0].title}
                                        
                                        style={{
                                          objectFit: "contain",
                                          marginLeft: -33,
                                          height: 250,
                                          width: 250
                                        }}
                                        src={this.state.ritem[0].imageURL}
                                      />
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
                                marginBottom: 22,
                                border: "1px solid lightgray",
                                borderRadius: "5px"
                          
                              }}
                            >
    
                                    <div>
                                      <img
                                        alt={this.state.ritem[1].title}
                                        style={{
                                          objectFit: "contain",
                                          //marginLeft: -33,
                                          height: 250,
                                          width: 250
                                        }}
                                        src={this.state.ritem[1].imageURL}
                                      />
                                    </div>
    
    
                            </div>

                          </div>
    
                        </Col>

                      </Row>

                  </Container>
                  
                 </div>


              )
    
       }

}