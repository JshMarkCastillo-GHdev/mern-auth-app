import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-4xl text-primary font-bold tracking-tight">
              FitApp
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
