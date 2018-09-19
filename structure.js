let myQuery = require('./myQuery');

exports.onMessageFindStructures = (ws, data) => {
    findStructures(data.playerId, (res) => {
        console.log('findStructures: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, structureId: res[i].structureId, level: res[i].level };
        }
        let sendObj = { status: 'Structure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertStructure = (ws, data) => {
    insertStructure(data.playerId, data.structureUniqueId, data.structureId, data.level, (res) => {
        console.log('insertStructure: ' + res)
    });
}

exports.onMessageDeleteStructure = (ws, data) => {
    deleteStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deleteStructure: ' + obj);
    });
}

exports.onMessageDeleteStructures = (ws, data) => {
    deleteStructures(data.playerId, (obj) => {
        console.log('deleteStructures: ' + obj);
    });
}

exports.onMessageUpdateStructure = (ws, data) => {
    updateStructure(data.playerId, data.structureUniqueId, data.structureId, data.level, (res) => {
        console.log('updateStructure: ' + res);
    });
}

const findStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('Structure', query, callback);
}

const insertStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, structureId: structureId, level: level };
    myQuery.insertOne('Structure', obj, callback);
}

const deleteStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('Structure', query, callback);
}

const deleteStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('Structure', query, callback);
}

const updateStructure = (playerId, structureUniqueId, structureId, level, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { structureId: structureId, level: level } };
    myQuery.updateOne('Structure', query, values, callback);
}