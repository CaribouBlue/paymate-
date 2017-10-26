const defaultState = [
  // id: 1,
  // count: 3,
  // members: [
  //   4: {
  //     id: 4,
  //     userName: 'mateo_san',
  //     firstName: 'Mateo',
  //     lastName: 'Creamer',
  //   },
  //   2: {
  //     id: 2,
  //     userName: 'sushL',
  //     firstName: 'Sasha',
  //     lastName: 'Lehambre-Shia',
  //   },
  //   3: {
  //     id: 3,
  //     userName: 'bobby_str',
  //     firstName: 'Robert',
  //     lastName: 'Strang',
  //   },
  // ],
];

const group = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'ADD_MEMBERS' : {
      return [ ...prevState, ...action.payload ];
    }
    default: {
      return prevState;
    }
  }
};

export default group;