import axios from 'axios'

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const FETCH_ADOPTIONS_SUCCESS = 'FETCH_ADOPTIONS_SUCCESS'
export const FETCH_ADOPTIONS_FAILURE = 'FETCH_ADOPTIONS_FAILURE'

export const userLogin = (creds) => {
    return async dispatch => {
        try {
            let user = await axios.post('https://guarded-bastion-60433.herokuapp.com/auth', creds)
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: user
            })
        } catch (err) {
            dispatch({
                type: LOGIN_FAILED,
                payload: err
            })
        }
    }
}

export const fetchAdoptions = () => {
    return async dispatch => {
        try {
            let res = await axios.get('https://guarded-bastion-60433.herokuapp.com/adoptions')
            dispatch({
                type: FETCH_ADOPTIONS_SUCCESS,
                payload: res.data.pet
            })
        } catch (err) {
            dispatch({
                type: FETCH_ADOPTIONS_FAILURE,
                payload: err
            })
        }
    }
}