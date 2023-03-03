import { useContext, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import Card from "../../../../../../UI/Card";
import Bio from "./Bio";
import Education from "./Education";
import Email from "./Email";
import FullName from "./FullName";
import Location from "./Location";
import Username from "./Username";
import Work from "./Work";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    userData,
    userData: { fullname, email, username, bio, location, education, work },
    onUpdateContributorProfile,
  } = useContext(AuthContext);
  const [newContributorData, setNewContributorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getValueHandler = useCallback(({ type, value }) => {
    setNewContributorData((prevValue) => {
      return { ...prevValue, [type]: value };
    });
  }, []);

  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      const newContributorDataFullName = newContributorData.fullname;
      const newContributorDataEmail = newContributorData.email;
      const newContributorDataUsername = newContributorData.username;
      const newContributorDataBio = newContributorData.bio;
      const newContributorDataLocation = newContributorData.location;
      const newContributorDataEducation = newContributorData.education;
      const newContributorDataWork = newContributorData.work;

      //?user data
      // const userDataFullName = userData.fullname;
      // const userDataEmail = userData.email;
      // const userDataUsername = userData.username;

      let updateProperties;
      // if (newContributorDataFullName !== userDataFullName) {
      //   updateProperties = { ...updateProperties, fullname: newContributorDataFullName };
      // }
      // if (newContributorDataEmail !== userDataEmail) {
      //   updateProperties = { ...updateProperties, email: newContributorDataEmail };
      // }
      // if (!updateProperties) {
      //   return;
      // }
      updateProperties = {
        fullname: newContributorDataFullName,
        email: newContributorDataEmail,
        username: newContributorDataUsername,
        bio: newContributorDataBio,
        location: newContributorDataLocation,
        education: newContributorDataEducation,
        work: newContributorDataWork,
      };
      setIsLoading(true);
      let response = await onUpdateContributorProfile(updateProperties);
      const data = response.data || "";
      const error = response.error || "";
      if (data) {
        console.log(data);
      }
      if (error) {
        setError((prevError) => {
          return error;
        });
      }
      setIsLoading(false);

      // console.log(userDataFullName, newContributorDataFullName, userDataEmail, newContributorDataEmail);
    },
    [newContributorData, onUpdateContributorProfile]
  );

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      {error && (
        <Card className={styles.error}>
          <h4>The following error has prohibited your profile from been saved</h4>
          <ul>
            <li>{error}</li>
          </ul>
        </Card>
      )}
      <div className={styles.form_controls}>
        <FullName fullname={fullname} onGetValue={getValueHandler} />
        <Email email={email} onGetValue={getValueHandler} />
        <Username username={username} onGetValue={getValueHandler} />
        <Bio bio={bio} onGetValue={getValueHandler} />
        <Location location={location} onGetValue={getValueHandler} />
        <Education education={education} onGetValue={getValueHandler} />
        <Work work={work} onGetValue={getValueHandler} />
      </div>
      <div className={styles.form_actions}>
        <p>
          All of the fields on this page except the email address and username are optional and can
          be deleted at any time, and by filling them out, you're giving us consent to share this
          data wherever your user profile appears. Please see our{" "}
          <Link to="/site/privacy">privacy statement</Link> to learn more about how we use this
          information.
        </p>
        <button type="submit" className={styles.update_profile} disabled={isLoading ? true : false}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
