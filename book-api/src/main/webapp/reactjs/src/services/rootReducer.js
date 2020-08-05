import {combineReducers} from 'redux';
import libraryReducer from './library/libraryReducer';

const rootReducer = combineReducers({
   library: libraryReducer
});

export default rootReducer;