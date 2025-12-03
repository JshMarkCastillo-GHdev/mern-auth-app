import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const WorkoutsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl">No notes to show.</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create it with a Note!
      </p>
      <Link to="/create" className="btn btn-primary">
        Create your First Note
      </Link>
    </div>
  );
};

export default WorkoutsNotFound;
