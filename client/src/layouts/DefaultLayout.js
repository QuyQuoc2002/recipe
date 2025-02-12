import Loading from "./component/Loading";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      {/* <Loading /> */}
      <SideBar />
      <div className="content">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
