import UserDuck from 'modules/user/duck/UserDuck';
import { combineReducers } from 'redux';

const combineDucks = (...ducks) =>
  combineReducers(
    ducks.reduce((root, duck) => {
      return { ...root, [duck.name]: duck.reducer };
    }, {}),
  );

export default combineDucks(UserDuck);
