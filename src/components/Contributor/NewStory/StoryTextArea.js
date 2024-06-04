//<---------- import modules ---------->
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import MDEditor from "@uiw/react-md-editor";
import "./StoryTextArea.css";

const StoryTextArea = () => {
  const {
    appMode: { theme },
    newStory: {
      value,
      pageSettings: { isAutoPreviewEnabled },
    },
    onUpdateNewStory,
  } = useContext(AuthContext);

  console.log({value})
  return (
    <div className={`story-text-area ${isAutoPreviewEnabled && "previewed"}`}>
      <MDEditor
        value={value}
        onChange={(value) => onUpdateNewStory({ value })}
        data-color-mode={theme.includes("light") ? "light" : "dark"}
        //----------> for removing the default preview and only showing the edit
        preview="edit"
        //----------> for removing the extra commands
        extraCommands={[]}
      />
    </div>
  );
};

export default StoryTextArea;
