import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-primary font-bold tracking-tight">
            FitApp
          </h1>

          <div className="flex items-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("modal_1").showModal()}
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
