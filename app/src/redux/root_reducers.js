import {combineReducers} from "redux"
import componentsReducer from "./reducers/components_reducer"
import members_reducers from "./reducers/members_reducers"
import { usersReducer } from "./streamlined/users"
import group_reducer from "./streamlined/group"
// import postReducer from "./reducers/post_reducer"

const root_reducer = combineReducers({
members: members_reducers,
groups: group_reducer,
components:componentsReducer,
users:usersReducer,
})

export default root_reducer