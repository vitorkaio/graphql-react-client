import { filter, mergeMap } from 'rxjs/operators';
import * as typeActions from './typeActions';
import * as userActions from './actions';
import { getUser, createUser } from 'services/apiService';

/* const getUser = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'Kaio',
        age: 18
      })
    }, 2e3)
  })
} */

export const userEpic = (action$, _) => action$.pipe(
  filter(action => action.type === typeActions.USER_REQUEST),
  // `mergeMap()` supports functions that return promises, as well as observables
  mergeMap(async (_) => {
    const user = await getUser()
    if (user) {
      // const timer = store.value.imgsReducer.timer;
      return userActions.userSuccess(user);
    }
    
    return userActions.userFail()
  }),
);


export const createUserEpic = (action$, _) => action$.pipe(
  filter(action => action.type === typeActions.CREATE_USER_REQUEST),
  // `mergeMap()` supports functions that return promises, as well as observables
  mergeMap(async (action) => {
    
    const { payload } = action;
    console.log(payload.user)
    const res = await createUser(payload.user)
    if (res) {
      // const timer = store.value.imgsReducer.timer;
      return userActions.createUserSuccess(res);
    }
    
    return userActions.createUserFail
  }),
);
