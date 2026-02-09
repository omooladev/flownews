import { configuration } from "../../react-app/src/config";

//A function for validating file and image
export const validateFile = async ({ file, type }) => {
  if (type === "image") {
    return validateImage(file);
  }
};
const validateImage = async (file) => {
  const maxImageSize = configuration.maxImageSize;
  const imageType = file.type;
  const imageSize = file.size;
  if (!imageType.includes("image/")) {
    return {
      hasError: true,
      error: "Please upload an image",
    };
  }

  if (imageSize > maxImageSize) {
    return {
      hasError: true,
      error: `Please upload a picture smaller than ${maxImageSize.toString().slice(0, 1)}MB`,
    };
  }
  return { hasError: false, error: null };
};
