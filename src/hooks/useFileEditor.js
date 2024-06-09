import { useCallback, useContext } from "react";
import useHttp from "./useHttp";
import { AuthContext } from "../store/Auth/auth-context";

const useFileEditor = () => {
  const { sendRequest } = useHttp();
  const { files, onUpdateFiles, HOSTURI, token } = useContext(AuthContext);
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

  const uploadFile = useCallback(
    async (file, data, fileType) => {
      const response = await sendRequest(`${HOSTURI}/contributor/upload-file?fileType=${fileType}`, {
        method: "POST",
        contributorData: data,
        token,
      });
      return response;
    },
    [sendRequest, HOSTURI, token]
  );
  return { transformFile, resetFile, getImage, uploadFile };
};

export default useFileEditor;
