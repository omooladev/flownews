//<---------- IMPORT MODULES AND COMPONENTS ---------->
import { useContext, useCallback, useState } from "react";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import Error from "./Error";
import FormInputs from "./FormInputs";
import FormActions from "./FormActions";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    contributorData: { fullname, email, emailIsPrivate, username, bio, location, education, work },
    onCheckFieldExistence,
    // changeAppMode,
    // onChangeProfileUpdated,
    // onSaveContributorData,
    // onUpdateContributorProfile,
  } = useContext(AuthContext);
  const [updatedContributorData, setUpdatedContributorData] = useState({});
  const [formValidity, setFormValidity] = useState({
    formIsValid: true,
    emailIsValid: true,
    usernameIsValid: true,
  }); //This fields are all valid by default because it is already provided in the database and they are the only required field
  const [error, setError] = useState([]);

  //<-----------FUNCTION FOR SAVING FORM AND REQUIRED FIELD VALIDITY ---------->
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
        const formIsValid = updatedState.emailIsValid && updatedState.usernameIsValid;
        updatedState = { ...updatedState, formIsValid };
        return updatedState;
      });
    },
    [formValidity]
  );
  //<-----------FUNCTION FOR UPDATING THE CONTRIBUTOR DATA---------->
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

  //<---------- FUNCTION FOR UPDATING THE CONTRIBUTOR DATA ---------->
  const submitContributorProfileHandler = useCallback(
    async (event) => {
      event.preventDefault();
      //----------> reset the error
      setError((prevError) => []);

      if (Object.keys(updatedContributorData).length === 0) {
        //----------> if the updated contributor data is empty
        return;
      }

      setIsLoading(true);
      let response = await onUpdateContributorProfile(updateProperties);
      const data = response.data;
      const status = response.status;
      const error = response.error;
      if (status === 204) {
        return setIsLoading(false);
      }
      if (data) {
        console.log(data);
        // onSaveContributorData(data);
        // changeAppMode({ token: data.token });
        // onChangeProfileUpdated(true);
      }
      if (error) {
        setError((prevError) => {
          return error;
        });
      }
      setIsLoading(false);
    },
    [updatedContributorData]
  );

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
        onCheckFieldExistence={onCheckFieldExistence}
      />

      <FormActions formIsValid={formValidity.formIsValid} />
    </form>
  );
};

export default UserForm;
