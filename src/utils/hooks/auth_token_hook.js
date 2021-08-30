import { message } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { getToken } from "../local_data/store_user_info";

const useAuthToken = () => {
  const token = getToken();
  const history = useHistory();
  const location = useLocation();
  if (!token) {
    message.info("Session expired,");
    history.push("/login", { next: location });
    //Todo: Log use out
  }
  return token;
};

export default useAuthToken;
