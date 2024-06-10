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
  const saveMessage = useCallback((newMessage) => {
    return setMessage((prevMessage) => {
      return { ...prevMessage, ...newMessage };
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
      //TODO UNCOMMENT THIS
      // const { error, hasError } = await validateFile({ file, type: "image", from: "cover-image" });
      // if (hasError) {
      //   return saveMessage({ type: "error", text: error });
      // }
      //----------> transform the image file
      await transformFile(file, "coverImage");
    },
    [saveMessage, resetMessage, transformFile]
  );

  const uploadImage = useCallback(
    async (isCropped, image, source = null) => {
      //----------> get the file
      let newFile;
      if (source) {
        newFile = image;
      } else {
        const { file } = await getImage(isCropped, image, "coverImage");
        newFile = file;
      }
      //<---------- set the loading to true ---------->
      setIsLoading((prevState) => true);
      //<---------- upload the image to my cloudinary ---------->
      const { error, data } = await uploadFile(newFile, "coverImage", isCropped);

      if (error) {
        saveMessage({ type: "error-from-server", text: error });
      }
      if (data) {
      }
      return setIsLoading((prevState) => false);
    },
    [saveMessage, getImage, uploadFile]
  );
  const retryImageUpload = useCallback(async () => {
    await uploadImage(coverImage.isCropped, coverImage.file, "retry-upload");
  }, [coverImage, uploadImage]);

  //<---------- function for cancelling the upload --------->
  const cancelImageUpload = useCallback(() => {
    //----------> reset the input value
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
    resetMessage();
    resetFile("coverImage");
  }, [resetFile, resetMessage]);

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

          {message.type === "error-from-server" && (
            <div className={styles.actions}>
              <button className={styles.retry} onClick={retryImageUpload}>
                Retry Upload
              </button>
              <button className={styles.cancel} onClick={cancelImageUpload}>
                Cancel
              </button>
            </div>
          )}
          {message.type && message.type.includes("error") && (
            <p className={`error ${styles.message}`}>{message.text}</p>
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
          onSaveImage={uploadImage}
        />
      )}
    </div>
  );
};

export default CoverImage;
