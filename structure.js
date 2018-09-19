let myQuery = require('./myQuery');

exports.onMessageFindStructures = (ws, data) => {
    findStructures(data.playerId, (res) => {
        console.log('findStructures: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = {
                playerId: res[i].playerId,
                playerStructureId: res[i].playerStructureId,
                structureId: res[i].structureId,
                level: res[i].level,
                position: res[i].position,
                isConstructed: res[i].isConstructed,
                isFlipped: res[i].isFlipped,
                isUpgrading: res[i].isUpgrading,
                endDate: res[i].endDate
            };
        }
        let sendObj = { status: 'Structure', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertStructure = (ws, data) => {
    insertStructure(data.playerId, data.playerStructureId, data.structureId, data.level, data.position, data.isConstructed, data.isFlipped, data.isUpgrading, data.endDate, (res) => {
        console.log('insertStructure: ' + res)
    });
}

exports.onMessageDeleteStructure = (ws, data) => {
    deleteStructure(data.playerId, data.playerStructureId, (obj) => {
        console.log('deleteStructure: ' + obj);
    });
}

exports.onMessageDeleteStructures = (ws, data) => {
    deleteStructures(data.playerId, (obj) => {
        console.log('deleteStructures: ' + obj);
    });
}

exports.onMessageUpdateStructure = (ws, data) => {
    updateStructure(data.playerId, data.playerStructureId, data.structureId, data.level, data.position, data.isConstructed, dat.isFlipped, data.isUpgrading, data.endDate, (res) => {
        console.log('updateStructure: ' + res);
    });
}

const findStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('Structure', query, callback);
}

const insertStructure = (playerId, playerStructureId, structureId, level, position, isConstructed, isFlipped, isUpgrading, endDate, callback) => {
    let obj = { playerId: playerId, playerStructureId: playerStructureId, structureId: structureId, level: level, position: position, isConstructed: isConstructed, isFlipped: isFlipped, isUpgrading: isUpgrading, endDate: endDate };
    myQuery.insertOne('Structure', obj, callback);
}

const deleteStructure = (playerId, playerStructureId, callback) => {
    let query = { playerId: playerId, playerStructureId: playerStructureId };
    myQuery.deleteOne('Structure', query, callback);
}

const deleteStructures = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('Structure', query, callback);
}

const updateStructure = (playerId, playerStructureId, structureId, level, position, isConstructed, isFlipped, isUpgrading, endDate, callback) => {
    let query = { playerId: playerId, playerStructureId: playerStructureId };
    let values = { $set: { structureId: structureId, level: level, position: position, isConstructed:, isConstructed, isFlipped: isFlipped, isUpgrading: isUpgrading, endDate: endDate } };
    myQuery.updateOne('Structure', query, values, callback);
}