import {AnyAction, combineReducers} from 'redux';
import {profileReducer} from './profile/reducer';
import {reportReducer} from './reports/reducer';

const combinedReducer = combineReducers({
  report: reportReducer,
  profile: profileReducer,
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
