//<---------- import modules ---------->
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { validateFile } from "../../../../utils/validateFile";
import useFileEditor from "../../../../hooks/useFileEditor";
import AuthLoader from "../../../Loaders/AuthLoader";
import CropContainer from "../../../../UI/CropContainer";
import Loader from "../../../Loaders/Loader";
import styles from "./CoverImage.module.css";

const CoverImage = () => {
  const { transformFile, getImage, resetFile } = useFileEditor();
  const {
    onMakeBodyFixed,
    files: { coverImage },
  } = useContext(AuthContext);
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
    },
    [transformFile]
  );

  const saveImageHandler = useCallback(
    async (isCropped, image) => {
      const { file } = await getImage(isCropped, image, "coverImage");
      //<---------- set the loading to true ---------->
      setIsLoading((prevState) => true);

      //<---------- upload the image to my cloudinary ---------->
      console.log(file);
    },
    [getImage]
  );
  console.log(process.env.CLOUDINARY_URL);
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

      {coverImage.transformedFile && (
        <CropContainer
          image={coverImage.transformedFile}
          onResetImage={() => resetFile("coverImage")}
          onMakeBodyFixed={onMakeBodyFixed}
          onSaveImage={saveImageHandler}
        />
      )}
    </div>
  );
};

export default CoverImage;
