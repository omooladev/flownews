import Card from "../../../../../../UI/Card";
import styles from "./UserForm.module.css";
const Error = ({ error }) => {
  return (
    error.length > 0 && (
      <Card className={styles.error}>
        <p>The following error has prohibited your profile from been saved</p>
        <ul>
          {error.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      </Card>
    )
  );
};

export default Error;
