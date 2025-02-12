import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpRequest from "../../../request/httpRequest";
import NV02 from "../nv02/NV02";
import NV03 from "../nv03/NV03";
import ToastService from "../../../common/service/ToastService";

const NV01 = () => {
  //---------------------------------------------------------------------------------------------------
  const [showNV02, setShowNV02] = useState(false);
  const [showNV03, setShowNV03] = useState(false);
  const [paramNV03, setParamNV03] = useState({});
  const [staffList, setStaffList] = useState([]);
  const [search, setSearch] = useState("");

  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await httpRequest.post(`/nv/nv01/get-all-staff`);
      setStaffList((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const handleShowNV02 = () => {
    setShowNV02(true);
  };

  const handleCloseNV02 = async () => {
    setShowNV02(false);
    await fetchStaffList();
  };

  const handleDismissNV02 = () => {
    setShowNV02(false);
  };
  const handleShowNV03 = (account) => {
    setParamNV03((prev) => ({ ...prev, account }));
    setShowNV03(true);
  };

  const handleCloseNV03 = async () => {
    setParamNV03((prev) => ({}));
    setShowNV03(false);
    await fetchStaffList();
  };

  const handleDismissNV03 = () => {
    setParamNV03((prev) => ({}));
    setShowNV03(false);
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0 p-4">
        <div className="mb-4 d-flex">
          <h2 className="text-primary">DANH SÁCH NHÂN VIÊN</h2>
          <button
            className="btn btn-primary text-white rounded-pill ms-2"
            onClick={() => handleShowNV02()}
          >
            <i className="fas fa-plus"></i> THÊM NHÂN VIÊN
          </button>
          {showNV02 && (
            <NV02
              show={showNV02}
              handleClose={() => handleCloseNV02()}
              handleDismiss={() => handleDismissNV02()}
            ></NV02>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="searchValue" className="form-label">
            Tìm kiếm theo tên, mã nhân viên
          </label>
          <input
            type="email"
            className="form-control"
            id="searchValue"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã Nhân viên</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {staffList
              .filter(
                (item) =>
                  item.fullname.toLowerCase().includes(search.toLowerCase()) ||
                  item.account.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <Link onClick={() => handleShowNV03(item.account)}>
                      {item.account}
                    </Link>
                  </td>
                  <td>{item.fullname}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {showNV03 && (
          <NV03
            param={paramNV03}
            show={showNV03}
            handleClose={handleCloseNV03}
            handleDismiss={handleDismissNV03}
          />
        )}
      </div>
    </div>
  );
};

export default NV01;
