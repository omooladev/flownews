import { useCallback, useState } from "react";
import axios from "axios";
const useHttp = () => {
  //----------> created a http controller for controlling and aborting http requests
  const [httpController, setHttpController] = useState(new AbortController());

  const sendRequest = useCallback(async (uri, config) => {
    //----------> created a new instance of the controller for aborting http requests
    const newHttpController = new AbortController();

    //----------> set the http controller
    setHttpController((prevController) => {
      return newHttpController;
    });

    //----------> link the signal to the http abort controller
    const signal = newHttpController.signal;

    //----------> custom https configuration settings
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

      //----------> POST REQUEST
      if (method === "POST") {
        const { data, status } = await axios.post(uri, contributorData, {
          signal, //----------> the signal that links to the abort controller
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

      if (err.response) {
        response = response.data.message;
      }
      return { error: response };
    }
  }, []);

  const cancelRequest = useCallback(() => {
    //----------> if the http abort controller exist then abort the request
    if (httpController) {
      httpController.abort();
    }

    //----------> I aborted the request whenever the user
    //            tries to login or signup but then clicks
    //            outside of the auth form i.e the AuthPopUP
  }, [httpController]);

  return { sendRequest, cancelRequest };
};

export default useHttp;
