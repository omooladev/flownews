import Card from "../../../../../../UI/Card";
import styles from "./UserForm.module.css";
const Error = (props) => {
  const { error } = props;
  return (
    <Card className={styles.error}>
      <h4>The following error has prohibited your profile from been saved</h4>
      <ul>
        <li>{error}</li>
      </ul>
    </Card>
  );
};

export default Error;
