import {SAVE_LIBRARY_REQUEST, FETCH_LIBRARY_REQUEST, UPDATE_LIBRARY_REQUEST, DELETE_LIBRARY_REQUEST, LIBRARY_SUCCESS, LIBRARY_FAILURE} from "./libraryTypes";
import axios from 'axios';

export const saveLibrary = library => {
    return dispatch => {
        dispatch(saveLibraryRequest());
        axios.post("/libraries", library)
            .then(response => {
                dispatch(librarySuccess(response.data));
            })
            .catch(error => {
                dispatch(libraryFailure(error));
            });
    };
};

const saveLibraryRequest = () => {
    return {
        type: SAVE_LIBRARY_REQUEST
    };
};

const fetchLibraryRequest = () => {
    return {
        type: FETCH_LIBRARY_REQUEST
    };
};

export const fetchLibrary = libraryId => {
    return dispatch => {
        dispatch(fetchLibraryRequest());
        axios.get("/libraries/"+libraryId)
            .then(response => {
                dispatch(librarySuccess(response.data));
            })
            .catch(error => {
                dispatch(libraryFailure(error));
            });
    };
};

const updateLibraryRequest = () => {
    return {
        type: UPDATE_LIBRARY_REQUEST
    };
};

export const updateLibrary = libraryId => {
    return dispatch => {
        dispatch(updateLibraryRequest());
        axios.put("/libraries/", libraryId)
            .then(response => {
                dispatch(librarySuccess(response.data));
            })
            .catch(error => {
                dispatch(libraryFailure(error));
            });
    };
};

const deleteLibraryRequest = () => {
    return {
        type: DELETE_LIBRARY_REQUEST
    };
};

export const deleteLibrary = libraryId => {
    return dispatch => {
        dispatch(deleteLibraryRequest());
        axios.delete("/libraries/"+libraryId)
            .then(response => {
                dispatch(librarySuccess(response.data));
            })
            .catch(error => {
                dispatch(libraryFailure(error));
            });
    };
};

const librarySuccess = library => {
    return {
        type: LIBRARY_SUCCESS,
        payload: library
    };
};

const libraryFailure = error => {
    return {
        type: LIBRARY_FAILURE,
        payload: error
    };
};