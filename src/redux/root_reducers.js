import {combineReducers} from "redux"
import componentsReducer from "./reducers/components_reducer"
import members_reducers from "./reducers/members_reducers"
import { meetingDaysReducer } from "./streamlined/attendance"
import group_reducer from "./streamlined/group"
import { usersReducer } from "./streamlined/users"
// import postReducer from "./reducers/post_reducer"

const root_reducer = combineReducers({
members: members_reducers,
components:componentsReducer,
users:usersReducer,
meetingDays:meetingDaysReducer,
groups:group_reducer,
})

export default root_reducer