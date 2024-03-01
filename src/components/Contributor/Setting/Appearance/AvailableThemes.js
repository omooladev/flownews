import LightDefaultMode from "../../../../assets/light_preview.svg";
import DarkDefaultMode from "../../../../assets/dark_preview.svg";

export const configureAvailableThemes = (theme) => {
  //----------> receive the default value of the theme from the Theme mode file and use it to configure the themes
  return [
    {
      name: "Light Default", //----------> the theme name that is shown in the browser
      image: LightDefaultMode, //----------> the svg file of the light theme
      themeName: "light-default", //----------> the theme name
      checked: theme === "light-default", //----------> the the default theme is light-default, then checked will be true
    },
    {
      name: "Dark Default", //----------> the theme name that is shown in the browser
      image: DarkDefaultMode, //----------> the svg file of the dark theme
      themeName: "dark-default", //----------> the theme name that is saved
      checked: theme === "dark-default", //----------> the the default theme is dark-default, then checked will be true
    },
  ];
};
