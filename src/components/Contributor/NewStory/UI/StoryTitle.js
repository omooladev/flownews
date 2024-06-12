import { useCallback, useContext, useRef } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./StoryTitle.module.css";

const StoryTitle = () => {
  const {
    onUpdateNewStory,
    newStory: { title },
  } = useContext(AuthContext);
  const storyTitleRef = useRef();
  const saveTitleHandler = useCallback(() => {
    const title = storyTitleRef.current.value.trim();
    return onUpdateNewStory({ title });
  }, [onUpdateNewStory]);
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
        value={title}
        onBlur={saveTitleHandler}
      />
    </div>
  );
};

export default StoryTitle;
