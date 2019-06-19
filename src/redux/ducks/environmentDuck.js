import { createActionTypes } from 'redux/reduxUtils';
import { AppTheme } from 'utils/constants';

const EnvironmentDuck = {
  name: 'EnvironmentDuck',
};

const initialState = {
  selectedTheme: AppTheme.default,
};

const actionTypes = createActionTypes(
  {
    setTheme: 'setTheme',
  },
  EnvironmentDuck.name,
);

EnvironmentDuck.reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.setTheme:
      return { ...state, selectedTheme: payload };

    default:
      return state;
  }
};

EnvironmentDuck.setTheme = theme => dispatch => {
  dispatch({
    type: actionTypes.setTheme,
    payload: theme,
  });
};

const getOwnState = state => {
  return state[EnvironmentDuck.name] || initialState;
};

EnvironmentDuck.getSelectedTheme = state => getOwnState(state).selectedTheme;

export default EnvironmentDuck;
