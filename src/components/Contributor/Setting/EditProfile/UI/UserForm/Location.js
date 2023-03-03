import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const Location = (props) => {
  let { location, onGetValue } = props;
  const [newLocation, setNewLocation] = useState(location);

  const changeLocationHandler = useCallback(
    (event) => {
      setNewLocation((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "location", value: event.target.value });
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__location">Location</label>
      <input
        type="text"
        id="userFormControl__location"
        placeholder="Please enter your location"
        value={newLocation}
        onChange={changeLocationHandler}
        maxLength="100"
        spellCheck="false"
      />
      <span>{`${newLocation.length} / 100`}</span>
    </div>
  );
};

export default Location;
