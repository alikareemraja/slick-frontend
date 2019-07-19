"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

export class ItemListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn><Link to={`/show/${this.props.item._id}`}><FontIcon>image</FontIcon></Link></TableColumn>
                <TableColumn><SimpleLink to={`/show/${this.props.item._id}`}>{this.props.item.title}</SimpleLink></TableColumn>
            </TableRow>
        );
    }
}
