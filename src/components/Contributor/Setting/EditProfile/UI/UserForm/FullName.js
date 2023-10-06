import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const FullName = (props) => {
  //----------> get the default fullname and the onGetValue function
  let { fullname, onGetValue } = props;
  const [newFullName, setNewFullName] = useState(fullname);

  const changeFullNameHandler = useCallback(
    (event) => {
      //----------> set a limit of 30 characters for the fullname
      if (event.target.value.length <= 30) {
        setNewFullName((prevValue) => {
          return event.target.value;
        });
        onGetValue({ type: "fullname", value: event.target.value.trim() });
      }
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__fullname">Name</label>
      <input
        type="text"
        id="userFormControl__fullname"
        placeholder="Please enter your fullname"
        value={newFullName}
        onChange={changeFullNameHandler}
        spellCheck="false"
        maxLength="30"
      />
      <p>
        Your fullname may appear around flowNews where you contribute or are mentioned. You can
        remove it any time
      </p>
    </div>
  );
};

export default FullName;
