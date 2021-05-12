import { ADD_MEMBER, DELETE_MEMBER_SUCCESS, FETCH_MEMBERS_FAILED, FETCH_MEMBERS_REQUEST, FETCH_MEMBERS_SUCCESS, SEARCH_MEMBER } from "../action_creators/members_action_creator"

const initialState = {
    loading:false,
    data:[],
    initData:[]

}

const members_reducers= (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_MEMBERS_REQUEST :
        return { ...state, loading:true}

    case  FETCH_MEMBERS_SUCCESS:
        return {
            ...state,
            loading:false,
            data:payload,
            initData:payload
        }
    case FETCH_MEMBERS_FAILED:
        return{
            ...state,
            loading:false,
        }
    case SEARCH_MEMBER:
        return {
            ...state,
            initData: state.data.filter(data_item=> data_item.first_name.toLowerCase().includes(payload.toLowerCase())
            ||data_item.last_name.toLowerCase().includes(payload.toLowerCase())
            ||data_item.memberId.toLowerCase().includes(payload.toLowerCase())
            
            )
        }
    case DELETE_MEMBER_SUCCESS:
        return{
            ...state,
            data: state.data.filter(item=>item.id !== payload.id ),
            initData: state.data.filter(item=>item.id !== payload.id )
        }

    case ADD_MEMBER:
        return {
            ...state,
            data: [
                ...state.data,
                payload
            ]
        }

    default:
        return state
    }
}
export default members_reducers