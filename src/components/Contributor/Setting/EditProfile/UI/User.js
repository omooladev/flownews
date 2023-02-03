import Card from "../../../../../UI/Card";
import styles from "./User.module.css";
import UserForm from "./UserForm";
const User = () => {
  return (
    <Card className={styles.user}>
      <h2>User</h2>
      <UserForm/>
    </Card>
  );
};

export default User;
