import React from "react";

const PopupConfirmComponent = ({
  title,
  content,
  handleConfirm,
  handleCancel,
}) => {
  //---------------------------------------------------------------------------------------------------
  return (
    <div
      className={`modal fade show d-block`}
      style={{ background: "rgba(0,0,0,0.5)" }}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title}</h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleCancel()}
            ></button>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleConfirm()}
            >
              <i className="far fa-check-circle"></i> Xác Nhận
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleCancel()}
            >
              <i className="fas fa-ban"></i> Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmComponent;
