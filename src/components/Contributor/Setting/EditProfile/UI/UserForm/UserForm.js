import { useContext, useCallback, useState } from "react";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import Error from "./Error";
import FormInputs from "./FormInputs";
import FormActions from "./FormActions";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    contributorData: { fullname, email, emailIsPrivate, username, bio, location, education, work },
    // changeAppMode,
    // onChangeProfileUpdated,
    // onSaveContributorData,
    // onUpdateContributorProfile,
  } = useContext(AuthContext);
  const [updatedContributorData, setUpdatedContributorData] = useState(null);
  const [formValidity, setFormValidity] = useState({ formIsValid: true, emailIsValid: true });
  const [error, setError] = useState([]);
  const setFormValidityHandler = useCallback(
    ({ type, isValid }) => {
      const validityField = `${type}IsValid`;
      if (formValidity[validityField] === isValid) {
        //------------------> if the valid state is the same thing, do nothing
        return;
      }
      setFormValidity((prevState) => {
        //----------> update the field validity
        let updatedState = { ...prevState, [validityField]: isValid };
        //----------> check if all field is valid, then update the form valid field
        const formIsValid = updatedState.emailIsValid;
        updatedState = { ...updatedState, formIsValid };
        return updatedState;
      });
    },
    [formValidity]
  );

  const updateContributorData = useCallback(
    ({ type, value }, action) => {
      if (action === "add") {
        return setUpdatedContributorData((prevValue) => {
          return { ...prevValue, [type]: value };
        });
      } else {
        const data = updatedContributorData;
        delete data[type];
        return setUpdatedContributorData((prevValue) => {
          return data;
        });
      }
    },
    [updatedContributorData]
  );

  const submitContributorProfileHandler = useCallback(
    (event) => {
      event.preventDefault();
      //----------> reset the error
      setError((prevError) => []);
      console.log(updatedContributorData);
    },
    [updatedContributorData]
  );

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
      <FormInputs
        fullname={fullname}
        email={email}
        emailIsPrivate={emailIsPrivate}
        username={username}
        bio={bio}
        location={location}
        education={education}
        work={work}
        onUpdateContributorData={updateContributorData}
        onSetFormValidity={setFormValidityHandler}
      />

      <FormActions formIsValid={formValidity.formIsValid} />
    </form>
  );
};

export default UserForm;
