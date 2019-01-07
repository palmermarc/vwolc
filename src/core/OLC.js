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

    createDatabases() {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);

        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY, name TEXT, created_by TEXT)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS mobs (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, long_description TEXT, description TEXT, act TEXT, affected_by TEXT, alignment TEXT, level INT,  exp_level INT, hitroll INT, damroll INT, ac INT, hp INT, gold INT, sex INT, area_id INT)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, description TEXT, item_type INT, extra_flags TEXT, wear_flags TEXT, value0 INT, value1 INT, value2 INT, value3 INT, weight INT, cost INT, affect_data TEXT, extra_descr_data TEXT, chpoweron TEXT, chpoweroff TEXT, chpoweruse TEXT, victpoweron TEXT, victpoweroff TEXT, victpoweruse TEXT, spectype INT, specpower INT, area_id INT);");
        });

        localStorage.setItem("database", "1.1");
    }

}

export default new OLC();