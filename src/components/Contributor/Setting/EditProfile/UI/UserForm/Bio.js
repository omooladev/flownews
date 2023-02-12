import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const Bio = (props) => {
  let { bio: biography, onGetValue } = props;
  const [bio, setBio] = useState("");

  const changeBioHandler = useCallback((event) => {
    setBio((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (biography) {
      setBio((prevValue) => biography);
    }
  }, [biography]);
  useEffect(() => {
    if (bio) {
      onGetValue({ type: "bio", value: bio });
    }
  }, [bio, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__bio">Bio</label>
      <textarea
        id="userFormControl__bio"
        placeholder="Please enter your bio"
        value={bio}
        onChange={changeBioHandler}
        maxLength="200"
      />
      <span>{`${bio.length} / 200`}</span>
    </div>
  );
};

export default Bio;
