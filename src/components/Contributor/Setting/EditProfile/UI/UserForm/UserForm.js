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
    userData: { fullname, email, emailIsPrivate, username, bio, location, education, work },
    onUpdateContributorProfile,
  } = useContext(AuthContext);
  const [newContributorData, setNewContributorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getValue = useCallback(({ type, value }) => {
    setNewContributorData((prevValue) => {
      return { ...prevValue, [type]: value };
    });
  }, []);
  const compareData = useCallback(({ firstValue, secondValue }) => {
    if (firstValue.trim() === secondValue.trim()) {
      return true;
    }
    return false;
  }, []);

  const matchProfileFields = useCallback(async () => {
    let updateProperties;
    const isFullNameMatch = compareData({
      firstValue: fullname,
      secondValue: newContributorData.fullname || "",
    });
    if (!isFullNameMatch) {
      updateProperties = { fullname: newContributorData.fullname };
    }
    const isEmailMatch = compareData({
      firstValue: email,
      secondValue: newContributorData.email || email,
    });
    if (!isEmailMatch) {
      updateProperties = { ...updateProperties, email: newContributorData.email };
    }
     const isBioMatch = compareData({
      firstValue: bio,
      secondValue: newContributorData.bio || "",
    });
    if (!isBioMatch) {
      updateProperties = {...updateProperties, bio: newContributorData.bio };
    }
    return updateProperties;
  }, [fullname, email,bio, newContributorData, compareData]);
  const submitContributorProfileHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      // const { fullname, email, username, bio, location, education, work }=newContributorData

      const updateProperties = await matchProfileFields();

      return console.log(updateProperties);

      // let updateProperties;

      // updateProperties = {};
      // setIsLoading(true);
      // let response = await onUpdateContributorProfile(updateProperties);
      // const data = response.data || "";
      // const error = response.error || "";
      // if (data) {
      //   console.log(data);
      // }
      // if (error) {
      //   setError((prevError) => {
      //     return error;
      //   });
      // }
      // setIsLoading(false);
    },
    [matchProfileFields]
  );

  return (
    <form className={styles.form} onSubmit={submitContributorProfileHandler}>
      {error && (
        <Card className={styles.error}>
          <h4>The following error has prohibited your profile from been saved</h4>
          <ul>
            <li>{error}</li>
          </ul>
        </Card>
      )}
      <div className={styles.form_controls}>
        <FullName fullname={fullname} onGetValue={getValue} />
        <Email email={email} emailIsPrivate={emailIsPrivate} onGetValue={getValue} />
        <Username username={username} onGetValue={getValue} />
        <Bio bio={bio} onGetValue={getValue} />
        <Location location={location} onGetValue={getValue} />
        <Education education={education} onGetValue={getValue} />
        <Work work={work} onGetValue={getValue} />
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
