import LightDefaultMode from "../../../../assets/light_preview.svg";
import DarkDefaultMode from "../../../../assets/dark_preview.svg";

export const configureAvailableThemes = (theme) => {
  //----------> receive the default value of the theme from the Theme mode file and use it to configure the themese
  return [
    {
      name: "Light Default",
      image: LightDefaultMode,
      themeName: "light-default",
      active: theme === "light-default",
      checked: theme === "light-default",
    },
    {
      name: "Dark Default",
      image: DarkDefaultMode,
      themeName: "dark-default",
      active: theme === "dark-default",
      checked: theme === "dark-default",
    },
  ];
};
