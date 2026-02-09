import { Link } from "react-router-dom";
import styles from "./UserForm.module.css";
const FormActions = ({ formIsValid, isLoading }) => {
  return (
    <div className={styles.form_actions}>
      <p>
        All of the fields on this page except the email address and username are optional and can be deleted
        at any time, and by filling them out, you're giving us consent to share this data wherever your user
        profile appears. Please see our <Link to="/site/privacy">privacy statement</Link> to learn more about
        how we use this information.
      </p>
      <button
        type="submit"
        className={styles.update_profile}
        disabled={isLoading || !formIsValid ? true : false}
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default FormActions;
