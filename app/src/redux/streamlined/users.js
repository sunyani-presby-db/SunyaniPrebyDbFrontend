import {axios_config} from '../../utils/networks/axios_config'
import {getToken} from '../../utils/local_data/store_user_info'
import axios from 'axios'
import { getUsersUrl } from '../../utils/networks/endpoints'
import { message, notification } from 'antd'


//Action creators

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"



//Actions
const fetchUsersRequest = ()=>{
    return {
        type:FETCH_USERS_REQUEST}
}

const fetchUsersSuccess = users=>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure =()=>{
    return {
        type:FETCH_USERS_FAILED
    }
}



export const getUser =()=>dispatch=>{
    dispatch(fetchUsersRequest(getToken()))
    const config = axios_config(getToken())
    axios.get(getUsersUrl,config).then(res=>{
        console.log(res.data);
        dispatch(fetchUsersSuccess(res.data))
    }).catch(error=>{
        dispatch(fetchUsersFailure())
        if(error.response){
            console.log(error.response.data.detail);
            message.error(error.response.data.detail)
        }else if(error.request){
            notification.error({
                message:"Users fetch failed",
                description:"Network error. Check internet connection"

            })
        }
    })
}




//Reducer

const initialState = {
    loading:false,
    data:[]

}

export const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_USERS_REQUEST:
        return { 
            ...state, 
            loading:true
        }
    case FETCH_USERS_SUCCESS:
        return{
            ...state,
            loading:false,
            data:payload
        }
    case FETCH_USERS_FAILED:
        return {
            ...state,
            loading:false,
        }
    default:
        return state
    }
}
