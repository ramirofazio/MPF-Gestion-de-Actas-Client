export let serverUrl;

if (process.env.NODE_ENV === "development") {
  //! Si estás en un entorno de desarrollo en Windows
  serverUrl = "http://localhost:3001";
} else {
  //! Si estás en una VM local basada en Ubuntu
  serverUrl = "http://10.190.12.72:3001";
}

export const modal40x40 = {
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
    padding: 0,
    overflowX: "hidden",
    width: "40%",
    height: "max-content",
  },
};
