import { X } from "lucide-react";
import { useRef } from "react";

const Popup = ({ modal_id, children, onClose }) => {
  const dialogRef = useRef();

  const handleDialogClose = () => {
    if (onClose) onClose();
  };

  return (
    <dialog
      id={modal_id}
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle relative z-0"
      onClose={handleDialogClose} // Listen to the close event of the MODAL
    >
      <div className="modal-box items-center justify-center">
        <p className="text-neutral text-center">Click outside to close</p>
        {children}
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
