let index = require('./index');
let myQuery = require('./myQuery');

exports.onMessageFindLevel = (ws, data, status) => {
    findLevel(data.playerId, (res) => {
        let sendObj;
        if(res == null) {
            sendObj = { status: status, data: null };
        } else {
            let dataObj = { playerId: res.playerId, level: res.level, exp: res.exp };
            sendObj = { status: status, data: JSON.stringify(dataObj) };
        }
        ws.send(JSON.stringify(sendObj));
    });
}
exports.onMessageInsertLevel = (ws, data, status) => {
    insertLevel(data.playerId, data.level, data.exp, (res) => {
        console.log('insertLevel: ' + res);
    });
}

exports.onMessageDeleteLevel = (ws, data, status) => {
    deleteLevel(data.playerId, (obj) => {
        console.log('deleteLevel: ' + obj);
    });
}

exports.onMessageUpdateLevel = (ws, data, status) => {
    updateLevel(data.playerId, data.level, data.exp, (res) => {
        console.log('updateLevel: ' + res);
    });
}

const findLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.findOne('Level', query, callback);
}

const insertLevel = (playerId, level, exp, callback) => {
    let obj = { playerId: playerId, level: level, exp: exp };
    myQuery.insertOne('Level', obj, callback);
}

const deleteLevel = (playerId, callback) => {
    let query = { playerId: playerId };
    myQuery.deleteOne('Level', query, callback);
}

const updateLevel = (playerId, level, exp, callback) => {
    let query = { playerId: playerId };
    let values = { $set: { level: level, exp: exp } };
    myQuery.updateOne('Level', query, values, callback);
}

index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    let dbo = db.db('mydb');
    dbo.createCollection('Level', (err, res) => {
        if(err) throw err;
        dbo.collection('Level').createIndex( { playerId: 1 }, { unique: true } );
        db.close();
    });
});