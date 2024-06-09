const CoverImage = () => {
  return (
    <div className={styles["cover-image"]}>
      <label htmlFor="story-cover-image">Add a cover image</label>
      <input type="file" id="story-cover-image" />
    </div>
  );
};

export default CoverImage;
