import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [pos, setPos] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setPos(true);
      } else {
        setPos(false);
      }
    });
  });
  return (
    <header
      className={` transition duration-200 ${
        pos ? "bg-base-300" : "bg-transparent"
      } border-b border-base-content/10 sticky top-0 z-50`}
    >
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-primary font-bold tracking-tight">
            FitApp
          </h1>

          <div className="flex items-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("modal_form").showModal()}
            >
              <PlusIcon className="size-5" />
              <span>New Workout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
