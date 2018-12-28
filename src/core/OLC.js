/*
 * flagship.js
 * Main MarcoPromo frontend class to manage core functionality
 */

import config from '../constants/config';
import store from '../store/store';
import React from 'react'
import { browserHistory } from 'react-router'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class OLC {

    constructor() {
        this.config = config;
    }

    getAreas() {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);

        let areas = [];
        db.transaction(function(tx){

            tx.executeSql("CREATE TABLE IF NOT EXISTS areas (id unique, name TEXT, created_by TEXT)");


            tx.executeSql("SELECT * FROM areas LIMIT 10000", [], function(tx, rs) {
                let areas = [];
                for( var i=0; i<rs.rows.length; i++ ) {
                    areas.push({
                        id: rs.rows[i].id,
                        name: rs.rows[i].name,
                        created_by: rs.rows[i].created_by
                    });
                }
            })
        });

        return areas;
    }

    getArea( areaId ) {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);
        
        db.transaction(function(tx){
            
            tx.executeSql("SELECT * FROM areas WHERE rowid = '" + areaId + "'", [], function(tx, rs) {
                console.log(rs);
                return;

                return {
                    id: rs.rows[0].rowid,
                    name: rs.rows[0].name,
                    created_by: rs.rows[0].created_by
                };
            })
        });

    }

    createArea( areaName, areaCreatedBy ) {
        
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

}

export default new OLC();