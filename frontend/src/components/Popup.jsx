import { X } from "lucide-react";

const Popup = (props) => {
  return (
    <dialog id="modal_1" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box items-center justify-center">
        <p className="text-neutral text-center">Click outside to close</p>
        {props.children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>
          <X className="size-4" />
        </button>
      </form>
    </dialog>
  );
};

export default Popup;
