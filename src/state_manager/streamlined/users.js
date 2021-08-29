import {axios_config} from '../../utils/networks/axios_config'
import {getToken} from '../../utils/local_data/store_user_info'
import axios from 'axios'
import { getUsersUrl } from '../../utils/networks/endpoints'
import { message, notification } from 'antd'


//Action creators

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"
const SEARCH_USER = "SEARCH_USER"
const DELETE_USER = "DELETE_USER"

const ADD_USERS_SUCCESS = "ADD_USERS_SUCCESS"




//Actions
export const deleteUser = user=>{
    return {
        type:DELETE_USER,
        payload:user
    }
}

export const searchUser = query=>{
    return {
        type:SEARCH_USER,
        payload: query

    }
}

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


export const addUsersSuccess = users=>{
    return {
        type:ADD_USERS_SUCCESS,
        payload:users
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
    mainData:[],
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
            data:payload,
            mainData:payload
        }
    case FETCH_USERS_FAILED:
        return {
            ...state,
            loading:false,
        }
    case SEARCH_USER:
        
        return {
            ...state,
            data: state.mainData.filter(item=>item.username.toLowerCase().includes(payload.toLowerCase())
            ||item.email.toLowerCase().includes(payload.toLowerCase())
            ||item.first_name.toLowerCase().includes(payload.toLowerCase())
            ||item.last_name.toLowerCase().includes(payload.toLowerCase())
            
            )
        }
    case DELETE_USER:
        return {
            ...state,
            data:state.data.filter(item=>item.id !== payload.id),
            mainData:state.mainData.filter(item=>item.id !== payload.id)

    
        }
  
    case ADD_USERS_SUCCESS:
        console.log(payload);
        return {
            ...state,
            data: [...state.data,payload],
            mainData: [...state.mainData,payload]
        }
    default:
        return state
    }
}
