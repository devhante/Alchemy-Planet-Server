let myQuery = require('./myQuery');

exports.onMessageFindPlayerParties = (ws, data) => {
    findPlayerParties(data.playerId, (res) => {
        console.log('findPlayerParties: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = { playerId: res[i].playerId, partyIndex: res[i].partyIndex, slotIndex: res[i].slotIndex, characterId: res[i].characterId };
        }
        let sendObj = { status: 'PlayerParty', data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertPlayerParty = (ws, data) => {
    insertPlayerParty(data.playerId, data.partyIndex, data.slotIndex, data.characterId, (res) => {
        console.log('insertPlayerParty: ' + res);
    });
}

exports.onMessageDeletePlayerParty = (ws, data) => {
    deletePlayerParty(data.playerId, data.partyIndex, data.slotIndex, (obj) => {
        console.log('deletePlayerParty: ' + obj);
    });
}

exports.onMessageDeletePlayerParties = (ws, data) => {
    deletePlayerParties(data.playerId, (obj) => {
        console.log('deletePlayerParties: ' + obj);
    });
}

exports.onMessageUpdatePlayerParty = (ws, data) => {
    updatePlayerParty(data.playerId, data.partyIndex, data.slotIndex, data.characterId, (res) => {
        console.log('updatePlayerParty: ' + res);
    });
}

const findPlayerParties = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('PlayerParty', query, callback);
}

const insertPlayerParty = (playerId, partyIndex, slotIndex, characterId, callback) => {
    let obj = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex, characterId: characterId };
    myQuery.insertOne('PlayerParty', obj, callback);
}

const deletePlayerParty = (playerId, partyIndex, slotIndex, callback) => {
    let query = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex };
    myQuery.deleteOne('PlayerParty', query, callback);
}

const deletePlayerParties = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('PlayerParty', query, callback);
}

const updatePlayerParty = (playerId, partyIndex, slotIndex, characterId, callback) => {
    let query = { playerId: playerId, partyIndex: partyIndex, slotIndex: slotIndex };
    let values = { $set: { characterId: characterId } };
    myQuery.updateOne('PlayerParty', query, values, callback);
}