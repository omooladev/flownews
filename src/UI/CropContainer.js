import { useCallback, useState } from "react";
import PopUp from "./PopUp";
import Cropper from "react-easy-crop";
import styles from "./CropContainer.module.css";
import Slider from "./Slider";

const CropContainer = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <PopUp className={styles.popUp}>
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
      <div className={styles.actions}>
        <button className={styles.cancel}>Cancel</button>
        <button className={styles.save}>Save photo</button>
      </div>
    </PopUp>
  );
};

export default CropContainer;
