import styles from "./SearchField.module.css";
const SearchField = (props) => {
  let className = props.className || "";
  return <input {...props} className={`${className} ${styles.input}`} />;
};

export default SearchField;
