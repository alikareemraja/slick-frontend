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

    static register(user, pass) {
        console.log("UserService is registering user: " + user + ", pass:" + pass);
        return new Promise((resolve, reject) => {
            HttpService.post(HttpService.apiURL() + "/auth/register", {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        console.log("UserService is posting with user: " + user + ", pass:" + pass);
        return new Promise((resolve, reject) => {
            HttpService.post(HttpService.apiURL() + "/auth/login", {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
    }
}