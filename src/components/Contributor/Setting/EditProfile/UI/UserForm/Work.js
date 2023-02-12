import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const Work = (props) => {
  let { work: defaultWork, onGetValue } = props;
  const [work, setWork] = useState("");

  const changeWorkHandler = useCallback((event) => {
    setWork((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (defaultWork) {
      setWork((prevValue) => defaultWork);
    }
  }, [defaultWork]);
  useEffect(() => {
    if (work) {
      onGetValue({ type: "work", value: work });
    }
  }, [work, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__work">Work</label>
      <input
        type="text"
        id="userFormControl__work"
        placeholder="Please enter your work"
        value={work}
        onChange={changeWorkHandler}
        maxLength="100"
        spellCheck="false"
      />
      <span>{`${work.length} / 100`}</span>
    </div>
  );
};

export default Work;
