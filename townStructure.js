let myQuery = require('./myQuery');

exports.onMessageFindTownStructures = (ws, data) => {
    findTownStructures(data.playerId, (res) => {
        console.log('findTownStructures: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, position: res[i].position };
        }
        let sendObj = { status: 'TownStructure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
     });
}

exports.onMessageInsertTownStructure = (ws, data) => {
    insertTownStructure(data.playerId, data.structureUniqueId, data.position, (res) => {
        console.log('insertTownStructure: ' + res);
    });
}

exports.onMessageDeleteTownStructure = (ws, data) => {
    deleteTownStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deleteTownStructure: ' + obj);
    });
}

exports.onMessageDeleteTownStructures = (ws, data) => {
    deleteTownStructures(data.playerId, (obj) => {
        console.log('deleteTownStructures: ' + obj);
    });
}

exports.onMessageUpdateTownStructure = (ws, data) => {
    updateTownStructure(data.playerId, data.structureUniqueId, data.position, (res) => {
        console.log('updateTownStructures: ' + res);
    });
}

const findTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('TownStructure', query, callback);
}

const insertTownStructure = (playerId, structureUniqueId, position, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, position: position };
    myQuery.insertOne('TownStructure', obj, callback);
}

const deleteTownStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('TownStructure', query, callback);
}

const deleteTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('TownStructure', query, callback);
}

const updateTownStructure = (playerId, structureUniqueId, position, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { position: position } };
    myQuery.updateOne('TownStructure', query, values, callback);
}