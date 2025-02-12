import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar pb-3">
      <nav className="navbar bg-light navbar-light">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-color text-primary">
            <i className="fas fa-utensils"></i> GIA TRUYỀN
          </h3>
        </Link>
        <div className="navbar-nav w-100">
          <Link to="/nv/nv01" className="nav-item nav-link">
            <i className="fas fa-users me-2"></i>THỰC ĐƠN
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
