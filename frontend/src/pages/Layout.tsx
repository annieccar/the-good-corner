import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main>
      <Header />
      <div className="pages">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
