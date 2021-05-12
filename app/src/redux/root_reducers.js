import {combineReducers} from "redux"
import componentsReducer from "./reducers/components_reducer"
import members_reducers from "./reducers/members_reducers"
// import postReducer from "./reducers/post_reducer"

const root_reducer = combineReducers({
members: members_reducers,
components:componentsReducer,
})

export default root_reducer