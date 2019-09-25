import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    token: string | null;
    email: string | null;
    expires: number | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    token: null,
    email: null,
    expires: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                email: action.payload.email,
                expires: action.payload.expires,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error.error.err
            };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                email: action.payload.email,
                expires: action.payload.expires,
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error.error.err
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
