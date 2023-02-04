import styles from "./Email.module.css";
import EmailRequestChangeCancel from "./EmailRequestChangeCancel";

const Email = () => {
  return (
    <section className={styles.email}>
      <h2>Email</h2>
      <hr />
      <EmailRequestChangeCancel />
    </section>
  );
};

export default Email;
