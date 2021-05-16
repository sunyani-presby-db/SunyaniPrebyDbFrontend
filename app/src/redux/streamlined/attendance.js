import {axios_config} from '../../utils/networks/axios_config'
import {getToken} from '../../utils/local_data/store_user_info'
import axios from 'axios'
import { attendanceUrl } from '../../utils/networks/endpoints'
import { message } from 'antd'

const FETCH_SERVICE_DAYS_REQUEST = "FETCH_SERVICE_DAYS_REQUEST"
const FETCH_SERVICE_DAYS_SUCCCESS = "FETCH_SERVICE_DAYS_SUCCCESS"
const FETCH_SERVICE_DAYS_FAILED= "FETCH_SERVICE_DAYS_FAILED"


const fetchServiceDayRequest = ()=>{
    return {
        type:FETCH_SERVICE_DAYS_REQUEST
    }
}


const fetchServiceDaySuccess = days=>{
    return {
        type:FETCH_SERVICE_DAYS_SUCCCESS,
        payload:days
    }
}

const fetchSericeFailed = ()=>{
    return {
        type: FETCH_SERVICE_DAYS_FAILED
    }
}


export const fetchMeetingDays = ()=>dispatch=>{
    const config = axios_config(getToken())
    dispatch(fetchServiceDayRequest())
    axios.get(attendanceUrl,config).then(res=>{
        console.log(res.data);
        dispatch(fetchServiceDaySuccess(res.data))
    }).catch(error=>{
        console.log(error);
        if(error.response){
            dispatch(fetchSericeFailed())
            message.error(error.response.data.detail)
        }
    })
}


const initialState = {
    loading:false,
    data:[],
    mainData:[]

}

export const meetingDaysReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_SERVICE_DAYS_REQUEST:
        return { ...state, loading:true }

    case FETCH_SERVICE_DAYS_SUCCCESS:
        return{
            ...state,
            loading:false,
            data:payload,
            mainData:payload
        }
    case FETCH_SERVICE_DAYS_FAILED:
        return {
            ...state,
            loading:false,
            
        }

    default:
        return state
    }
}

