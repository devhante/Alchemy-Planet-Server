let playerName = require('./playerName');
let playerLevel = require('./playerLevel');
let playerGoods = require('./playerGoods');
let playerItem = require('./playerItem');
let playerStructure = require('./playerStructure');
let playerTownStructure = require('./playerTownStructure');
let PlayerUpgradingStructure = require('./playerUpgradingStructure');
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

        console.log('status: ' + obj.status);

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

            // 여기부터 구현 안함

            // case 'findPlayerStructures': playerStructure.onMessageFindPlayerStructures(ws, data);
            // case 'insertPlayerStructure': playerStructure.onMessageInsertPlayerStructure(ws, data);
            // case 'deletePlayerStructure': playerStructure.onMessageDeletePlayerStructure(ws, data);
            // case 'deletePlayerStructures': playerStructure.onMessageDeletePlayerStructures(ws, data);
            // case 'updatePlayerStructure': playerStructure.onMessageUpdatePlayerStructure(ws, data);

            // case 'findPlayerTownStructures': playerTownStructure.onMessageFindPlayerTownStructures(ws, data);
            // case 'insertPlayerTownStructure': playerTownStructure.onMessageInsertPlayerTownStructure(ws, data);
            // case 'deletePlayerTownStructure': playerTownStructure.onMessageDeletePlayerTownStructure(ws, data);
            // case 'deletePlayerTownStructures': playerTownStructure.onMessageDeletePlayerTownStructures(ws, data);
            // case 'updatePlayerTownStructure': playerTownStructure.onMessageUpdatePlayerTownStructure(ws, data);

            // case 'findPlayerUpgradingStructures': PlayerUpgradingStructure.onMessageFindPlayerUpgradingStructures(ws, data);
            // case 'insertPlayerUpgradingStructure': PlayerUpgradingStructure.onMessageInsertPlayerUpgradingStructure(ws, data);
            // case 'deletePlayerUpgradingStructure': PlayerUpgradingStructure.onMessageDeletePlayerUpgradingStructure(ws, data);
            // case 'deletePlayerUpgradingStructures': PlayerUpgradingStructure.onMessageDeletePlayerUpgradingStructures(ws, data);
            // case 'updatePlayerUpgradingStructure': PlayerUpgradingStructure.onMessageUpdatePlayerUpgradingStructure(ws, data);

            // case 'findPlayerCharacters': playerCharcter.onMessageFindPlayerCharacters(ws, data);
            // case 'insertPlayerCharacter': playerCharcter.onMessageInsertPlayerCharacter(ws, data);
            // case 'deletePlayerCharacter': playerCharcter.onMessageDeletePlayerCharacter(ws, data);
            // case 'deletePlayerCharacters': playerCharcter.onMessageDeletePlayerCharacters(ws, data);
            // case 'updatePlayerCharacter': playerCharcter.onMessageUpdatePlayerCharacter(ws, data);

            // case 'findPlayerParties': playerParty.onMessageFindPlayerParties(ws, data);
            // case 'insertPlayerParty': playerParty.onMessageInsertPlayerParty(ws, data);
            // case 'deletePlayerParty': playerParty.onMessageDeletePlayerParty(ws, data);
            // case 'deletePlayerParties': playerParty.onMessageDeletePlayerParties(ws, data);
            // case 'updatePlayerParty': playerParty.onMessageUpdatePlayerParty(ws, data);

            // case 'findPlayerRequests': playerRequest.onMessageFindPlayerRequests(ws, data);
            // case 'insertPlayerRequest': playerRequest.onMessageInsertPlayerRequest(ws, data);
            // case 'deletePlayerRequest': playerRequest.onMessageDeletePlayerRequest(ws, data);
            // case 'deletePlayerRequests': playerRequest.onMessageDeletePlayerRequests(ws, data);
        }
    });
});

// DROP

// exports.MongoClient.connect(exports.url, { useNewUrlParser:true }, (err, db) => {
//     if(err) throw err;
//     let dbo = db.db('mydb');
//     dbo.collection('PlayerItem').drop((err, ok) => {
//         if(err) throw err;
//         if(ok) console.log('dropped.');
//         db.close();
//     });
// });