import Card from "../../../../../../UI/Card";
import styles from "./Error.module.css";
const Error = ({ error }) => {
  return (
    error.length > 0 && (
      <Card className={styles.error}>
        <p className={styles.error_header}>The following error has prohibited your profile from been saved</p>
        <ul>
          {error.map((err, index) => {
            return (
              <div key={index}>
                <span></span>
                <li>{err}</li>
              </div>
            );
          })}
        </ul>
      </Card>
    )
  );
};

export default Error;
