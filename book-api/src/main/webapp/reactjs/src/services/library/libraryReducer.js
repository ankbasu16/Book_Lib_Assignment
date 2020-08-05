import {SAVE_LIBRARY_REQUEST, FETCH_LIBRARY_REQUEST, UPDATE_LIBRARY_REQUEST, DELETE_LIBRARY_REQUEST, LIBRARY_SUCCESS, LIBRARY_FAILURE} from "./libraryTypes";

const initialState = {
    library: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_LIBRARY_REQUEST || FETCH_LIBRARY_REQUEST || UPDATE_LIBRARY_REQUEST || DELETE_LIBRARY_REQUEST:
            return {
                ...state
            };
        case LIBRARY_SUCCESS:
            return {
                library: action.payload,
                error: ''
            };
        case LIBRARY_FAILURE:
            return {
                library: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;