import ProfileCard from "../../../../UI/ProfileCard";
import Preview from "./Preview";
import Share from "./Share";
import styles from "./DraftPreview.module.css";

const DraftPreview = () => {
  return (
    <section className={styles["draft-preview"]}>
      <Share />
      <section className={`content-wrapper`}>
        <Preview className={`main-content`} />
        <aside className={`aside-content ${styles["aside-content"]}`}>
          <ProfileCard source="draft-preview" />
          <h2>Hello</h2>
        </aside>
      </section>
    </section>
  );
};

export default DraftPreview;
