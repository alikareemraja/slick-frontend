"use strict";

import HttpService from './HttpService';

export default class SlickService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/movies" }

    static getItems(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getItem(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SlickService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving item');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}