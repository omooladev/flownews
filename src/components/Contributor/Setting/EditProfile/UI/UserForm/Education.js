import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const Location = (props) => {
  let { location: defaultLocation, onGetValue } = props;
  const [location, setLocation] = useState("");

  const changeLocationHandler = useCallback((event) => {
    setLocation((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (defaultLocation) {
      setLocation((prevValue) => defaultLocation);
    }
  }, [defaultLocation]);
  useEffect(() => {
    if (location) {
      onGetValue({ type: "location", value: location });
    }
  }, [location, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__location">Location</label>
      <input
        type="text"
        id="userFormControl__location"
        placeholder="Please enter your location"
        value={location}
        onChange={changeLocationHandler}
        maxLength="100"
      />
      <span>{`${location.length} / 100`}</span>
    </div>
  );
};

export default Location;
