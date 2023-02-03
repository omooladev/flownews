import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./UserForm.module.css";
const UserForm = () => {
  const {
    userData: { lastname, middlename, firstname },
  } = useContext(AuthContext);
  let fullname;

  if (!lastname && !firstname && !middlename) {
    fullname = "";
  }
  if (lastname) {
    fullname = lastname;
  }
  if (middlename) {
    fullname += " " + middlename;
  }
  if (firstname) {
    fullname += " " + firstname;
  }
  console.log(fullname);

  return (
    <form className={styles.form}>
      <div className={styles.form_controls}>
        <div className={styles.form_control}>
          <label htmlFor="userFormControl__name">Name</label>
          <input
            type="text"
            id="userFormControl__name"
            placeholder="Please enter your fullname"
            value={fullname}
            onChange={() => {}}
          />
          <p>
            Your name may appear around flownews where you contribute or are mentioned. You can
            remove it any time
          </p>
        </div>
      </div>
      <div className={styles.form_actions}></div>
    </form>
  );
};

export default UserForm;
