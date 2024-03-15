import { useContext, useCallback } from "react";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import ProfilePicture from "../ProfilePicture";
import Error from "./Error";
import FormInputs from "./FormInputs";
import styles from "./UserForm.module.css";
import FormActions from "./FormActions";
const UserForm = () => {
  const {
    contributorData: { fullname, email, emailIsPrivate, username, bio, location, education, work },
    // changeAppMode,
    // onChangeProfileUpdated,
    // onSaveContributorData,
    // onUpdateContributorProfile,
  } = useContext(AuthContext);

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
      <Error error={error} />
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

      <FormActions />
    </form>
  );
};

export default UserForm;
