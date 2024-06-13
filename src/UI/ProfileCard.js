import styles from "./ProfileCard.module.css";
const ProfileCard = (props) => {
  const className = props.className || "";
  return (
    <section className={`${className} ${styles["profile-card"]}`}>
      <h1>Olawole</h1>
      <h2>Adewole</h2>
    </section>
  );
};

export default ProfileCard;
