import { useContext, useEffect } from "react";
import { AuthContext } from "../store/Auth/auth-context";

const useCloseProfileUpdated = () => {
  const { profileUpdated, onChangeProfileUpdated } = useContext(AuthContext);
  useEffect(() => {
    if (profileUpdated) {
      onChangeProfileUpdated(false);
    }
  }, [profileUpdated, onChangeProfileUpdated]);
};

export default useCloseProfileUpdated;
