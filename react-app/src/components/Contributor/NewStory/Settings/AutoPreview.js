//<----------import modules ---------->
import { useEffect, useState } from "react";

const AutoPreview = ({ isAutoPreviewEnabled, onSaveSettingStates }) => {
  const [previewState, setPreviewState] = useState({ checkbox1: false, checkbox2: false });

  useEffect(() => {
    if (previewState) {
      onSaveSettingStates({ previewState });
    }
  }, [previewState, onSaveSettingStates]);
  return (
    <li>
      {isAutoPreviewEnabled && (
        <input
          type="checkbox"
          id="auto-preview-checkbox"
          checked={previewState.checkbox1}
          onChange={() =>
            setPreviewState((prevState) => {
              return { ...prevState, checkbox1: !prevState.checkbox1, checkbox2: false };
            })
          }
        />
      )}
      {!isAutoPreviewEnabled && (
        <input
          type="checkbox"
          id="auto-preview-checkbox"
          // If auto preview is true, then we make the input unchecked
          checked={previewState.checkbox2}
          onChange={() =>
            setPreviewState((prevState) => {
              return { ...prevState, checkbox2: !prevState.checkbox2, checkbox1: false };
            })
          }
        />
      )}
      <label htmlFor="auto-preview-checkbox">
        {isAutoPreviewEnabled ? "Disable Auto-Preview" : "Enable Auto-Preview"}
      </label>
    </li>
  );
};

export default AutoPreview;
