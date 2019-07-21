"use strict";

import React from 'react';

import { ItemDetail } from '../components/ItemDetail';

import SlickService from '../services/SlickService';


export class ItemDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        SlickService.getItem(id).then((data) => {
            //console.log("state of data")
            //console.log(data)
            this.setState({
                item: data,
                loading: false
            });
            //console.log("state of item")
            //console.log(this.state.item)
            
        }).catch((e) => {
            console.error(e);
        });        
        
        
        /*SlickService.getRelItems(id).then((rdata) => {
            console.log("state of rdata")
            console.log(rdata)
            this.setState({
                ritem: rdata,
                loading: false
            });
            //console.log("state of ritem")
            //console.log(this.state.ritem)
        }).catch((e) => {
            console.error(e);
        });*/



    }

    deleteItem(id) {
        SlickService.deleteItem(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        //console.log("state of finalrdata")
        //console.log(this.state.rdata)

        return (
            <ItemDetail item={this.state.item} /*ritem={this.state.ritem}*/ onDelete={(id) => this.deleteItem(id)}/>
        );
    }
}