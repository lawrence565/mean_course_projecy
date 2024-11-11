import { Outlet } from "react-router-dom";
import { CourseComponentProps } from "../types/types";
import Nav from "./nav-component";

const Layout: React.FC<CourseComponentProps> = ({
  currentUser,
  setCurrentUser,
}) => {
  if (currentUser) {
    console.log("他會執行");
  }
  console.log(currentUser);
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
