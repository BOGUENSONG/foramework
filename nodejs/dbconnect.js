var mongoose = require('mongoose'); //mongoDB연결

module.exports = () => {
    function connect() {
        mongoose.connect('localhost:27017',function(err) {
            if (err) {
                console.error('mongodb connection error',err);
            }
            console.log('mongodb connected');
        });
    }
    connect()
    mongoose.connection.on('disconnected',connect);
    require('./user.js'); //user.js db에서 해당 스키마를 가져온다.
};