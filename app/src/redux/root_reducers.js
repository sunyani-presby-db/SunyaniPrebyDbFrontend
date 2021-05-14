import {combineReducers} from "redux"
import componentsReducer from "./reducers/components_reducer"
import members_reducers from "./reducers/members_reducers"
import { usersReducer } from "./streamlined/users"
// import postReducer from "./reducers/post_reducer"

const root_reducer = combineReducers({
members: members_reducers,
components:componentsReducer,
users:usersReducer,
})

export default root_reducer