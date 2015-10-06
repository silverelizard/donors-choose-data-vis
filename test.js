var pg = require('pg');

var conString = "postgres://master:Hackathon2015@donors-choose.ct8ks5pp86im.us-west-2.redshift.amazonaws.com:5439/donorschoose";

pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM donorschoose_projects LIMIT 1', function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0]);
        //output: 1
    });
});