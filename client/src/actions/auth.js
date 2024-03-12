import axios from 'axios'
import {
    REG_PASS,
    REG_FAIL
} from '../actions/types'

//Register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post('/api/users', body, config)

        dispatch({
            type: REG_PASS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: REG_FAIL
        })
    }
}