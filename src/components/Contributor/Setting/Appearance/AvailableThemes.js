import LightDefaultMode from "../../../../assets/light_preview.svg";
import DarkDefaultMode from "../../../../assets/dark_preview.svg";

export const configureAvailableThemes = (theme) => {
  return [
    {
      name: "Light Default",
      image: LightDefaultMode,
      themeName: "light-default",
      active: theme === "light-default" ? "active" : "",
      checked: theme === "light-default",
    },
    {
      name: "Dark Default",
      image: DarkDefaultMode,
      themeName: "dark-default",
      active: theme === "dark-default" ? "active" : "",
      checked: theme === "dark-default",
    },
  ];
};
