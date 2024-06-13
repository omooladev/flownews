import ProfileCard from "../../../../UI/ProfileCard";
import Preview from "./Preview";

const DraftPreview = () => {
  return (
    <section className={`content-wrapper`}>
      <Preview className={`main-content`} />
      <ProfileCard className={`aside-content`} />
    </section>
  );
};

export default DraftPreview;
