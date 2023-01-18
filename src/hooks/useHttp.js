import { useCallback } from "react";
import axios from "axios";
const useHttp = () => {
  const sendRequest = useCallback(async (uri, config) => {
    const { method, userData } = config;

    try {
      if (method === "POST") {
        const { data } = await axios.post(uri, userData);
        console.log(data);
      }
    } catch (error) {
    //   const data = error.data;
    //   console.log(data);
      console.log(error);
      return { error };
    }
  }, []);

  return { sendRequest };
};

export default useHttp;
