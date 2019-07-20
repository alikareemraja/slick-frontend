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
        console.log(id)
        SlickService.getItem(id).then((data) => {
            this.setState({
                item: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteItem(id) {
        SlickService.deleteItem(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <ItemDetail item={this.state.item} onDelete={(id) => this.deleteItem(id)}/>
        );
    }
}