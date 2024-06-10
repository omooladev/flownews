import { useCallback, useContext } from "react";
import useHttp from "./useHttp";
import { AuthContext } from "../store/Auth/auth-context";

const useFileEditor = () => {
  const { sendRequest } = useHttp();
  const { files, onUpdateFiles, token, HOSTURI } = useContext(AuthContext);
  //<---------- Function for transforming files ---------->
  const transformFile = useCallback(
    async (file, fileType) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result = reader.result;
          onUpdateFiles({
            [fileType]: {
              transformedFile: result,
              file,
              ...(fileType.includes("Image") && { showCropContainer: true }),
            },
          });
        };
      }
    },
    [onUpdateFiles]
  );
  const resetFile = useCallback(
    (fileType) => {
      return onUpdateFiles({
        [fileType]: {
          transformedFile: null,
          file: null,
          ...(fileType.includes("Image") && { showCropContainer: false }),
        },
      });
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
      //<---------- update the file ---------->
      onUpdateFiles({ [fileType]: { transformedFile: url, file, isCropped, showCropContainer: false } });
      return { url, file };
    },
    [files, onUpdateFiles]
  );

  const uploadFile = useCallback(
    async (file, fileType, isCropped) => {
      const formData = new FormData();
      if (fileType.includes("Image")) {
        //----------> if cropped, then name the image while appending it to the form data
        if (isCropped) {
          formData.append("image", file, isCropped && "cropped_image.jpeg");
        } else {
          formData.append("image", file);
        }
      }

      const response = await sendRequest(`${HOSTURI}/contributor/upload-file?fileType=${fileType}`, {
        method: "POST",
        contributorData: formData,
        token,
        contentType: "multipart/form-data",
      });
      console.log(response);
      return response;
    },
    [token, HOSTURI, sendRequest]
  );

  return { transformFile, resetFile, getImage, uploadFile };
};

export default useFileEditor;
