exports.convertTransactionPropertyNames = function(tDB) {
  return {
    amount: tDB.Amount,
    createdAt: tDB.CreatedAt,
    date: tDB.Date,
    id: tDB.ID,
    payeeId: tDB.PayeeID,
    payerId: tDB.PayerID,
    status: tDB.Status,
    type: tDB.Type,
  };
};