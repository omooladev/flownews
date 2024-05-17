//<---------- IMPORT MODULES ---------->
import { useCallback, useState } from "react";
import PopUp from "./PopUp";
import Cropper from "react-easy-crop";
import styles from "./CropContainer.module.css";
import Slider from "./Slider";
import { getCroppedImg } from "../utils/canvasUtil";

const CropContainer = ({ image, onResetImage, onSaveImage, onMakeBodyFixed }) => {
  //<---------- STATES --------->
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  //<---------- FUNCTIONS ---------->
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const closeCropContainer = useCallback(() => {
    onResetImage();
    //----------> remove the fixed body
    onMakeBodyFixed();
  }, [onResetImage, onMakeBodyFixed]);

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
    //----------> set the is cropped to false
    setIsCropped((prevValue) => false);
    //----------->set the cropped image and the cropped area pixels to null once you are trying to edit again
    setCroppedImage(null);
    setCroppedAreaPixels(null);
  }, []);

  const saveImageHandler = useCallback(() => {
    //----------> if the image was not cropped, then save the default image
    onSaveImage(isCropped, croppedImage);
    //----------> close the crop container
    closeCropContainer();
  }, [onSaveImage, closeCropContainer, croppedImage, isCropped]);

  return (
    <PopUp className={styles.popUp} onClick={closeCropContainer}>
      {/* WHEN THE IMAGE IS NOT CROPPED YET, DISPLAY THIS TWO BUTTON */}
      <div className={`${styles.actions} ${styles.top_actions} ${isCropped && styles.cropped}`}>
        {isCropped && (
          <button className={styles.edit} onClick={editImageHandler}>
            Edit
          </button>
        )}
        <button className={styles.save} onClick={saveImageHandler}>
          Save
        </button>
      </div>
      {isCropped && (
        <div className={styles.cropped_image}>
          <img alt="cropped" src={croppedImage.url} />
        </div>
      )}
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

          {/* slider control */}
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

      {/* WHEN THE IMAGE IS NOT CROPPED YET, DISPLAY THIS TWO BUTTON */}
      {!isCropped && (
        <div className={styles.actions}>
          <button className={styles.save} onClick={saveCroppedPhotoHandler}>
            Apply
          </button>
          <button className={styles.cancel} onClick={closeCropContainer}>
            Close
          </button>
        </div>
      )}
    </PopUp>
  );
};

export default CropContainer;
