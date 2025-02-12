import { useEffect, useState } from "react";
import httpRequest from "../../../request/httpRequest";
import ToastService from "../../../common/service/ToastService";
import CC01Service from "./CC01Service";
import * as TimeService from "../../../common/service/TimeService";
import * as FileService from "../../../common/service/FileService";

const searchDefault = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  account: "",
  dateFormat: TimeService.browserDateFormat(),
};

const checkInOutDefault = {
  account: "",
  password: "",
};

const CC01 = () => {
  //---------------------------------------------------------------------------------------------------
  const [search, setSearch] = useState(searchDefault);
  const [checkInOut, setCheckInOut] = useState(checkInOutDefault);
  const [timeKeepingTodayList, setTimeKeepingTodayList] = useState([]);
  const [timeKeepingList, setTimeKeepingList] = useState([]);

  //---------------------------------------------------------------------------------------------------

  useEffect(() => {
    fetchTimeKeepingTodayList();
  }, []);

  const fetchTimeKeepingTodayList = async () => {
    try {
      const response = await httpRequest.post(
        `/cc/cc01/get-timekeeping-today`,
        { dateFormat: TimeService.browserDateFormat() }
      );
      setTimeKeepingTodayList((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const fetchTimeKeepingList = async () => {
    try {
      const response = await httpRequest.post(
        `/cc/cc01/get-timekeeping`,
        search
      );
      setTimeKeepingList((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const valueChangeSearch = (prop, value) => {
    setSearch((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const valueChangeCheckInOut = (prop, value) => {
    setCheckInOut((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const handleSearch = async () => {
    await fetchTimeKeepingList();
  };

  const handleClear = () => {
    setSearch((prev) => searchDefault);
  };

  const handleExport = () => {
    let data = [];
    const header = [
      "Stt",
      "Ngày làm việc",
      "Mã Nhân viên	",
      "Giờ vào",
      "Giờ ra",
    ];
    timeKeepingList
      .map((item, idx) => ({
        c0: idx + 1,
        c1: item.workingDate,
        c2: item.account,
        c3: item.timeIn,
        c4: item.timeOut,
      }))
      .forEach((item) => {
        data.push(Object.values(item));
      });
    const excelFile = FileService.createExcelFile(
      header,
      data,
      `Theo dõi chấm công`
    );
    FileService.downloadFile(excelFile);
  };

  const handleCheckIn = async () => {
    const messageCheckInOut = CC01Service.validateCheckInOut(checkInOut);
    if (messageCheckInOut.trim()) {
      ToastService.showToast(messageCheckInOut, "W");
      return;
    }
    try {
      const response = await httpRequest.post(`/cc/cc01/check-in`, checkInOut);
      ToastService.showToast(
        `${response.data.account} Check In thành công`,
        "S"
      );
      setCheckInOut((prev) => checkInOutDefault);
      await fetchTimeKeepingTodayList();
    } catch (error) {
      console.log(error);
      ToastService.showToast(error.response.data, "E");
    }
  };

  const handleCheckOut = async () => {
    const messageCheckInOut = CC01Service.validateCheckInOut(checkInOut);
    if (messageCheckInOut.trim()) {
      ToastService.showToast(messageCheckInOut, "W");
      return;
    }
    try {
      const response = await httpRequest.post(`/cc/cc01/check-out`, checkInOut);
      ToastService.showToast(
        `${response.data.account} Check Out thành công`,
        "S"
      );
      setCheckInOut((prev) => checkInOutDefault);
      await fetchTimeKeepingTodayList();
    } catch (error) {
      console.log(error);
      ToastService.showToast(error.response.data, "E");
    }
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0 p-4">
        <div>
          <h2 className="text-primary">CHẤM CÔNG HẰNG NGÀY</h2>
          <h5>Thứ hai, ngày 11 tháng 09 năm 2025</h5>
        </div>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Mã nhân viên"
              value={checkInOut.account}
              onInput={(e) => valueChangeCheckInOut("account", e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={checkInOut.password}
              onInput={(e) => valueChangeCheckInOut("password", e.target.value)}
            />
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleCheckIn()}
            >
              <i className="fas fa-sign-in-alt"></i> CHECK IN
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => handleCheckOut()}
            >
              <i className="fas fa-sign-out-alt"></i> CHECK OUT
            </button>
          </div>
        </div>
        <table className="table table-hover table-striped mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã Nhân viên</th>
              <th scope="col">Giờ vào</th>
              <th scope="col">Giờ ra</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {timeKeepingTodayList.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{item.account}</td>
                <td>{item.timeIn}</td>
                <td>{item.timeOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-light rounded mx-0 p-4 mt-2">
        <div>
          <h2 className="text-primary">THEO DÕI CHẤM CÔNG</h2>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="startDate" className="form-label m-0">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={search.startDate}
              onInput={(e) => valueChangeSearch("startDate", e.target.value)}
            />
          </div>
          <div className="col-3">
            <label htmlFor="endDate" className="form-label m-0">
              Ngày kết thúc
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={search.endDate}
              onInput={(e) => valueChangeSearch("endDate", e.target.value)}
            />
          </div>
          <div className="col-3">
            <label htmlFor="account" className="form-label m-0">
              Mã nhân viên
            </label>
            <input
              type="text"
              className="form-control"
              id="account"
              value={search.account}
              onInput={(e) => valueChangeSearch("account", e.target.value)}
            />
          </div>
          <div className="col-3">
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={() => handleSearch()}
            >
              <i className="fas fa-search"></i>
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-4 ms-2"
              onClick={() => handleClear()}
            >
              <i className="fas fa-ban"></i>
            </button>
            <button
              type="button"
              className="btn btn-success mt-4 ms-2"
              onClick={() => handleExport()}
            >
              <i className="fas fa-file-download"></i> XUẤT FILE
            </button>
          </div>
        </div>
        <table className="table table-hover table-striped mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ngày làm việc</th>
              <th scope="col">Mã Nhân viên</th>
              <th scope="col">Giờ vào</th>
              <th scope="col">Giờ ra</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {timeKeepingList.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{item.workingDate}</td>
                <td>{item.account}</td>
                <td>{item.timeIn}</td>
                <td>{item.timeOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CC01;
