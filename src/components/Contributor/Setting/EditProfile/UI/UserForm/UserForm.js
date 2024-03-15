import { useContext, useCallback} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import styles from "./UserForm.module.css";
import ProfilePicture from "../ProfilePicture";
import Error from "./Error";
import FormInputs from "./FormInputs";
const UserForm = () => {
  const {
    contributorData: { fullname, email, emailIsPrivate, username, bio, location, education, work },
    // changeAppMode,
    // onChangeProfileUpdated,
    // onSaveContributorData,
    // onUpdateContributorProfile,
  } = useContext(AuthContext);

  //const [isLoading, setIsLoading] = useState(false);
  let isLoading = false;
  let error = "An error has occured";
  // const [error, setError] = useState("333333333333");

  const submitContributorProfileHandler = useCallback(() => {}, []);

  // const submitContributorProfileHandler = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //     onChangeProfileUpdated(false);
  //     setError("");

  //     const updateProperties = await matchProfileFields();

  //     if (!updateProperties) {
  //       return;
  //     }
  //     setIsLoading(true);
  //     let response = await onUpdateContributorProfile(updateProperties);
  //     const data = response.data || "";
  //     const status = response.status || "";
  //     const error = response.error || "";
  //     if (status === 204) {
  //       return setIsLoading(false);
  //     }
  //     if (data) {
  //       onSaveContributorData(data);
  //       changeAppMode({ token: data.token });
  //       onChangeProfileUpdated(true);
  //     }
  //     if (error) {
  //       setError((prevError) => {
  //         return error;
  //       });
  //     }
  //     setIsLoading(false);
  //   },
  //   [
  //     matchProfileFields,
  //     changeAppMode,
  //     onSaveContributorData,
  //     onUpdateContributorProfile,
  //     onChangeProfileUpdated,
  //   ]
  // );

  return (
    <form className={styles.form} onSubmit={submitContributorProfileHandler}>
      {error && <Error error={error} />}
      <div className={styles.form_controls}>
        <ProfilePicture />
        <FormInputs
          fullname={fullname}
          email={email}
          emailIsPrivate={emailIsPrivate}
          username={username}
          bio={bio}
          location={location}
          education={education}
          work={work}
        />
      </div>
      <div className={styles.form_actions}>
        <p>
          All of the fields on this page except the email address and username are optional and can be deleted
          at any time, and by filling them out, you're giving us consent to share this data wherever your user
          profile appears. Please see our <Link to="/site/privacy">privacy statement</Link> to learn more
          about how we use this information.
        </p>
        <button type="submit" className={styles.update_profile} disabled={isLoading ? true : false}>
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
