import { SCALE_MAP } from '../actions';

const initalState = {
  scale: 24
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SCALE_MAP:
      return { ...state, scale: action.scale };
    default:
      return state;
  }
};
