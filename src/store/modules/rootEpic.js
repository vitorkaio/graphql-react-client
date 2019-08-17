import { combineEpics } from 'redux-observable';
import { userEpic, createUserEpic } from './user/epics';

const epics = [
  userEpic,
  createUserEpic
];

const epicsRoots = combineEpics(...epics);

export default epicsRoots;
