import UserService from '../UserService';
import { createActionTypes } from 'redux/reduxUtils';

const UserDuck = {
  name: 'UserDuck',
};

const initialState = {
  loggedUser: {},
  users: [],
  userDetail: {},
};

const actionTypes = createActionTypes(
  {
    setLoggedUser: 'setLoggedUser',
    setUsers: 'setUsers',
    setUserDetail: 'setUserDetail',
  },
  UserDuck.name,
);

UserDuck.reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.setUsers:
      return {
        ...state,
        users: payload,
      };

    case actionTypes.setLoggedUser:
      return {
        ...state,
        setLoggedUser: payload,
      };

    case actionTypes.setUserDetail:
      return {
        ...state,
        userDetail: payload,
      };

    default:
      return state;
  }
};

UserDuck.getUsers = ({ limit, offset }) => async dispatch => {
  try {
    const { data } = await UserService.getUsers({ limit, offset });

    dispatch({
      type: actionTypes.setUsers,
      payload: data,
    });
  } catch (e) {
    // handle error
  }
};

const getOwnState = state => {
  return state[UserDuck.name] || initialState;
};

UserDuck.getUsers = state => getOwnState(state).users;
UserDuck.isUserLogged = state => !!getOwnState(state).loggedUser.id;

export default UserDuck;
