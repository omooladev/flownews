import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import styles from "./Slider.module.css";
const Slider = ({ onZoom, showIcon }) => {
  return (
    <div className={`${styles.slider_container} ${showIcon && styles.icon_exist}`}>
      {showIcon && <BsZoomIn className={styles.icon} />}
      <input type="range" min={0} max={100} value={0} className={styles.slider} />
      {showIcon && <BsZoomOut className={styles.icon} />}
    </div>
  );
};

export default Slider;
