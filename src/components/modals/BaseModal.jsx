import Modal from "react-modal";
import { Icons as I } from "assets/index";

const modalStyles = {
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
    padding: "0",
    minWidth: "40%",
  },
};

export function BaseModal({ isOpen, close, content }) {
  return (
    <Modal isOpen={isOpen} style={modalStyles} ariaHideApp={false}>
      <I.close className="closeModalIcon" onClick={() => close(false)} />
      {content}
    </Modal>
  );
}
