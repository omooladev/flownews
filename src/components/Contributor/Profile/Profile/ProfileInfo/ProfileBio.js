import styles from "./ProfileBio.module.css";
const ProfileBio = (props) => {
  const { bio, className: additionalClassName } = props;

  //---------->configuring the className to accept additional styles
  let className = `${styles.bio} ${additionalClassName ? styles[additionalClassName] : ""}`;

  return <p className={className}>{bio}</p>;
};

export default ProfileBio;
