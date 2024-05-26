//<---------- import modules ---------->
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import MDEditor from "@uiw/react-md-editor";
import "./StoryTextArea.css";

const StoryTextArea = () => {
  const {
    appMode: { theme, NewStorySettings },
    newStory,
    onUpdateNewStory,
  } = useContext(AuthContext);
  const autoPreview = NewStorySettings ? NewStorySettings.autoPreview : true;

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
