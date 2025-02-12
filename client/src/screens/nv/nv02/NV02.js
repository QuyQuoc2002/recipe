import React, { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import httpRequest from "../../../request/httpRequest";
import ToastService from "../../../common/service/ToastService";
import NV02Service from "./NV02Service";

const staffBlank = {
  fullname: "",
  mobile: "",
  birthday: "",
  email: "",
};

const NV02 = ({ handleClose, handleDismiss }) => {
  //---------------------------------------------------------------------------------------------------
  const [staff, setStaff] = useState(staffBlank);

  //---------------------------------------------------------------------------------------------------

  const valueChangeStaff = (prop, value) => {
    setStaff((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const handleAddStaff = async () => {
    const messageValidateAddStaff = NV02Service.validateAddStaff(staff);
    if (messageValidateAddStaff.trim()) {
      ToastService.showToast(messageValidateAddStaff, "W");
      return;
    }
    try {
      const response = await httpRequest.post(`/nv/nv02/add-staff`, staff);
      handleClose();
      ToastService.showToast(
        `Đã thêm ${response.data.fullname} có account là ${response.data.account}`,
        "S"
      );
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
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
            <h1 className="modal-title fs-5">Thêm nhân viên</h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleDismiss()}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-6 mb-2">
                <label htmlFor="fullname" className="form-label m-0">
                  Họ tên <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  value={staff.fullname}
                  onInput={(e) => valueChangeStaff("fullname", e.target.value)}
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
                  value={staff.mobile}
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
                  value={staff.birthday}
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
                  value={staff.email}
                  onInput={(e) => valueChangeStaff("email", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleAddStaff()}
            >
              <i className="fas fa-plus"></i> Thêm
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
    </div>
  );
};

export default NV02;
