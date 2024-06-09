//<---------- import modules ---------->
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { validateFile } from "../../../../utils/validateFile";
import useFileEditor from "../../../../hooks/useFileEditor";
import Loader from "../../../Loaders/Loader";
import styles from "./CoverImage.module.css";
import AuthLoader from "../../../Loaders/AuthLoader";

const CoverImage = () => {
  const { transformFile } = useFileEditor();
  const { files } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });
  const changeImageHandler = useCallback(
    async (event) => {
      //<----------reset the message---------->
      setMessage((prevMessage) => {
        return { ...prevMessage, type: null, text: "" };
      });
      const file = event.target.files[0];
      const { error, hasError } = await validateFile({ file, type: "image", from: "cover-image" });
      if (hasError) {
        return setMessage((prevMessage) => {
          return { ...prevMessage, type: "error", text: error };
        });
      }

      //----------> transform the image file
      await transformFile(file, "coverImage");
      //<---------- set the loading to true ---------->
      //setIsLoading((prevState) => true);
    },
    [transformFile]
  );
  console.log(files);
  return (
    <div className={styles["cover-image"]}>
      {!isLoading && (
        <>
          <label htmlFor="story-cover-image">Add a cover image</label>
          <input type="file" accept="image/*" id="story-cover-image" onChange={changeImageHandler} />
          {message.type === "error" && <p className={`error ${styles.message}`}>{message.text}</p>}
        </>
      )}
      {isLoading && (
        <div className={styles["loader-wrapper"]}>
          <Loader source="cover-image" />
          <AuthLoader text="Uploading" className={styles["loader-text"]} />
        </div>
      )}
    </div>
  );
};

export default CoverImage;
