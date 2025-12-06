import { X } from "lucide-react";

const Popup = (props) => {
  return (
    <dialog id="modal_1" className="modal">
      <div className="modal-box ">
        <form method="dialog" className="flex items-center justify-end">
          <button className="btn btn-primary">
            <X className="size-5" />
          </button>
        </form>
        {props.children}
      </div>
    </dialog>
  );
};

export default Popup;
