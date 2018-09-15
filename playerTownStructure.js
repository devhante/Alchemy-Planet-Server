let myQuery = require('./myQuery');

exports.onMessageFindPlayerTownStructures = (ws, data) => {
    findPlayerTownStructures(data.playerId, (res) => {
        console.log('findPlayerTownStructures: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, position: res[i].position };
        }
        let sendObj = { status: 'PlayerTownStructure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
     });
}

exports.onMessageInsertPlayerTownStructure = (ws, data) => {
    insertPlayerTownStructure(data.playerId, data.structureUniqueId, data.position, (res) => {
        console.log('insertPlayerTownStructure: ' + res);
    });
}

exports.onMessageDeletePlayerTownStructure = (ws, data) => {
    deletePlayerTownStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deletePlayerTownStructure: ' + obj);
    });
}

exports.onMessageDeletePlayerTownStructures = (ws, data) => {
    deletePlayerTownStructures(data.playerId, (obj) => {
        console.log('deletePlayerTownStructures: ' + obj);
    });
}

exports.onMessageUpdatePlayerTownStructure = (ws, data) => {
    updatePlayerTownStructure(data.playerId, data.structureUniqueId, data.position, (res) => {
        console.log('updatePlayerTownStructures: ' + res);
    });
}

const findPlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerTownStructure', query, callback);
}

const insertPlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, position: position };
    myQuery.insertOne('PlayerTownStructure', obj, callback);
}

const deletePlayerTownStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerTownStructure', query, callback);
}

const deletePlayerTownStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerTownStructure', query, callback);
}

const updatePlayerTownStructure = (playerId, structureUniqueId, position, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { position: position } };
    myQuery.updateOne('PlayerTownStructure', query, values, callback);
}