"use strict";

import React from 'react';

import { ItemList } from '../components/ItemList';

import SlickService from '../services/SlickService';


export class ItemListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        SlickService.getItems().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <ItemList data={this.state.data}/>
        );
    }
}
