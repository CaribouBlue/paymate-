const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ARD@1994'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to local mysql');
  con.query('USE paymates', (err, res) => {
    if (err) throw err;
    console.log('Using paymates DB');
  });
});


module.exports = con;
