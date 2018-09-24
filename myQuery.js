let index = require('./index');

exports.findOne = (collectionName, query, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true}, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).findOne(query, (err, res) => {
            if(err) throw err;
            else callback(res);
            db.close();
        });
    });
}

exports.findMany = (collectionName, query, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).find(query).toArray((err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

exports.insertOne = (collectionName, obj, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).insertOne(obj, (err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}

exports.deleteOne = (collectionName, query, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).deleteOne(query, (err, obj) => {
            if(err) throw err;
            callback(obj);
            db.close();
        });
    });
}

exports.deleteMany = (collectionName, query, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).deleteMany(query, (err, obj) => {
            if(err) throw err;
            callback(obj);
            db.close();
        });
    });
}

exports.updateOne = (collectionName, query, values, callback) => {
    index.MongoClient.connect(index.url, { useNewUrlParser: true }, (err, db) => {
        if(err) throw err;
        let dbo = db.db('mydb');
        dbo.collection(collectionName).updateOne(query, values, (err, res) => {
            if(err) throw err;
            callback(res);
            db.close();
        });
    });
}