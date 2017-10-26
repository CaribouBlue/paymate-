import axios from 'axios';
import { store } from '../../index';

export const getGroup = (groupId, userId) => {
  const action = {
    type: 'ADD_MEMBERS',
  };

  axios.get('http://localhost:8080/group', {
    params: {
      id: groupId,
    },
  }).then(({ data }) => {
    if (data.error) return data.message;
    else {
      action.payload = data.results.reduce((memo, result) => {
        if (result.id === userId) return memo;
        return [ ...memo, result];
      }, []);
      store.dispatch(action);
    }
  })
}