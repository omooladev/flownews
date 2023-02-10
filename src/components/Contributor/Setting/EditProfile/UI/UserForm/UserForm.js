import { useContext, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import Card from "../../../../../../UI/Card"
import Email from "./Email";
import FullName from "./FullName";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const { userData, onUpdateContributorProfile } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const getFullNameHandler = useCallback((fullname) => {
    setUserDetails((prevValue) => {
      return { ...prevValue, fullname };
    });
  }, []);
  const getEmailHandler = useCallback((email) => {
    setUserDetails((prevValue) => {
      return { ...prevValue, email };
    });
  }, []);

  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const userDetailsFullName = userDetails.fullname;
      const userDetailsEmail = userDetails.email;

      //?user data
      const userDataFullName = userData.fullname;
      const userDataEmail = userData.email;

      let updateProperties;
      // if (userDetailsFullName !== userDataFullName) {
      //   updateProperties = { ...updateProperties, fullname: userDetailsFullName };
      // }
      // if (userDetailsEmail !== userDataEmail) {
      //   updateProperties = { ...updateProperties, email: userDetailsEmail };
      // }
      // if (!updateProperties) {
      //   return;
      // }
      updateProperties = { fullname: userDetailsFullName, email: userDetailsEmail };
      setIsLoading(true);
      let error = await onUpdateContributorProfile(updateProperties);
      setIsLoading(false);
      if (error) {
        setError(error);
      }
      // console.log(userDataFullName, userDetailsFullName, userDataEmail, userDetailsEmail);
    },
    [userDetails, userData, onUpdateContributorProfile]
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
        <FullName fullname={userData.fullname} onGetFullName={getFullNameHandler} />
        <Email email={userData.email} onGetEmail={getEmailHandler} />
      </div>
      <div className={styles.form_actions}>
        <p>
          All of the fields on this page are optional and can be deleted at any time, and by filling
          them out, you're giving us consent to share this data wherever your user profile appears.
          Please see our <Link to="/site/privacy">privacy statement</Link> to learn more about how
          we use this information.
        </p>
        <button type="submit" className={styles.update_profile} disabled={isLoading ? true : false}>
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UserForm;
