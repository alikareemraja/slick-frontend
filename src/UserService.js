import HttpService from "./HttpService";

export default class UserService {

    static baseURL() {return HttpService.apiURL() + "/users"; }

    static getOwnedItems(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/" + userId + "/owned", function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving movie');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getOwnedItem(userId, itemId) {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/" + userId + "/owned/" + itemId, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving movie');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteOwnedItem(userId, itemId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(this.baseURL() + "/" + userId + "/owned/" + itemId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static addOwnedItem(userId, item) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL() + "/" + userId + "/owned", item, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}