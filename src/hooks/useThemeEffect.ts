import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export const useThemeEffect = () => {
  const { isDarkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);
};
