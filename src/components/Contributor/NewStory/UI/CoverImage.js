//<---------- import modules ---------->
import { useCallback, useState } from "react";
import { validateFile } from "../../../../utils/validateFile";
import styles from "./CoverImage.module.css";

const CoverImage = () => {
  const [message, setMessage] = useState({ type: null, text: "" });
  const changeImageHandler = useCallback(async (event) => {
    const file = event.target.files[0];
    const { error, hasError } = await validateFile({ file, type: "image", from: "cover-image" });
    if (hasError) {
      return setMessage((prevMessage) => {
        return { ...prevMessage, type: "error", text: error };
      });
    }
  }, []);

  return (
    <div className={styles["cover-image"]}>
      <label htmlFor="story-cover-image">Add a cover image</label>
      <input type="file" accept="image/*" id="story-cover-image" onChange={changeImageHandler} />
      {message.type === "error" && <p>{message.text}</p>}
    </div>
  );
};

export default CoverImage;
