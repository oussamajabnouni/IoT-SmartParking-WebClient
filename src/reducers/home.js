'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        history: action.payload[0].history
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
  }

  return state;
};
