import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
import { configuration } from "../../../../../../config";
const Education = (props) => {
  let { education, onGetValue } = props;
  const [newEducation, setNewEducation] = useState(education);

  const changeEducationHandler = useCallback(
    (event) => {
      if (event.target.value.length <= configuration.maxLengthOfEducation) {
        setNewEducation((prevValue) => {
          return event.target.value;
        });
        onGetValue({ type: "education", value: event.target.value.trim() });
      }
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__education">Education</label>
      <input
        type="text"
        id="userFormControl__education"
        placeholder="Please enter your education"
        value={newEducation}
        onChange={changeEducationHandler}
        maxLength={configuration.maxLengthOfEducation}
        spellCheck="false"
        autoComplete="off"
      />
      <span>{`${newEducation.trim().length} / ${configuration.maxLengthOfEducation}`}</span>
    </div>
  );
};

export default Education;
