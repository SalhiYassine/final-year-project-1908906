import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './redux/reducers/userReducer';
import {
  courseCreate, courseAddParticipant, courseGetAll, courseGetOne, courseRemoveParticipant
} from './redux/reducers/courseReducer';
import { sessionCreate, sessionUpdate, sessionGetOne, sessionGetParticipant } from './redux/reducers/sessionReducer'
import { attendanceCreateOrg, attendanceGetParticipant, attendanceUpdate, attendanceDelete } from './redux/reducers/attendanceReducer'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  courseCreate,
  courseAddParticipant,
  courseRemoveParticipant,
  courseGetAll,
  courseGetOne,
  sessionCreate,
  sessionUpdate,
  sessionGetOne,
  sessionGetParticipant,
  attendanceGetParticipant,
  attendanceCreateOrg,
  attendanceUpdate,
  attendanceDelete,

});

const initialState = {
  userLogin: { loading: true, authenticated: false },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
