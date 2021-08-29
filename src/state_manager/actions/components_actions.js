import {TOGGLE_LOADING_OVERLAY} from "../action_creators/component_actions_creators"
export const toggleLoadingOverley = status=>{
    return {
        type: TOGGLE_LOADING_OVERLAY,
        payload:status
    }
}