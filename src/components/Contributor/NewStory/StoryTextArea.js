//<---------- import modules ---------->
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import MDEditor from "@uiw/react-md-editor";
import "./StoryTextArea.css";

const StoryTextArea = () => {
  const {
    appMode: {
      theme,
      NewStorySettings: { autoPreview },
    },
    newStory,
    onUpdateNewStory,
  } = useContext(AuthContext);

  return (
    <div className={`story-text-area ${autoPreview && "previewed"}`}>
      <MDEditor
        value={newStory.value}
        onChange={(value) => onUpdateNewStory({ value })}
        data-color-mode={theme.includes("light") ? "light" : "dark"}
      />
    </div>
  );
};

export default StoryTextArea;
