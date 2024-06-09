import { useCallback, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";

const useFileEditor = () => {
  const {onUpdateFiles } = useContext(AuthContext);
  const transformFile = useCallback(
    async (file, fileType) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result = reader.result;
          onUpdateFiles({ [fileType]: { transformedFile: result, file } });
        };
      }
    },
    [onUpdateFiles]
  );
  return { transformFile };
};

export default useFileEditor;
