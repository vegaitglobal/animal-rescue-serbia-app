import {AnyAction, combineReducers} from 'redux';
import {authenticationReducer} from './authentication/reducer';
import {reportReducer} from './reports/reducer';

const combinedReducer = combineReducers({
  report: reportReducer,
  authentication: authenticationReducer,
});

export const rootReducer = (
  state: RootState | undefined,
  action: AnyAction,
) => {
  //   if (signoutaction.fulfilled.match(action)) {
  //     state = undefined;
  //   }

  //This will come in handy soon

  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
