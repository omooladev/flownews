import { useContext, useCallback, useState } from "react";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import Email from "./Email";
import FullName from "./FullName";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    userData: { fullname, email },
  } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState("");
  const getFullNameHandler = useCallback((fullname) => {
    setUserDetails((prevValue) => {
      return { ...prevValue, fullname };
    });
  }, []);
  const getEmailHandler = useCallback((email) => {
    setUserDetails((prevValue) => {
      return { ...prevValue, email };
    });
  }, []);

  const submitFormHandler = useCallback(
    (event) => {
      event.preventDefault();
      const fullname = userDetails.fullname;
      console.log(fullname);
    },
    [userDetails]
  );

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <div className={styles.form_controls}>
        <FullName fullname={fullname} onGetFullName={getFullNameHandler} />
        <Email email={email} onGetEmail={getEmailHandler} />
      </div>
      <div className={styles.form_actions}>
        {/* <button type="submit">Save Profile Information</button> */}
      </div>
    </form>
  );
};

export default UserForm;
