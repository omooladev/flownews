import ReactDOM from "react-dom";
import Card from "./Card.js";
import styles from "./PopUp.module.css";
const BackDrop = (props) => {
  return <div className={styles.overlay} onClick={props.onClick}></div>;
};

const PopUpBox = (props) => {
  return <Card className={props.className}>{props.children}</Card>;
};

//----------> The Popup function for rendering all other pop up
const PopUp = (props) => {
  //----------> access the overlay element
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <PopUpBox className={props.className}>{props.children}</PopUpBox>,
        portalElement
      )}
    </>
  );
};

export default PopUp;
