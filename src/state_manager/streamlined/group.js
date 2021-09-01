import axios from "axios";
import { message, notification } from "antd";
import { groupsDetailedUrl, groupsUrl } from "../../utils/networks/endpoints";
import { axios_config } from "../../utils/networks/axios_config";
import { getToken } from "../../utils/local_data/store_user_info";

//Action creators
const FETCH_GROUP_REQUEST = "FETCH_GROUP_REQUEST";
const ADDED_NEW_GROUP = "ADDED_NEW_GROUP";

//Post group action creators
const POST_GROUP_SUCCESS = "POST_GROUP_SUCCESS";

//Delete group
const DELETE_GROUP_REQUEST = "DELETE_GROUP_REQUEST";
const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
const DELETE_GROUP_FAILED = "DELETE_GROUP_FAILED";

//Add member to group
const ADD_MEMBER = "ADD_CHURCH_MEMBER";

export const addChurchMember = (group) => {
  console.log(group);
  return {
    type: ADD_MEMBER,
    payload: group,
  };
};

const deleteGroupRequest = () => {
  return {
    type: DELETE_GROUP_REQUEST,
  };
};

const deleteGroupSuccess = (payload) => {
  return {
    type: DELETE_GROUP_SUCCESS,
    payload,
  };
};

const deleteGroupFailed = () => {
  return {
    type: DELETE_GROUP_FAILED,
  };
};

export const deleteGroup = (data, token) => (dispatch) => {
  dispatch(deleteGroupRequest());

  const config = axios_config(token);
  axios
    .delete(groupsDetailedUrl(data.id), config)
    .then((res) => {
      console.log(res);
      dispatch(deleteGroupSuccess(data));
      message.success("You have successfully deleted church group");
    })
    .catch((err) => {
      dispatch(deleteGroupFailed());
      console.log(err.response);
      if (err.response) {
        if (err.response.status <= 500) {
          message.error(err.response.data.detail);
        } else {
          message.error("Server error");
        }
      } else if (err.request) {
        notification.error({
          message: "Network errror",
          description: "Check internet connection and try later",
        });
      }
    });
};

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

    case DELETE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((item) => item.id !== payload.id),
      };
    case DELETE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ADD_MEMBER:
      console.log(payload);
      return {
        ...state,
        data:payload,
      };

    default:
      return state;
  }
};

export default group_reducer;
