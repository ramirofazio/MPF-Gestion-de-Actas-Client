export const serverUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "http://10.190.12.72:3001";
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
