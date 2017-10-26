const handleTransactions = require('./handlers/transactions');
const handleGroups = require('./handlers/groups');

const router = require('express').Router();

router.get('/', (req, res, next) => res.send('boo'));

router.get('/gql', (req, res, next) => res.send('GraphQL End Point'));

/* 
  req.body JSON example: { 
    "type": "pay", 
    "amount": 100.00, 
    "payeeId": 1, 
    "payerId": 2, 
    "date": "2017-10-25" 
  } 
*/
router.post('/transactions/new', (req, res, next) => handleTransactions.newTransactions(req.body, res));

/*
  Date must be in one of the following formates:
    - "yyyy-mm-dd hh:mm:ss" (where hh is military time)
    - "yyyy-mm-dd" (Note: 2017-10-25 will include 2017-10-25)
*/
router.get('/transactions/user', (req, res, next) => handleTransactions.getUserTransactions(req.query.id, req.query.date, res));

router.get('/group', (req, res, next) => handleGroups.getGroupById(req.query.id, res));

module.exports = router;