let myQuery = require('./myQuery');

// TODO PlayerParty

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