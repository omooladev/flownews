import ReactDOM from 'react-dom';
import Card from './Card.js';
import styles from './PopUp.module.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/Auth/auth-context.js';
const BackDrop = (props) => {
  return <div className={styles.overlay} onClick={props.onClick}></div>;
};

const PopUpBox = (props) => {
  useEffect(() => {
    if (!props.makeBodyFixed) {
      props.onMakeBodyFixed(true);
    }
  }, [props]);
  return <Card className={`${styles['pop-up']} ${props.className}`}>{props.children}</Card>;
};

//----------> The Popup function for rendering all other pop up
const PopUp = (props) => {
  const { makeBodyFixed, onMakeBodyFixed } = useContext(AuthContext);
  //----------> access the overlay element
  const portalElement = document.getElementById('overlays');
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, portalElement)}
      {ReactDOM.createPortal(
        <PopUpBox className={props.className} onMakeBodyFixed={onMakeBodyFixed} makeBodyFixed={makeBodyFixed}>
          {props.children}
        </PopUpBox>,
        portalElement,
      )}
    </>
  );
};

export default PopUp;
