import PublicLayout from "./layout/PublicLayout";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <PublicLayout>
        <Outlet></Outlet>
      </PublicLayout>
    </div>
  );
};

export default App;
