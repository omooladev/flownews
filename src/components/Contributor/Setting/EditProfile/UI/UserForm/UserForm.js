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
  const { userData, onUpdateContributorProfile } = useContext(AuthContext);
  const [contributorDetails, setContributorDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getValueHandler = useCallback(({ type, value }) => {
    setContributorDetails((prevValue) => {
      return { ...prevValue, [type]: value };
    });
  }, []);

  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const contributorDetailsFullName = contributorDetails.fullname;
      const contributorDetailsEmail = contributorDetails.email;
      const contributorDetailsUsername = contributorDetails.username;
      const contributorDetailsBio = contributorDetails.bio;
      const contributorDetailsLocation = contributorDetails.location;
      const contributorDetailsEducation = contributorDetails.education;
      const contributorDetailsWork = contributorDetails.work;

      //?user data
      // const userDataFullName = userData.fullname;
      // const userDataEmail = userData.email;
      // const userDataUsername = userData.username;

      let updateProperties;
      // if (contributorDetailsFullName !== userDataFullName) {
      //   updateProperties = { ...updateProperties, fullname: contributorDetailsFullName };
      // }
      // if (contributorDetailsEmail !== userDataEmail) {
      //   updateProperties = { ...updateProperties, email: contributorDetailsEmail };
      // }
      // if (!updateProperties) {
      //   return;
      // }
      updateProperties = {
        fullname: contributorDetailsFullName,
        email: contributorDetailsEmail,
        username: contributorDetailsUsername,
        bio: contributorDetailsBio,
        location: contributorDetailsLocation,
        education: contributorDetailsEducation,
        work: contributorDetailsWork,
      };
      setIsLoading(true);
      let error = await onUpdateContributorProfile(updateProperties);
      setIsLoading(false);
      if (error) {
        return setError(error);
      }
      return setError("");
      // console.log(userDataFullName, contributorDetailsFullName, userDataEmail, contributorDetailsEmail);
    },
    [contributorDetails, onUpdateContributorProfile]
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
        <FullName fullname={userData.fullname} onGetValue={getValueHandler} />
        <Email email={userData.email} onGetValue={getValueHandler} />
        <Username username={userData.username} onGetValue={getValueHandler} />
        <Bio bio={userData.bio} onGetValue={getValueHandler} />
        <Location location={userData.location} onGetValue={getValueHandler} />
        <Education education={userData.education} onGetValue={getValueHandler} />
        <Work work={userData.work} onGetValue={getValueHandler} />
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
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UserForm;
