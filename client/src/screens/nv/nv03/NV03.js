import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";
import httpRequest from "../../../request/httpRequest";
import ToastService from "../../../common/service/ToastService";
import NV03Service from "./NV03Service";
import PopupConfirmComponent from "../../../common/component/PopupConfirmComponent";

const staffBlank = {
  account: "",
  password: "",
  fullname: "",
  mobile: "",
  birthday: "",
  email: "",
};

const NV03 = ({ param, handleClose, handleDismiss }) => {
  //---------------------------------------------------------------------------------------------------
  const [staff, setStaff] = useState(staffBlank);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopupConfirm, setShowPopupConfirm] = useState(false);

  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetchStaff(param.account);
  }, []);

  const fetchStaff = async (account) => {
    try {
      const response = await httpRequest.post(`/nv/nv03/get-staff-account`, {
        account,
      });
      setStaff((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const valueChangeStaff = (prop, value) => {
    setStaff((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const handleSaveStaff = async () => {
    const messageValidateSaveStaff = NV03Service.validateSaveStaff(staff);
    if (messageValidateSaveStaff.trim()) {
      ToastService.showToast(messageValidateSaveStaff, "W");
      return;
    }
    try {
      const response = await httpRequest.post(
        `/nv/nv03/save-staff-account`,
        staff
      );
      handleClose();
      ToastService.showToast(
        `Đã chỉnh sửa thành công nhân viên ${response.data.fullname} có account là ${response.data.account}`,
        "S"
      );
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const handleDeleteStaff = async () => {
    setShowPopupConfirm((prev) => true);
  };

  const handlePopDeleteStaffConfirm = async () => {
    try {
      const response = await httpRequest.post(`/nv/nv03/delete-staff-account`, {
        account: staff.account,
        fullname: staff.fullname,
      });
      handleClose();
      ToastService.showToast(
        `Đã xóa thành công nhân viên ${response.data.fullname} có account là ${response.data.account}`,
        "S"
      );
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const handlePopDeleteStaffCancel = () => {
    setShowPopupConfirm((prev) => false);
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div
      className={`modal fade show d-block`}
      style={{ background: "rgba(0,0,0,0.5)" }}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Thông tin nhân viên</h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleDismiss()}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-6 mb-2">
                <label htmlFor="account" className="form-label m-0">
                  Mã nhân viên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  disabled
                  value={staff?.account}
                />
              </div>
              <div className="col-6 mb-2">
                <div className="d-flex justify-content-between">
                  <label htmlFor="password" className="form-label m-0">
                    Password <span className="text-danger">*</span>
                  </label>
                  <Link onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="far fa-eye"></i>
                    )}
                  </Link>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={staff?.password}
                  onInput={(e) => valueChangeStaff("password", e.target.value)}
                />
              </div>
              <div className="col-6 mb-2">
                <label htmlFor="fullname" className="form-label m-0">
                  Họ tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  disabled
                  value={staff?.fullname}
                />
              </div>
              <div className="col-6 mb-2">
                <label htmlFor="mobile" className="form-label m-0">
                  Số điện thoại <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  value={staff?.mobile}
                  onInput={(e) => valueChangeStaff("mobile", e.target.value)}
                />
              </div>
              <div className="col-6 mb-2">
                <label htmlFor="birthday" className="form-label m-0">
                  Ngày sinh
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="birthday"
                  value={staff?.birthday}
                  onInput={(e) => valueChangeStaff("birthday", e.target.value)}
                />
              </div>
              <div className="col-6 mb-2">
                <label htmlFor="email" className="form-label m-0">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={staff?.email}
                  onInput={(e) => valueChangeStaff("email", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSaveStaff()}
            >
              <i className="far fa-save"></i> Lưu
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteStaff()}
            >
              <i className="fas fa-trash"></i> Xóa
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleDismiss()}
            >
              <i className="fas fa-ban"></i> Hủy
            </button>
          </div>
        </div>
      </div>
      {showPopupConfirm && (
        <PopupConfirmComponent
          title={"Xác nhận xóa"}
          content={`Bạn có chắc muốn xóa nhân viên ${staff.fullname} có account ${staff.account}`}
          handleConfirm={handlePopDeleteStaffConfirm}
          handleCancel={handlePopDeleteStaffCancel}
        />
      )}
    </div>
  );
};

export default NV03;
