import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const Work = (props) => {
  let { work, onGetValue } = props;
  const [newWork, setNewWork] = useState(work);

  const changeWorkHandler = useCallback(
    (event) => {
      setNewWork((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "work", value: event.target.value });
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
        maxLength="100"
        spellCheck="false"
      />
      <span>{`${newWork.length} / 100`}</span>
    </div>
  );
};

export default Work;
