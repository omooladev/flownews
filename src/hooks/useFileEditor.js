import { useCallback, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";

const useFileEditor = () => {
  const { files, onUpdateFiles } = useContext(AuthContext);
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
  const resetFile = useCallback(
    (fileType) => {
      return onUpdateFiles({ [fileType]: { transformedFile: null, file: null } });
    },
    [onUpdateFiles]
  );
  const getImage = useCallback(
    async (isCropped, image, fileType) => {
      let url;
      let file;
      if (isCropped) {
        url = image.url;
        file = image.file;
      } else {
        url = files[fileType].transformedFile;
        file = files[fileType].file;
      }
      return { url, file };
    },
    [files]
  );
  return { transformFile, resetFile, getImage };
};

export default useFileEditor;
