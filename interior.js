let index = require('./index');
let myQuery = require('./myQuery');

exports.onMessageFindInteriors = (ws, data, status) => {
    findInteriors(data.playerId, (res) => {
        console.log('findInteriors: ' + res);
        let dataObj = [];
        for(let i = 0; i < res.length; i++) {
            dataObj[i] = {
                playerId: res[i].playerId,
                playerInteriorId: res[i].playerInteriorId,
                interiorId: res[i].interiorId,
                position: res[i].position,
                isConstructed: res[i].isConstructed,
                isFlipped: res[i].isFlipped,
            };
        }
        let sendObj = { status: status, data: JSON.stringify(dataObj) };
        ws.send(JSON.stringify(sendObj));
    });
}

exports.onMessageInsertInterior = (ws, data, status) => {
    insertInterior(data.playerId, data.playerInteriorId, data.interiorId, data.position, data.isConstructed, data.isFlipped, (res) => {
        console.log('insertInterior: ' + res)
    });
}

exports.onMessageDeleteInterior = (ws, data, status) => {
    deleteInterior(data.playerId, data.playerInteriorId, (obj) => {
        console.log('deleteInterior: ' + obj);
    });
}

exports.onMessageDeleteInteriors = (ws, data, status) => {
    deleteInteriors(data.playerId, (obj) => {
        console.log('deleteInteriors: ' + obj);
    });
}

exports.onMessageUpdateInterior = (ws, data, status) => {
    updateInterior(data.playerId, data.playerInteriorId, data.interiorId, data.position, data.isConstructed, dat.isFlipped, (res) => {
        console.log('updateInterior: ' + res);
    });
}

const findInteriors = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findMany('Interior', query, callback);
}

const insertInterior = (playerId, playerInteriorId, interiorId, position, isConstructed, isFlipped, callback) => {
    let obj = { playerId: playerId, playerInteriorId: playerInteriorId, interiorId: interiorId, position: position, isConstructed: isConstructed, isFlipped: isFlipped };
    myQuery.insertOne('Interior', obj, callback);
}

const deleteInterior = (playerId, playerInteriorId, callback) => {
    let query = { playerId: playerId, playerInteriorId: playerInteriorId };
    myQuery.deleteOne('Interior', query, callback);
}

const deleteInteriors = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteMany('Interior', query, callback);
}

const updateInterior = (playerId, playerInteriorId, interiorId, position, isConstructed, isFlipped, callback) => {
    let query = { playerId: playerId, playerInteriorId: playerInteriorId };
    let values = { $set: { interiorId: interiorId, position: position, isConstructed: isConstructed, isFlipped: isFlipped } };
    myQuery.updateOne('Interior', query, values, callback);
}

index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    let dbo = db.db('mydb');
    dbo.createCollection('Interior', (err, res) => {
        if(err) throw err;
        dbo.collection('Interior').createIndex( { playerId: 1, playerInteriorId: 1 }, { unique: true } );
        db.close();
    });
});