import { useCallback, useState } from "react";
import PopUp from "./PopUp";
import Cropper from "react-easy-crop";
import styles from "./CropContainer.module.css";
import Slider from "./Slider";
import { getCroppedImg } from "../utils/canvasUtil";

const CropContainer = ({ image, onResetImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const closeCropContainer = useCallback(() => {
    onResetImage();
  }, [onResetImage]);
  const saveCroppedPhotoHandler = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setIsCropped((prevValue) => true);
      setCroppedImage(croppedImage);
    } catch (error) {
      console.log(error);
    }
  }, [croppedAreaPixels, image]);

  const editImageHandler = useCallback(() => {
    setIsCropped((prevValue) => false);
    setCroppedImage(null);
    setCroppedAreaPixels(null);
  }, []);
  const saveProfilePicture = useCallback(() => {}, []);

  return (
    <PopUp className={styles.popUp} onClick={closeCropContainer}>
      {!isCropped && (
        <>
          <section className={styles.crop_container}>
            <div>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </section>

          <div className={styles.controls}>
            <Slider
              showIcon={true}
              onZoom={(zoom) => {
                setZoom(zoom);
              }}
            />
          </div>
        </>
      )}
      {isCropped && (
        <div className={styles.cropped_image}>
          <img alt="cropped" src={croppedImage} />
        </div>
      )}

      <div className={styles.actions}>
        {!isCropped && (
          <button className={styles.cancel} onClick={closeCropContainer}>
            Close
          </button>
        )}
        {isCropped && (
          <button className={styles.edit} onClick={editImageHandler}>
            Edit
          </button>
        )}

        <button className={styles.save} onClick={isCropped ? saveProfilePicture : saveCroppedPhotoHandler}>
          {isCropped ? "Save" : "Apply"}
        </button>
      </div>
    </PopUp>
  );
};

export default CropContainer;
