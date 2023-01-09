import styles from "./Card.module.css";
const Card = (props) => {
  const className = props.className || "";
  return <div className={`${styles.card} ${className}`}>{props.children}</div>;
};

export default Card;
