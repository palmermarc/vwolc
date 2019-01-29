/*
 * Main OLC frontend class to manage core functionality
 */

import axios from 'axios';
import config from '../constants/config';
import queryString from 'query-string';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 401) {
        history.push('/logout/');
    }
    return Promise.reject(error.response);
});

class OLC {

    constructor() {
        this.config = config;
    }

    get( endpoint, query, callback, error ) {

        let self = this;
        let url = this.config.apiBase + endpoint + ( query !== {} ? '?' + queryString.stringify(query) : '' );
        let config = {
            headers: {"Authorization" : "Bearer " + localStorage.getItem("marcoPromoToken")}
        };

        let result = new Promise(resolve => {
            let r = resolve;
            axios.get(url, config).then(function (response) {
                if (typeof callback === "function") {
                    callback(response);
                }
                r(true);
            }).catch(function(err) {

                if (typeof error === "function") {

                } else {
                    self.log(
                      "error",
                      {
                          "Description": "API Error",
                          "Endpoint": endpoint,
                          "Method": "GET",
                          "Query": query,
                      }
                    );
                    return err;
                }
                return err;
            });
            return result;
        });
    }

    post( endpoint, data, callback, error ) {

        let self = this;

        let url = this.config.apiBase + endpoint;
        let config = {
            headers: { "Authorization": "Bearer " + localStorage.getItem("marcoPromoToken") }
        };

        let result = new Promise(resolve => {
            let r = resolve;
            axios.post(url,data,config).then( function(response) {

                if (typeof callback === "function") {
                    callback(response);
                }
                r(true);
            }).catch( function(err) {

                if (typeof error === "function") {

                } else {
                    self.log(
                      "error",
                      {
                          "Description": "API Error",
                          "Endpoint" : endpoint,
                          "Method" : "POST",
                          "Data" : data,
                          "Error" : err.response
                      }
                    );
                }
                r(false);
            });
        });

        return result;
    }

    put( endpoint, data, callback, error ) {

        let self = this;


        let url = this.config.apiBase + endpoint;
        let config = {
            headers: {"Authorization" : "Bearer " + localStorage.getItem("marcoPromoToken")}
        };

        let result = new Promise(resolve => {
            let r = resolve;
            axios.put(url, data, config).then( function(response) {

                if (typeof callback === "function") {
                    callback(response);
                }
                r(true);
            }).catch( function(err) {

                if (typeof error === "function") {
                } else {
                    self.log(
                      "error",
                      {
                          "Description": "API Error",
                          "Endpoint" : endpoint,
                          "Method" : "PUT",
                          "Data" : data,
                          "Error" : err.response
                      }
                    );
                }
                r(false);
            });
        });

        return result;
    }

    log(action, data = '', target = null, user = null) {

        //let logData = {action, data, target,  user };
        //this.post('log/write', logData);
    }

    event(action, data = '', target = null, user = null) {

        //this.log(action, data, target, user);
        this.sendMail(action, data, target, user);
    }

    error(message, target, user) {
        this.log("error", message, target, user);
    }

    redirect(path) {
        //browserHistory.push(path);
    }

    decodeHtmlEntity(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    };


}

export default new OLC();



