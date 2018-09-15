let myQuery = require('./myQuery');

exports.onMessageFindPlayerStructures = (ws, data) => {
    findPlayerStructures(data.playerId, (res) => {
        console.log('findPlayerStructures: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, structureId: res[i].structureId, level: res[i].level };
        }
        let sendObj = { status: 'PlayerStructure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerStructure = (ws, data) => {
    insertPlayerStructure(data.playerId, data.structureUniqueId, data.structureId, data.level, (res) => {
        console.log('insertPlayerStructure: ' + res)
    });
}

exports.onMessageDeletePlayerStructure = (ws, data) => {
    deletePlayerStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deletePlayerStructure: ' + obj);
    });
}

exports.onMessageDeletePlayerStructures = (ws, data) => {
    deletePlayerStructures(data.playerId, (obj) => {
        console.log('deletePlayerStructures: ' + obj);
    });
}

exports.onMessageUpdatePlayerStructure = (ws, data) => {
    updatePlayerStructure(data.playerId, data.structureUniqueId, data.structureId, data.level, (res) => {
        console.log('updatePlayerStructure: ' + res);
    });
}

const findPlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerStructure', query, callback);
}

const insertPlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, structureId: structureId, level: level };
    myQuery.insertOne('PlayerStructure', obj, callback);
}

const deletePlayerStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerStructure', query, callback);
}

const deletePlayerStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerStructure', query, callback);
}

const updatePlayerStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { structureId: structureId, level: level } };
    myQuery.updateOne('PlayerStructure', query, values, callback);
}