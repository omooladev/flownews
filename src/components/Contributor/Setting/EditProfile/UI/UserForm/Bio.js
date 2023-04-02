import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const Bio = (props) => {
  let { bio, onGetValue } = props;
  const [newBio, setNewBio] = useState(bio);

  const changeBioHandler = useCallback(
    (event) => {
      setNewBio((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "bio", value: event.target.value.trim() });
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__bio">Bio</label>
      <textarea
        id="userFormControl__bio"
        placeholder="Please enter your bio"
        value={newBio}
        onChange={changeBioHandler}
        maxLength="200"
        spellCheck="false"
      />
      <span>{`${newBio.trim().length} / 200`}</span>
    </div>
  );
};

export default Bio;
