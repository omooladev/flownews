import { useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  const sendRequest = useCallback(async (uri, config) => {
    const { method, userData, token } = config;

    try {
      if (method === "POST") {
        const { data } = await axios.post(uri, userData);
        return { data };
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
      const response = err.response.data.message || "";
      if (response) return { error: response };
      return { error: err.message };
    }
  }, []);

  return { sendRequest };
};

export default useHttp;
