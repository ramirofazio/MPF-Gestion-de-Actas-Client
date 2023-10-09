import Modal from "react-modal";
import { Icons as I } from "assets/index";

export function BaseModal({ isOpen, close, content }) {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70"
      overlayClassName="bg-black bg-opacity-50"
    >
      <div className="bgTools relative w-[40%] rounded-md">
        <I.close className="closeModalIcon absolute right-2 top-2 z-10 cursor-pointer" onClick={() => close(false)} />
        <div data-aos="zoom-in" className="w-full">
          {content}
        </div>
      </div>
    </Modal>
  );
}
