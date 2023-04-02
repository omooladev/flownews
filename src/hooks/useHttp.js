import { useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  const sendRequest = useCallback(async (uri, config) => {
    const { method, contributorData, token } = config;
    try {
      if (method === "PATCH") {
        const { data, status } = await axios.patch(uri, contributorData && contributorData, {
          "Content-Type": "application/json",
          headers: {
            authorization: token && `Bearer ${token}`,
          },
        });

        return { data, status };
      }
      if (method === "POST") {
        const { data,status } = await axios.post(uri, contributorData);
        return { data,status };
      }
      if (method === "GET") {
        const { data } = await axios.get(uri, {
          "Content-Type": "application/json",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return { data };
      }
    } catch (err) {
      let response = err.response || err.message;
      if (err.response) {
        response = response.data.message;
      }
      return { error: response };
    }
  }, []);

  return { sendRequest };
};

export default useHttp;
