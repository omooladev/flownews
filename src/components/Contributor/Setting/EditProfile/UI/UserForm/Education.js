import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const Education = (props) => {
  let { education: defaultEducation, onGetValue } = props;
  const [education, setEducation] = useState("");

  const changeEducationHandler = useCallback((event) => {
    setEducation((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (defaultEducation) {
      setEducation((prevValue) => defaultEducation);
    }
  }, [defaultEducation]);
  useEffect(() => {
    if (education) {
      onGetValue({ type: "education", value: education });
    }
  }, [education, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__education">Education</label>
      <input
        type="text"
        id="userFormControl__education"
        placeholder="Please enter your education"
        value={education}
        onChange={changeEducationHandler}
        maxLength="100"
        spellCheck="false"
      />
      <span>{`${education.length} / 100`}</span>
    </div>
  );
};

export default Education;
