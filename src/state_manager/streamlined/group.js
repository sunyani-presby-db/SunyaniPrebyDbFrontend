import axios from "axios";
import { message } from "antd";
import { groupsUrl } from "../../utils/networks/endpoints";
import { axios_config } from "../../utils/networks/axios_config";
import { getToken } from "../../utils/local_data/store_user_info";

//Action creators
const FETCH_GROUP_REQUEST = "FETCH_GROUP_REQUEST";
const ADDED_NEW_GROUP = "ADDED_NEW_GROUP";

//Post group action creators
const POST_GROUP_SUCCESS = "POST_GROUP_SUCCESS";

export const postGroupSucess = (group) => {
  return {
    type: POST_GROUP_SUCCESS,
    payload: group,
  };
};

export const getAllGroupData = () => (dispatch) => {
  const config = axios_config(getToken());
  axios
    .get(groupsUrl, config)
    .then((res) => {
      // console.log('groups-data', res.data);
      dispatch(fetchGroupData(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.detail);
        message.error(error.response.data.detail);
      }
    });
};

export const fetchGroupData = (data) => {
  return {
    type: FETCH_GROUP_REQUEST,
    payload: {
      data: [...data],
    },
  };
};

export const addGroup = () => {
  return {
    type: ADDED_NEW_GROUP,
  };
};

const initialState = {
  data: [],
  initData: [],
  loading: false,
};

const group_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GROUP_REQUEST:
      return {
        ...state,
        data: [...payload.data],
      };
    case POST_GROUP_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload],
      };

    default:
      return state;
  }
};

export default group_reducer;
