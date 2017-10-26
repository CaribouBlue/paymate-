const defaultState = {
  id: 1,
  userName: 'caribou_blue',
  firstName: 'Alec',
  lastName: 'Draymore',
  groupId: 1,
};

const user = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return defaultState;
    }
    case 'LOG_OUT': {
      return {};
    }
    default: {
      return prevState;
    }
  }
};

export default user;