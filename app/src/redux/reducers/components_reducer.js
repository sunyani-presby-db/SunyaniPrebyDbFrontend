import { TOGGLE_LOADING_OVERLAY } from "../action_creators/component_actions_creators"

const initialState = {
    overlayLoadingVisible:false

}

const componentsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case TOGGLE_LOADING_OVERLAY:
        return { ...state, overlayLoadingVisible:payload }

    default:
        return state
    }
}
export default componentsReducer