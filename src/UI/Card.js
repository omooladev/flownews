import styles from "./Card.module.css";
const Card = (props) => {
  const className = props.className || "";
  const onClick = props.onClick || null;
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {props.children}
    </div>
  );
};

export default Card;
