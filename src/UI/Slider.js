import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import styles from "./Slider.module.css";
import { useCallback, useEffect, useState } from "react";
const Slider = ({ onZoom, showIcon }) => {
  const [sliderValue, setSliderValue] = useState(1);
  const zoomHandler = useCallback((action) => {
    if (action === "zoom-in") {
      setSliderValue((prevValue) => {
        if (prevValue <= 3) {
          return prevValue + 0.1;
        }
        return prevValue;
      });
    }
    if (action === "zoom-out") {
      setSliderValue((prevValue) => {
        if (prevValue > 1) {
          return prevValue - 0.1;
        }
        return prevValue;
      });
    }
  }, []);
  const changeSliderValueHandler = useCallback(
    (event) => {
      const value = event.target.value;
      setSliderValue(value);
    },
    []
  );

  useEffect(() => {
    if (sliderValue) {
      onZoom(sliderValue);
    }
  }, [sliderValue, onZoom]);
  return (
    <div className={`${styles.slider_container} ${showIcon && styles.icon_exist}`}>
      {showIcon && (
        <BsZoomOut
          className={styles.icon}
          onClick={() => {
            zoomHandler("zoom-out");
          }}
        />
      )}
      <input
        type="range"
        min={1}
        step={0.1}
        max={3}
        value={sliderValue}
        className={styles.slider}
        onChange={changeSliderValueHandler}
      />

      {showIcon && (
        <BsZoomIn
          className={styles.icon}
          onClick={() => {
            zoomHandler("zoom-in");
          }}
        />
      )}
    </div>
  );
};

export default Slider;
