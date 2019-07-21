"use strict";

import HttpService from "../HttpService";

export default class SlickService {
  constructor() {}

  static baseURL() {
    return "http://localhost:3001/items";
  }

  static getRelItems(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${SlickService.baseURL()}/rel/${id}`,
        function(rdata) {
          if (rdata != undefined || Object.keys(rdata).length !== 0) {
            resolve(rdata);
          } else {
            reject("Error while retrieving item");
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getItem(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${SlickService.baseURL()}/${id}`,
        function(data) {
          if (data != undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving item");
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
