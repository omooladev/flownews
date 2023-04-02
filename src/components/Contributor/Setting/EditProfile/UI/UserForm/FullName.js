import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const FullName = (props) => {
  let { fullname, onGetValue } = props;
  const [newFullName, setNewFullName] = useState(fullname);

  const changeFullNameHandler = useCallback(
    (event) => {
      setNewFullName((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "fullname", value: event.target.value.trim() });
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
      />
      <p>
        Your fullname may appear around flowNews where you contribute or are mentioned. You can
        remove it any time
      </p>
    </div>
  );
};

export default FullName;
