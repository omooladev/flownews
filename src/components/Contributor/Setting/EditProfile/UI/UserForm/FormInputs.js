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
    updatedContributorData,
    onUpdateContributorData,
  } = props;
  //----------> send in the default contributor properties into the new data

  //   const compareData = useCallback(({ firstValue, secondValue }) => {
  //     if (firstValue === secondValue) {
  //       return true;
  //     }
  //     return false;
  //   }, []);

  //   const matchProfileFields = useCallback(async () => {
  //     let updateProperties;
  //     const isFullNameMatch = compareData({
  //       firstValue: fullname,
  //       secondValue: newContributorData.fullname,
  //     });
  //     if (!isFullNameMatch) {
  //       updateProperties = { fullname: newContributorData.fullname };
  //     }
  //     const isEmailMatch = compareData({
  //       firstValue: email,
  //       secondValue: newContributorData.email,
  //     });
  //     if (!isEmailMatch) {
  //       updateProperties = { ...updateProperties, email: newContributorData.email };
  //     }
  //     const isUsernameMatch = compareData({
  //       firstValue: username,
  //       secondValue: newContributorData.username,
  //     });
  //     if (!isUsernameMatch) {
  //       updateProperties = { ...updateProperties, username: newContributorData.username };
  //     }
  //     const isBioMatch = compareData({
  //       firstValue: bio,
  //       secondValue: newContributorData.bio,
  //     });
  //     if (!isBioMatch) {
  //       updateProperties = { ...updateProperties, bio: newContributorData.bio };
  //     }
  //     const isLocationMatch = compareData({
  //       firstValue: location,
  //       secondValue: newContributorData.location,
  //     });
  //     if (!isLocationMatch) {
  //       updateProperties = { ...updateProperties, location: newContributorData.location };
  //     }
  //     const isEducationMatch = compareData({
  //       firstValue: education,
  //       secondValue: newContributorData.education,
  //     });
  //     if (!isEducationMatch) {
  //       updateProperties = { ...updateProperties, education: newContributorData.education };
  //     }
  //     const isWorkMatch = compareData({
  //       firstValue: work,
  //       secondValue: newContributorData.work,
  //     });
  //     if (!isWorkMatch) {
  //       updateProperties = { ...updateProperties, work: newContributorData.work };
  //     }

  //     return updateProperties;
  //   }, [fullname, email, username, bio, location, education, work, newContributorData, compareData]);
  const getValue = useCallback(
    (inputData) => {
      //----------> set the new details of the contributor
      return onUpdateContributorData(inputData);
    },
    [onUpdateContributorData]
  );

  return (
    <div className={styles.form_controls}>
      <ProfilePicture />
      <FullName fullname={fullname} onGetValue={getValue} />
      <Email email={email} emailIsPrivate={emailIsPrivate} onGetValue={getValue} />
      <Username username={username} onGetValue={getValue} />
      <Bio bio={bio} onGetValue={getValue} />
      <Location location={location} onGetValue={getValue} />
      <Education education={education} onGetValue={getValue} />
      <Work work={work} onGetValue={getValue} />
    </div>
  );
};
export default FormInputs;
