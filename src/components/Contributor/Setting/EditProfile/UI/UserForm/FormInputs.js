import { useCallback } from "react";
import Bio from "./Bio";
import Education from "./Education";
import Email from "./Email";
import FullName from "./FullName";
import Location from "./Location";
import Username from "./Username";
import Work from "./Work";
import styles from "./UserForm.module.css";
import ProfilePicture from "../ProfilePicture";
const FormInputs = (props) => {
  const {
    fullname,
    email,
    emailIsPrivate,
    username,
    bio,
    location,
    education,
    work,
    onUpdateContributorData,
    onSetFormValidity,
  } = props;
  //----------> send in the default contributor properties into the new data

  const compareData = useCallback(
    (inputData) => {
      const { type, value } = inputData;
      const oldValue = props[type];
      const newValue = value;
      //-----------> If the default input value from the database is the same as the new value you entered
      //             into the input, then we do not process the value
      if (oldValue.trim() === newValue.trim()) {
        return { type, value, valueChanged: false };
      }
      return { type, value, valueChanged: true };
    },
    [props]
  );
  const getValue = useCallback(
    (inputData) => {
      //----------> we compare the default input value with the new value provided in the input data
      const result = compareData(inputData); // {type,value}
      if (result && result.valueChanged) {
        //----------> if result change, process the value
        //----------> set the new details of the contributor
        return onUpdateContributorData(inputData, "add");
      }
      return onUpdateContributorData(inputData, "remove");
    },
    [onUpdateContributorData, compareData]
  );

  return (
    <div className={styles.form_controls}>
      <ProfilePicture />
      <FullName fullname={fullname} onGetValue={getValue} />
      <Email
        email={email}
        emailIsPrivate={emailIsPrivate}
        onGetValue={getValue}
        onSetFormValidity={onSetFormValidity}
      />
      <Username username={username} onGetValue={getValue} />
      <Bio bio={bio} onGetValue={getValue} />
      <Location location={location} onGetValue={getValue} />
      <Education education={education} onGetValue={getValue} />
      <Work work={work} onGetValue={getValue} />
    </div>
  );
};
export default FormInputs;
