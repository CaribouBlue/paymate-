const defaultState = {};

const transactions = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTIONS' : {
      return { ...prevState, ...action.payload};
    }
    default: {
      return prevState;
    }
  }
};

export default transactions;