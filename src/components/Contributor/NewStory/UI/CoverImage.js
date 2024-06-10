//<---------- import modules ---------->
import { useCallback, useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { validateFile } from "../../../../utils/validateFile";
import useFileEditor from "../../../../hooks/useFileEditor";
import AuthLoader from "../../../Loaders/AuthLoader";
import CropContainer from "../../../../UI/CropContainer";
import Loader from "../../../Loaders/Loader";
import styles from "./CoverImage.module.css";

const CoverImage = () => {
  const { transformFile, getImage, resetFile, uploadFile } = useFileEditor();
  const {
    onMakeBodyFixed,
    files: { coverImage },
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });
  const coverImageInputRef = useRef();

  //<---------- function for resetting the cover image message ---------->
  const resetMessage = useCallback(() => {
    return setMessage((prevMessage) => {
      return { ...prevMessage, type: null, text: "" };
    });
  }, []);

  //<---------- function for changing image ---------->
  const changeImageHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      //----------> reset the message
      resetMessage();

      //----------> access the file
      const file = event.target.files[0];

      //----------> validate the file
      const { error, hasError } = await validateFile({ file, type: "image", from: "cover-image" });
      if (hasError) {
        return setMessage((prevMessage) => {
          return { ...prevMessage, type: "error", text: error };
        });
      }
      //----------> transform the image file
      await transformFile(file, "coverImage");
    },
    [resetMessage, transformFile]
  );

  const saveImageHandler = useCallback(
    async (isCropped, image) => {
      //----------> get the file
      const { file } = await getImage(isCropped, image, "coverImage");
      //<---------- set the loading to true ---------->
      setIsLoading((prevState) => true);
      //<---------- upload the image to my cloudinary ---------->
      const { error, data } = await uploadFile(file, "coverImage");

      if (error) {
        setMessage((prevMessage) => {
          return { ...prevMessage, type: "error-from-server", text: error };
        });
      }
      if (data) {
      }
      return setIsLoading((prevState) => false);
    },
    [getImage, uploadFile]
  );
  const retryFileUpload = useCallback(async () => {
    console.log(coverImage);
  }, [coverImage]);

  //<---------- function for cancelling the upload --------->
  const cancelImageUpload = useCallback(() => {
    //----------> reset the input value
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
    resetMessage();
    resetFile("coverImage");
  }, [resetFile, resetMessage]);
  //   console.log(coverImage);

  return (
    <div className={styles["cover-image"]}>
      {!isLoading && (
        <>
          {message.type !== "error-from-server" && (
            <>
              <label htmlFor="story-cover-image">Add a cover image</label>
              <input
                type="file"
                accept="image/*"
                id="story-cover-image"
                ref={coverImageInputRef}
                onChange={changeImageHandler}
              />
            </>
          )}
          {message.type === "error" && <p className={`error ${styles.message}`}>{message.text}</p>}
          {message.type === "error-from-server" && (
            <div className={styles.actions}>
              <button className={styles.retry} onClick={retryFileUpload}>
                Retry Upload
              </button>
              <button className={styles.cancel} onClick={cancelImageUpload}>
                Cancel
              </button>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className={styles["loader-wrapper"]}>
          <Loader source="cover-image" />
          <AuthLoader text="Uploading" className={styles["loader-text"]} />
        </div>
      )}

      {coverImage.showCropContainer && (
        <CropContainer
          image={coverImage.transformedFile}
          onResetImage={cancelImageUpload}
          onMakeBodyFixed={onMakeBodyFixed}
          onSaveImage={saveImageHandler}
        />
      )}
    </div>
  );
};

export default CoverImage;
