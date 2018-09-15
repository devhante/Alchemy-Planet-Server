let playerName = require('./playerName');
let playerLevel = require('./playerLevel');
let playerGoods = require('./playerGoods');
let playerItem = require('./playerItem');
let playerStructure = require('./playerStructure');
let playerTownStructure = require('./playerTownStructure');
let playerUpgradingStructure = require('./playerUpgradingStructure');
let playerCharcter = require('./playerCharacter');
let playerParty = require('./playerParty');
let playerRequest = require('./playerRequest');

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port : 3000 });

exports.MongoClient = require('mongodb').MongoClient;
exports.url = 'mongodb://localhost:27017/';

console.log('Server running on port 3000');

wss.on('connection', (ws) => {
    console.log('Client connected.');
    ws.on('message', (message) => {
        let obj = JSON.parse(message);
        let data = JSON.parse(obj.data);

        switch(obj.status) {
            case 'findPlayerName': playerName.onMessageFindPlayerName(ws, data); break;
            case 'insertPlayerName': playerName.onMessageInsertPlayerName(ws, data); break;
            case 'deletePlayerName': playerName.onMessageDeletePlayerName(ws, data); break;
            case 'updatePlayerName': playerName.onMessageUpdatePlayerName(ws, data); break;

            case 'findPlayerLevel': playerLevel.onMessageFindPlayerLevel(ws, data); break;
            case 'insertPlayerLevel': playerLevel.onMessageInsertPlayerLevel(ws, data); break;
            case 'deletePlayerLevel': playerLevel.onMessageDeletePlayerLevel(ws, data); break;
            case 'updatePlayerLevel': playerLevel.onMessageUpdatePlayerLevel(ws, data); break;

            case 'findPlayerGoods': playerGoods.onMessageFindPlayerGoods(ws, data); break;
            case 'insertPlayerGoods': playerGoods.onMessageInsertPlayerGoods(ws, data); break;
            case 'deletePlayerGoods': playerGoods.onMessageDeletePlayerGoods(ws, data); break;
            case 'updatePlayerGoods': playerGoods.onMessageUpdatePlayerGoods(ws, data); break;

            case 'findPlayerItems': playerItem.onMessageFindPlayerItems(ws, data); break;
            case 'insertPlayerItem': playerItem.onMessageInsertPlayerItem(ws, data); break;
            case 'deletePlayerItem': playerItem.onMessageDeletePlayerItem(ws, data); break;
            case 'deletePlayerItems': playerItem.onMessageDeletePlayerItems(ws, data); break;
            case 'updatePlayerItem': playerItem.onMessageUpdatePlayerItem(ws, data); break;

            case 'findPlayerStructures': playerStructure.onMessageFindPlayerStructures(ws, data); break;
            case 'insertPlayerStructure': playerStructure.onMessageInsertPlayerStructure(ws, data); break;
            case 'deletePlayerStructure': playerStructure.onMessageDeletePlayerStructure(ws, data); break;
            case 'deletePlayerStructures': playerStructure.onMessageDeletePlayerStructures(ws, data); break;
            case 'updatePlayerStructure': playerStructure.onMessageUpdatePlayerStructure(ws, data); break;

            case 'findPlayerTownStructures': playerTownStructure.onMessageFindPlayerTownStructures(ws, data); break;
            case 'insertPlayerTownStructure': playerTownStructure.onMessageInsertPlayerTownStructure(ws, data); break;
            case 'deletePlayerTownStructure': playerTownStructure.onMessageDeletePlayerTownStructure(ws, data); break;
            case 'deletePlayerTownStructures': playerTownStructure.onMessageDeletePlayerTownStructures(ws, data); break;
            case 'updatePlayerTownStructure': playerTownStructure.onMessageUpdatePlayerTownStructure(ws, data); break;

            case 'findPlayerUpgradingStructures': playerUpgradingStructure.onMessageFindPlayerUpgradingStructures(ws, data); break;
            case 'insertPlayerUpgradingStructure': playerUpgradingStructure.onMessageInsertPlayerUpgradingStructure(ws, data); break;
            case 'deletePlayerUpgradingStructure': playerUpgradingStructure.onMessageDeletePlayerUpgradingStructure(ws, data); break;
            case 'deletePlayerUpgradingStructures': playerUpgradingStructure.onMessageDeletePlayerUpgradingStructures(ws, data); break;
            case 'updatePlayerUpgradingStructure': playerUpgradingStructure.onMessageUpdatePlayerUpgradingStructure(ws, data); break;

            case 'findPlayerCharacters': playerCharcter.onMessageFindPlayerCharacters(ws, data); break;
            case 'insertPlayerCharacter': playerCharcter.onMessageInsertPlayerCharacter(ws, data); break;
            case 'deletePlayerCharacter': playerCharcter.onMessageDeletePlayerCharacter(ws, data); break;
            case 'deletePlayerCharacters': playerCharcter.onMessageDeletePlayerCharacters(ws, data); break;
            case 'updatePlayerCharacter': playerCharcter.onMessageUpdatePlayerCharacter(ws, data); break;

            case 'findPlayerParties': playerParty.onMessageFindPlayerParties(ws, data); break;
            case 'insertPlayerParty': playerParty.onMessageInsertPlayerParty(ws, data); break;
            case 'deletePlayerParty': playerParty.onMessageDeletePlayerParty(ws, data); break;
            case 'deletePlayerParties': playerParty.onMessageDeletePlayerParties(ws, data); break;
            case 'updatePlayerParty': playerParty.onMessageUpdatePlayerParty(ws, data); break;

            case 'findPlayerRequests': playerRequest.onMessageFindPlayerRequests(ws, data); break;
            case 'insertPlayerRequest': playerRequest.onMessageInsertPlayerRequest(ws, data); break;
            case 'deletePlayerRequest': playerRequest.onMessageDeletePlayerRequest(ws, data); break;
            case 'deletePlayerRequests': playerRequest.onMessageDeletePlayerRequests(ws, data); break;
        }
    });
});

// DROP

// let collections = ['PlayerUpgradingStructure'];

// exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
//     if(err) throw err;
//     let dbo = db.db('mydb');
//     for(let i = 0; i < collections.length; i++) {
//         if(dbo.collection(collections[i]).countDocuments)
//         dbo.collection(collections[i]).drop((err, ok) => {
//             if(err) throw err;
//             if(ok) console.log('dropped.');
//             db.close();
//         });
//     }
    
// });