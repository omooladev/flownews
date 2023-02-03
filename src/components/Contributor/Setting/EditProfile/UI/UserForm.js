import { useContext, useCallback, useState, useEffect } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    userData: { fullname: name },
  } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");

  const changeFullNameHandler = useCallback((event) => {
    setFullname((prevValue) => {
      return event.target.value;
    });
  }, []);

  const submitFormHandler = useCallback(
    (event) => {
      event.preventDefault();
      console.log(fullname);
    },
    [fullname]
  );
  useEffect(() => {
    if (name) {
      setFullname((prevValue) => name);
    }
  }, [name]);
  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <div className={styles.form_controls}>
        <div className={styles.form_control}>
          <label htmlFor="userFormControl__name">Name</label>
          <input
            type="text"
            id="userFormControl__name"
            placeholder="Please enter your fullname"
            value={fullname}
            onChange={changeFullNameHandler}
          />
          <p>
            Your name may appear around flownews where you contribute or are mentioned. You can
            remove it any time
          </p>
        </div>
      </div>
      <div className={styles.form_actions}>
        {/* <button type="submit">Save Profile Information</button> */}
      </div>
    </form>
  );
};

export default UserForm;
