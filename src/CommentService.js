import HttpService from "./HttpService";

export default class CommentService  {
    static baseURL() {return HttpService.apiURL() + "/comment"; }

    static getComments(itemId) {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/get/" + itemId, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving comments');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getUser(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/get/user/" + userId, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving comments');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static postComment(itemId, userId, text) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL() + "/add", {
                item: itemId,
                user: userId,
                date: new Date().getTime(),
                text: text,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateComment(commentId, text) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL() + "/update/"+ commentId, {
                text: text,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static replyToComment(userId, commentId, text) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseURL() + "/add/"+ commentId, {
                user: userId,
                date: new Date().getTime(),
                text: text,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteComment(commentId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(this.baseURL() + "/delete/" + commentId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}
