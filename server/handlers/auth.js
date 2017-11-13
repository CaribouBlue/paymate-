const con = require('../mysql-con');
const bcrypt = require('bcrypt-nodejs');

exports.signup = ({userName, firstName, lastName, pwd, groupId = null}, res) => {
  if (!userName || !firstName || !lastName || !pwd) {
    res.status(400).send({
      error: true,
      message: 'Missing critical information from client',
      meta: {
        userName: !!userName,
        firstName: !!firstName,
        lastName: !!lastName,
        pwd: !!pwd,
        groupId: !!groupId,
      },
    });
  } else {
    bcrypt.hash(pwd, null, null, function(err, hash) {
      if (err) {
        res.status(500).send({
          error: true,
          message: err,
        });
      } else {
        const sql = 'INSERT INTO users (UserName, FirstName, LastName, Pwd, GroupID) '
          + `("${userName}", "${firstName}", "${lastName}", "${hash}", "${groupId}")`;
        con.query(sql, (err, results) => {
          if (err) {
            res.status(400).send({
              error: true,
              message: err.message,
            });
            console.error(err);
          } else 
            res.status(200).send({
              message: 'Good query',
              results: results,
            });
        });
      }
    });
  }
}