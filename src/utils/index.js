const getUrl = () => {
  const staging = process.env.REACT_APP_ENV;
  const nodeEnv = process.env.NODE_ENV;

  if (staging) {
    return "http://10.190.15.142:3001";
  } else if (nodeEnv === "production") {
    return "http://10.190.15.142:3001";
  } else {
    return "http://localhost:3001";
  }
};

export const serverUrl = getUrl();
export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#006473",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflowX: "hidden",
  },
};

export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export { editSavedActa } from "./editSavedActa";
export { generateDoc } from "./generateDoc";
export { getSavedActa } from "./getSavedActa";
export { validateEfecto } from "./validateEfecto";
export { deleteOfStorage, getOfStorage, saveInStorage } from "./localStorage";
