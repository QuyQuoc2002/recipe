import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar pb-3">
      <nav className="navbar bg-light navbar-light">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-color text-primary">
            <i className="far fa-building"></i>Héng Xin
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="/img/user.jpg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3 text-color">
            <h6 className="mb-0 ">Jhon Doe</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link to="/nv/nv01" className="nav-item nav-link">
            <i className="fas fa-users me-2"></i>NHÂN VIÊN
          </Link>
          <Link to="/cc/cc01" className="nav-item nav-link">
            <i className="far fa-calendar-check"></i>CHẤM CÔNG
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
