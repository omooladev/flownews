import Card from "../../../../../../UI/Card";
import styles from "./Error.module.css";
const Error = ({ error, location }) => {
  return (
    error.length > 0 && (
      <Card className={styles.error}>
        {location !== "password-authentication" && (
          <>
            <p className={styles.error_header}>
              The following error has prohibited your profile from been saved
            </p>
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
          </>
        )}
        <p className={styles.error_text}>{error}</p>
      </Card>
    )
  );
};

export default Error;
