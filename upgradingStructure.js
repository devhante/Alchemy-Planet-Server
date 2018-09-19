let myQuery = require('./myQuery');

exports.onMessageFindUpgradingStructures = (ws, data) => {
    findUpgradingStructures(data.playerId, (res) => {
        console.log('findUpgradingStructure: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, structureUniqueId: res[i].structureUniqueId, startDate: res[i].startDate, requireTime: res[i].requireTime };
        }
        let sendObj = { status: 'UpgradingStructure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertUpgradingStructure = (ws, data) => {
    insertUpgradingStructure(data.playerId, data.structureUniqueId, data.requireTime, (res) => {
        console.log('insertUpgradingStructure: ' + res);
    });
}

exports.onMessageDeleteUpgradingStructure = (ws, data) => {
    deleteUpgradingStructure(data.playerId, data.structureUniqueId, (obj) => {
        console.log('deleteUpgradingStructure: ' + obj);
    });
}

exports.onMessageDeleteUpgradingStructures = (ws, data) => {
    deleteUpgradingStructures(data.playerId, (obj) => {
        console.log('deleteUpgradingStructures: ' + obj);
    });
}

exports.onMessageUpdateUpgradingStructure = (ws, data) => {
    updateUpgradingStructure(data.playerId, data.structureUniqueId, data.requireTime, (res) => {
        console.log('updateUpgradingStructure: ' + res);
    });
}

const findUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('UpgradingStructure', query, callback);
}

const insertUpgradingStructure = (playerId, structureUniqueId, requireTime, callback) => {
    let obj = { playerId: playerId, structureUniqueId: structureUniqueId, startDate: new Date(), requireTime: requireTime };
    myQuery.insertOne('UpgradingStructure', obj, callback);
}

const deleteUpgradingStructure = (playerId, structureUniqueId, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    myQuery.deleteOne('UpgradingStructure', query, callback);
}

const deleteUpgradingStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('UpgradingStructure', query, callback);
}

const updateUpgradingStructure = (playerId, structureUniqueId, requireTime, callback) => {
    let query = { playerId: playerId, structureUniqueId: structureUniqueId };
    let values = { $set: { requireTime: requireTime } };
    myQuery.updateOne('UpgradingStructure', query, values, callback);
}