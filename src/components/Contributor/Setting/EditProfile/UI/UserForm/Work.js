import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
import { configuration } from "../../../../../../config";
const Work = (props) => {
  let { work, onGetValue } = props;
  const [newWork, setNewWork] = useState(work);

  const changeWorkHandler = useCallback(
    (event) => {
      if (event.target.value.length <= configuration.maxLengthOfWork) {
        setNewWork((prevValue) => {
          return event.target.value;
        });
        onGetValue({ type: "work", value: event.target.value.trim() });
      }
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__work">Work</label>
      <input
        type="text"
        id="userFormControl__work"
        placeholder="Please enter your work"
        value={newWork}
        onChange={changeWorkHandler}
        //maxLength={configuration.maxLengthOfWork}
        spellCheck="false"
        autoComplete="off"
      />
      <span>{`${newWork.trim().length} / ${configuration.maxLengthOfWork}`}</span>
    </div>
  );
};

export default Work;
