import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const FullName = (props) => {
  let { fullname:name, onGetFullName } = props;
  const [fullname, setFullname] = useState("");

  const changeFullNameHandler = useCallback((event) => {
    setFullname((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (name) {
      setFullname((prevValue) => name);
    }
  }, [name]);
  useEffect(() => {
    if (fullname) {
      onGetFullName(fullname);
    }
  }, [fullname, onGetFullName]);
  return (
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
        Your name may appear around flownews where you contribute or are mentioned. You can remove
        it any time
      </p>
    </div>
  );
};

export default FullName;