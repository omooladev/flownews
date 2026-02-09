import { useCallback, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./StoryTitle.module.css";

const StoryTitle = () => {
  const {
    onUpdateNewStory,
    newStory: { title },
  } = useContext(AuthContext);
  const storyTitleRef = useRef();

  //<---------- Function for saving the title when the cursor leaves the input --------->
  const saveTitleHandler = useCallback(() => {
    const title = storyTitleRef.current.value.trim();
    return onUpdateNewStory({ title });
  }, [onUpdateNewStory]);

  useEffect(() => {
    if (title) {
      storyTitleRef.current.value = title;
    }
  }, [title]);
  return (
    <div className={styles["story-title"]}>
      <label className={styles.title}>
        Title<span>*</span>
      </label>
      <input
        type="text"
        placeholder="Enter Title Here..."
        autoCorrect="false"
        ref={storyTitleRef}
        onBlur={saveTitleHandler}
      />
    </div>
  );
};

export default StoryTitle;
