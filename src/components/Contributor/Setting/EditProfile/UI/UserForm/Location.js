import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
import { configuration } from "../../../../../../config";
const Location = (props) => {
  let { location, onGetValue } = props;
  const [newLocation, setNewLocation] = useState(location);

  const changeLocationHandler = useCallback(
    (event) => {
      if (event.target.value.length <= configuration.maxLengthOfLocation) {
        setNewLocation((prevValue) => {
          return event.target.value;
        });
        onGetValue({ type: "location", value: event.target.value.trim() });
      }
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
        maxLength={configuration.maxLengthOfLocation}
        spellCheck="false"
        autoComplete="off"
      />
      <span>{`${newLocation.trim().length} / ${configuration.maxLengthOfLocation}`}</span>
    </div>
  );
};

export default Location;
