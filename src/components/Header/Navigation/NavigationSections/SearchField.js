import { useEffect, useRef } from "react";
import styles from "./SearchField.module.css";
const SearchField = (props) => {
  let { search, className } = props;
  const searchRef = useRef();

  useEffect(() => {
    if (search) {
      searchRef.current.focus();
    }
  }, [search]);
  className = className || "";
  return <input className={`${className} ${styles.input}`} ref={searchRef} />;
};

export default SearchField;
