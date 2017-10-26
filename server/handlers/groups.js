const con = require('../mysql-con');

exports.getGroupById = (id, res) => {
  const sql = `
    SELECT users.id, users.userName, users.firstName, users.lastName, groups.count AS groupCount, groups.name AS groupName 
    FROM users INNER JOIN groups 
    ON users.GroupID=groups.ID 
    WHERE GroupID=${id}
  `;

  con.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        error: true,
        message: err.message,
      });
      console.error(err);
    }
    else
      res.status(200).send({
        message: 'Good query',
        results,
      });
  });
};