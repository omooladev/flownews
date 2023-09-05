import { useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  let source = axios.CancelToken.source();
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
        console.log(source)
        const { data, status } = await axios.post(uri, contributorData, {
          cancelToken: source.token,
        });
        
        return { data, status };
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
      if (axios.isCancel(err)) {
        console.log("Request was canceled:", err.message);
      }

      if (err.response) {
        response = response.data.message;
      }
      return { error: response };
    }
  }, []);

  return { sendRequest, source };
};

export default useHttp;
