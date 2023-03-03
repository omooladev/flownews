import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const FullName = (props) => {
  let { fullname, onGetValue } = props;
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
      onGetValue({ type: "fullname", value: fullname });
    }
  }, [fullname, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__name">Name</label>
      <input
        type="text"
        id="userFormControl__name"
        placeholder="Please enter your fullname"
        value={fullname}
        onChange={changeFullNameHandler}
        spellCheck="false"
      />
      <p>
        Your name may appear around flownews where you contribute or are mentioned. You can remove
        it any time
      </p>
    </div>
  );
};

export default FullName;
