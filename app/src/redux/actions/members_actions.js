import { message, notification } from "antd"
import axios from "axios"
import { getToken } from "../../utils/local_data/store_user_info"
import { axios_config } from "../../utils/networks/axios_config"
import { membersUrl } from "../../utils/networks/endpoints"
import { ADD_MEMBER, DELETE_MEMBER_SUCCESS, FETCH_MEMBERS_FAILED, FETCH_MEMBERS_REQUEST, FETCH_MEMBERS_SUCCESS, SEARCH_MEMBER } from "../action_creators/members_action_creator"

 const fetchMembersRequest = ()=>{
    return {
        type: FETCH_MEMBERS_REQUEST
    }
}
 const fetchMembersFailed= ()=>{
    return {
        type: FETCH_MEMBERS_FAILED
    }
}
 const fetchMembersSuccess = members=>{
    return {
        type: FETCH_MEMBERS_SUCCESS,
        payload:members
    }
}


export const deleteMemberSuccess = data=>{
    return {
        type: DELETE_MEMBER_SUCCESS,
        payload:data
    }
}

export const searchForMember = search=>{
    return {
        type :SEARCH_MEMBER,
        payload:search
    }
}

export const addMember = member=>{
    return {
        type: ADD_MEMBER,
        payload:member
    }
}

export const getMembers = ()=>dispatch=>{
    dispatch(fetchMembersRequest())
    
    const config = axios_config(getToken())
    console.log(config);
    // console.log(membersUrl);
    axios.get(membersUrl,config).then(res=>{
        console.log(res.data)
        dispatch(fetchMembersSuccess(res.data))

    }).catch(err=>{
        dispatch(fetchMembersFailed())

        if(err.response){
            message.error("Fetching members failed")

        }else if(err.request){
            notification.error({
                message:"Network error",
                description:"Check internet connction"
            })
        }
    })
}

