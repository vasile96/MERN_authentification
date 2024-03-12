import { 
    REG_PASS,
    REG_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case REG_PASS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
            case REG_FAIL:
                localStorage.removeItem('token')
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
                }
                default:
                    return state
    }
}