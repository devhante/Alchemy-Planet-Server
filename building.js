let index = require('./index');
let myQuery = require('./myQuery');

exports.onMessageFindBuildings = (ws, data, status) => {
    findBuildings(data.playerId, (res) => {
        console.log('findBuildings: ' + res);
        let dataObj = [];
        let sendObj;
        if(res == null) {
            sendObj = { status: status, data: null };
        } else {
            for(let i = 0; i < res.length; i++) {
                dataObj[i] = {
                    playerId: res[i].playerId,
                    playerBuildingId: res[i].playerBuildingId,
                    buildingId: res[i].buildingId,
                    level: res[i].level,
                    position: res[i].position,
                    isConstructed: res[i].isConstructed,
                    isFlipped: res[i].isFlipped,
                    isUpgrading: res[i].isUpgrading,
                    endDate: res[i].endDate
                };
            }
            sendObj = { status: status, data: JSON.stringify(dataObj) };
        }
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertBuilding = (ws, data, status) => {
    insertBuilding(data.playerId, data.playerBuildingId, data.buildingId, data.level, data.position, data.isConstructed, data.isFlipped, data.isUpgrading, data.endDate, (res) => {
        console.log('insertBuilding: ' + res)
    });
}

exports.onMessageDeleteBuilding = (ws, data, status) => {
    deleteBuilding(data.playerId, data.playerBuildingId, (obj) => {
        console.log('deleteBuilding: ' + obj);
    });
}

exports.onMessageDeleteBuildings = (ws, data, status) => {
    deleteBuildings(data.playerId, (obj) => {
        console.log('deleteBuildings: ' + obj);
    });
}

exports.onMessageUpdateBuilding = (ws, data, status) => {
    updateBuilding(data.playerId, data.playerBuildingId, data.buildingId, data.level, data.position, data.isConstructed, data.isFlipped, data.isUpgrading, data.endDate, (res) => {
        console.log('updateBuilding: ' + res);
    });
}

const findBuildings = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('Building', query, callback);
}

const insertBuilding = (playerId, playerBuildingId, buildingId, level, position, isConstructed, isFlipped, isUpgrading, endDate, callback) => {
    let obj = { playerId: playerId, playerBuildingId: playerBuildingId, buildingId: buildingId, level: level, position: position, isConstructed: isConstructed, isFlipped: isFlipped, isUpgrading: isUpgrading, endDate: endDate };
    myQuery.insertOne('Building', obj, callback);
}

const deleteBuilding = (playerId, playerBuildingId, callback) => {
    let query = { playerId: playerId, playerBuildingId: playerBuildingId };
    myQuery.deleteOne('Building', query, callback);
}

const deleteBuildings = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('Building', query, callback);
}

const updateBuilding = (playerId, playerBuildingId, buildingId, level, position, isConstructed, isFlipped, isUpgrading, endDate, callback) => {
    let query = { playerId: playerId, playerBuildingId: playerBuildingId };
    let values = { $set: { buildingId: buildingId, level: level, position: position, isConstructed: isConstructed, isFlipped: isFlipped, isUpgrading: isUpgrading, endDate: endDate } };
    myQuery.updateOne('Building', query, values, callback);
}

index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    let dbo = db.db('mydb');
    dbo.createCollection('Building', (err, res) => {
        if(err) throw err;
        dbo.collection('Building').createIndex( { playerId: 1, playerBuildingId: 1 }, { unique: true } );
        db.close();
    });
});