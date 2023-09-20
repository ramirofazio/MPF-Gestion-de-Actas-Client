import Modal from "react-modal";
import { Icons as I } from "assets/index";

export function BaseModal({ isOpen, close, content }) {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="bgTools relative mx-auto mt-[20vh] flex w-[40%] flex-col items-center justify-center rounded-md"
    >
      <I.close className="closeModalIcon" onClick={() => close(false)} />
      <div data-aos="zoom-in" className="w-full">
        {content}
      </div>
    </Modal>
  );
}
