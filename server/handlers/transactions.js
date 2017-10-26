const con = require('../mysql-con');
const helpers = require('../lib/db-helpers');

exports.newTransactions = ({ type, amount, payeeIds, payerIds, date, status = 'pending' }, res) => {
  let sql = 'INSERT INTO transactions (Type, Amount, PayeeID, PayerID, Date, Status) VALUES';
  const maxLength = Math.max(payeeIds.length, payerIds.length);
  for (let i = 0; i < maxLength; i++) {
    sql += ` ("${type}", ${amount}, ${type === 'pay' ? payeeIds[i] : payeeIds[0]}, ${type === 'pay' ? payerIds[0] : payerIds[i]}, "${date}", "${status}")`;
    if (i < maxLength - 1)
      sql += ',';
  }
  con.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({ 
        error: true, 
        message: err.message, 
      });
      console.error(err);
    } else 
      res.status(200).send({
        message: 'Transaction stored', 
        insertId: results.insertId,
        records: results.affectedRows,
      });
  });
};

exports.getUserTransactions = (id, date, res) => {
  let sql = `SELECT * FROM transactions WHERE (PayeeID = ${id} OR PayerID = ${id})`;
  if (date) sql += ` AND CreatedAt > "${date}"`;
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
        results: results.map(helpers.convertTransactionPropertyNames),
      })
  })
}