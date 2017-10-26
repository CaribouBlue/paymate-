import axios from 'axios';
import { store } from '../../index';

export const newTrasactions = (transactObj) => {
  const action = {
    type: 'ADD_TRANSACTIONS',
    payload: {},
  };
  const type = transactObj.type;
  const payerIds = transactObj.payerIds;
  const payeeIds = transactObj.payeeIds;

  axios.post('http://localhost:8080/transactions/new', transactObj)
    .then(({ data }) => {
      if (data.error) return data.message;
      for (let i = 0; i < Math.max(payeeIds.length, payerIds.length); i++) {
        const transaction = {
          id: data.insertId + i,
          type: transactObj.type,
          amount: transactObj.amount,
          date: transactObj.date,
          payerId: type === 'pay' ? payerIds[0] : payerIds[i],
          payeeId: type === 'pay' ? payeeIds[i] : payeeIds[0],
          status: 'pending',
        }
        action.payload[transaction.id] = transaction;
      }
      store.dispatch(action);
    });
};

export const getUserTransactions = (id, date) => {
  const action = {
    type: 'ADD_TRANSACTIONS',
  }
  axios.get('http://localhost:8080/transactions/user', {
    params: {
      id,
      date,
    },
  }).then(({ data }) => {
    action.payload = data.results.reduce((obj, transact) => {
      obj[transact.id] = transact;
      return obj;
    }, {});
    store.dispatch(action);
  });
};