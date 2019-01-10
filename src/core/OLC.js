import config from '../constants/config';

class OLC {

    constructor() {
        this.config = config;
    }

    createDatabases() {
        var db = openDatabase(this.config.dbName, this.config.dbVersion, this.config.dbDescription, this.config.dbSize);

        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY, name TEXT, created_by TEXT)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS mobs (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, long_description TEXT, description TEXT, act TEXT, affected_by TEXT, alignment TEXT, level INT,  exp_level INT, hitroll INT, damroll INT, ac INT, hp INT, gold INT, sex INT, area_id INT)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, description TEXT, act TEXT, item_type INT, extra_flags TEXT, wear_flags TEXT, value0 INT, value1 INT, value2 INT, value3 INT, weight INT, cost INT, affect_data TEXT, extra_descr_data TEXT, chpoweron TEXT, chpoweroff TEXT, chpoweruse TEXT, victpoweron TEXT, victpoweroff TEXT, victpoweruse TEXT, spectype INT, specpower INT, affected_by TEXT, area_id INT);");
        });

        localStorage.setItem("database", "1.1");
    }

}

export default new OLC();