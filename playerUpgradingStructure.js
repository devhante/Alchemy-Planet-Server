let myQuery = require('./myQuery');

exports.onMessageFindPlayerUpgradingStructures = (ws, data) => {
    findPlayerUpgradingStructures(data.playerId, (res) => {
        console.log('findPlayerUpgradingStructure: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, startDate: res[i].startDate, requireTime: res[i].requireTime };
        }
        let sendObj = { status: 'PlayerUpgradingStructure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerUpgradingStructure = (ws, data) => {
    insertPlayerUpgradingStructure(data.playerId, data.structureUniqueId, data.startDate, data.requireTime, (res) => {
        console.log('insertPlayerUpgradingStructure: ' + res);
    });
}

exports.onMessageDeletePlayerUpgradingStructure = (ws, data) => {
    deletePlayerUpgradingStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deletePlayerUpgradingStructure: ' + obj);
    });
}

exports.onMessageDeletePlayerUpgradingStructures = (ws, data) => {
    deletePlayerUpgradingStructures(data.playerId, (obj) => {
        console.log('deletePlayerUpgradingStructures: ' + obj);
    });
}

exports.onMessageUpdatePlayerUpgradingStructure = (ws, data) => {
    updatePlayerUpgradingStructure(data.playerId, data.structureUniqueId, data.startDate, data.requireDate, (res) => {
        console.log('updatePlayerUpgradingStructure: ' + res);
    });
}

const findPlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerUpgradingStructure', query, callback);
}

const insertPlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, startDate: startDate, requireTime: requireTime };
    myQuery.insertOne('PlayerUpgradingStructure', obj, callback);
}

const deletePlayerUpgradingStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('PlayerUpgradingStructure', query, callback);
}

const deletePlayerUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerUpgradingStructure', query, callback);
}

const updatePlayerUpgradingStructure = (playerId, structureUniqueId, startDate, requireTime, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { startDate: startDate, requireTime: requireTime } };
    myQuery.updateOne('PlayerUpgradingStructure', query, values, callback);
}