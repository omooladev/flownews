import { useCallback, useState } from "react";
import { configuration } from "../../../../../../config";
import styles from "./UserForm.module.css";
const FullName = (props) => {
  //----------> get the default fullname and the onGetValue function
  let { fullname, onGetValue } = props;
  const [newFullName, setNewFullName] = useState(fullname);

  const changeFullNameHandler = useCallback(
    (event) => {
      //---------->if the entered fullname is less than 30 characters
      if (event.target.value.length <= configuration.maxLengthOfFullName) {
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
        autoComplete="off"
        maxLength={configuration.maxLengthOfFullName} //TODO We may need to remove the maximum length of the fullname
      />
      <p>
        Your fullname may appear around flowNews where you contribute or are mentioned. You can remove it any
        time
      </p>
    </div>
  );
};

export default FullName;
