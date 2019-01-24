import config from '../constants/config';

class OLC {

    createDatabases() {
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);

        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY, name TEXT, created_by TEXT)");
        });

        localStorage.setItem("database", "1.1");
    }

    createAreaDatabaseTables(areaId) {
        var db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);

        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS `areas_" + areaId + "_mobs` (id INTEGER PRIMARY KEY, vnum INTEGER, name TEXT, short_description TEXT, long_description TEXT, description TEXT, act TEXT, affected_by TEXT, alignment TEXT, level INT,  exp_level INT, hitroll INT, damroll INT, ac INT, hp INT, gold INT, sex INT, area_id INT)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS `areas_" + areaId + "_objects` (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, description TEXT, act TEXT, item_type INTEGER, extra_flags TEXT, wear_flags TEXT, value0 INT, value1 INT, value2 INT, value3 INT, weight INT, cost INT, affect_data TEXT, extra_descr_data TEXT, chpoweron TEXT, chpoweroff TEXT, chpoweruse TEXT, victpoweron TEXT, victpoweroff TEXT, victpoweruse TEXT, spectype INT, specpower INT, affected_by TEXT);");
            tx.executeSql("CREATE TABLE IF NOT EXISTS `areas_" + areaId + "_rooms` (id INTEGER PRIMARY KEY, name TEXT, description TEXT, room_flags TEXT, sector_type INTEGER, exits TEXT, extra_descr_data TEXT, roomtext_data TEXT, area_id INTEGER)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS `areas_" + areaId + "_resets` (id INTEGER PRIMARY KEY, command TEXT, arg1 INT, arg2 INT, arg3 INT, comment TEXT)");
        });

    }

}

export default new OLC();