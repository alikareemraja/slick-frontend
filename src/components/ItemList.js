"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { ItemListRow } from './ItemListRow';
//import Page from './Page'

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const ItemList = ({data, onDelete}) => (
    //<Page>
        <DataTable plain style={dataTableStyle}>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, i) => <ItemListRow key={i} item={item} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    //</Page>
);

