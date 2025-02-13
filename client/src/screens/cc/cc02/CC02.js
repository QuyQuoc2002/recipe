import { useEffect, useState } from "react";
import ToastService from "../../../common/service/ToastService";
import httpRequest from "../../../request/httpRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import * as FileService from "../../../common/service/FileService";
import CC02Service from "./CC02Service";
import PopupConfirmComponent from "../../../common/component/PopupConfirmComponent";

const infoInitDefault = {
  level: [],
  cat: [],
  meth: [],
  mainIngre: [],
  ingre: [],
};

const dishDefault = {
  id: null,
  name: "",
  mainIngreId: null,
  mainIngre: null,
  des: "",
  thumbnail: null,
  time: 0,
  levelId: null,
  level: null,
  catId: null,
  cat: null,
  methId: null,
  meth: null,
  ingre: [{ ingreId: null, quantity: "" }],
  step: [{ des: "" }],
};

const CC02 = () => {
  //---------------------------------------------------------------------------------------------------
  const [infoInit, setInfoInit] = useState(infoInitDefault);
  const [dish, setDish] = useState(dishDefault);
  const { id } = useParams();
  const [showPopupConfirm, setShowPopupConfirm] = useState(false);
  const navigate = useNavigate();

  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    getInfoInit();
    getDish();
  }, []);

  const getDish = async () => {
    try {
      const response = await httpRequest.post(`/cc/cc02/get-dish`, { id });
      setDish(response.data);
    } catch (error) {
      console.error(error);
      ToastService.showToast("Lỗi hệ thống, liên hệ nhà phát triển", "E");
    }
  };

  const getInfoInit = async () => {
    try {
      const response = await httpRequest.post(`/cc/cc02/get-info-init`);
      setInfoInit(response.data);
    } catch (error) {
      console.error(error);
      ToastService.showToast("Lỗi hệ thống, liên hệ nhà phát triển", "E");
    }
  };

  const valueChangeDish = (prop, value) => {
    setDish((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const handleImageChange = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    FileService.convertFileToBase64(file, (base64String) => {
      valueChangeDish("thumbnail", base64String);
    });
  };

  const handleAddIngredient = () => {
    setDish((prev) => ({
      ...prev,
      ingre: [...prev.ingre, { ingreId: null, quantity: "" }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setDish((prev) => {
      const updatedIngre = prev.ingre.filter((_, idx) => idx !== index);
      return { ...prev, ingre: [...updatedIngre] };
    });
  };

  const handleUpdateIngredient = (index, field, value) => {
    setDish((prev) => {
      const updatedIngre = [...prev.ingre];
      updatedIngre[index][field] = value;
      return { ...prev, ingre: updatedIngre };
    });
  };

  const handleAddStep = () => {
    setDish((prev) => ({
      ...prev,
      step: [...prev.step, { des: "" }],
    }));
  };

  const handleRemoveStep = (index) => {
    setDish((prev) => ({
      ...prev,
      step: prev.step.filter((_, idx) => idx !== index),
    }));
  };

  const handleUpdateStep = (index, value) => {
    setDish((prev) => {
      const updatedSteps = [...prev.step];
      updatedSteps[index].des = value;
      return { ...prev, step: updatedSteps };
    });
  };

  const handleSaveDish = async () => {
    const saveDish = {
      ...dish,
      ingre: dish.ingre.filter((item) => !!item?.ingreId && !!item?.quantity),
      step: dish.step.filter((item) => !!item?.des?.trim()),
    };
    const messageSaveDish = CC02Service.messageSaveDish(saveDish);
    if (messageSaveDish.trim()) {
      ToastService.showToast(messageSaveDish, "W");
      return;
    }
    try {
      const response = await httpRequest.post(`/cc/cc02/save-dish`, saveDish);
      ToastService.showToast("Lưu món ăn thành công", "S");
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const handleDeleteDish = async () => {
    setShowPopupConfirm((prev) => true);
  };

  const handlePopDeleteDishConfirm = async () => {
    try {
      const response = await httpRequest.post(`/cc/cc02/delete-dish`, { id });
      ToastService.showToast("Đã xóa món ăn", "S");
      navigate("/cc/cc01");
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const handlePopDeleteDishCancel = () => {
    setShowPopupConfirm((prev) => false);
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0">
        <div className="row m-auto">
          <div className="col-6 p-2">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
            {dish?.thumbnail && (
              <img
                className="rounded"
                alt="Thumbnail Preview"
                style={{ marginTop: "10px", maxWidth: "100%" }}
                src={dish?.thumbnail}
              />
            )}
          </div>
          <div className="col-6">
            <div className="d-flex flex-column gap-2 mt-2">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Tên món ăn"
                value={dish.name}
                onChange={(e) => valueChangeDish("name", e.target.value)}
              />
              <Select
                className="border rounded"
                placeholder="Thành phần chính"
                isClearable
                value={{ value: dish?.mainIngreId, label: dish?.mainIngre }}
                options={
                  infoInit.mainIngre?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []
                }
                onChange={(option) => {
                  valueChangeDish("mainIngreId", option?.value || null);
                  valueChangeDish("mainIngre", option?.label || null);
                }}
              />
              <textarea
                className="form-control"
                rows="3"
                placeholder="Mô tả chung về món ăn"
                value={dish.des}
                onChange={(e) => valueChangeDish("des", e.target.value)}
              ></textarea>
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Thời gian nấu (phút)</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Thời gian nấu"
                    value={dish.time}
                    onChange={(e) =>
                      valueChangeDish("time", Number(e.target.value))
                    }
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Độ khó</label>
                  <Select
                    className="border rounded"
                    placeholder="Độ khó"
                    isSearchable={false}
                    value={{ value: dish?.levelId, label: dish?.level }}
                    options={
                      infoInit.level?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onChange={(option) => {
                      valueChangeDish("levelId", option?.value || null);
                      valueChangeDish("level", option?.label || null);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Loại</label>
                  <Select
                    className="border rounded"
                    placeholder="Loại"
                    isSearchable={false}
                    value={{ value: dish?.catId, label: dish?.cat }}
                    options={
                      infoInit.cat?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onChange={(option) => {
                      valueChangeDish("catId", option?.value || null);
                      valueChangeDish("cat", option?.label || null);
                    }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Cách chế biến</label>
                  <Select
                    className="border rounded"
                    placeholder="Cách chế biến"
                    isSearchable={false}
                    value={{ value: dish?.methId, label: dish?.meth }}
                    options={
                      infoInit.meth?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onChange={(option) => {
                      valueChangeDish("methId", option?.value || null);
                      valueChangeDish("meth", option?.label || null);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={handleSaveDish}
                    type="button"
                    className="btn btn-primary fw-bold w-100"
                  >
                    LƯU THAY ĐỔI
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={handleDeleteDish}
                    type="button"
                    className="btn btn-danger fw-bold w-100"
                  >
                    XÓA MÓN ĂN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-4 pe-1">
          <div className="bg-light rounded p-2">
            <h5 className="text-primary fw-bold">Nguyên liệu</h5>
            <hr />
            {dish.ingre.map((item, idx) => (
              <div className="row">
                <div className="col-8">
                  <Select
                    className="border rounded"
                    placeholder="Nguyên liệu (đơn vị)"
                    isClearable
                    options={
                      infoInit.ingre?.map((ing) => ({
                        value: ing.id,
                        label: `${ing.name} (${ing.unit})`,
                      })) || []
                    }
                    value={
                      infoInit.ingre.find((ing) => ing.id === item.ingreId)
                        ? {
                            value: item.ingreId,
                            label: `${
                              infoInit.ingre.find(
                                (ing) => ing.id === item.ingreId
                              ).name
                            } (${
                              infoInit.ingre.find(
                                (ing) => ing.id === item.ingreId
                              ).unit
                            })`,
                          }
                        : null
                    }
                    onChange={(option) =>
                      handleUpdateIngredient(
                        idx,
                        "ingreId",
                        option?.value || null
                      )
                    }
                  />
                </div>
                <div className="col-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="SL"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateIngredient(idx, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="col-1 d-flex align-items-center">
                  {dish.ingre.length > 1 && (
                    <Link
                      onClick={() => handleRemoveIngredient(idx)}
                      className="text-decoration-none"
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <h6>
              <Link
                onClick={handleAddIngredient}
                className="text-decoration-none fw-bold"
              >
                <i className="fas fa-plus"></i> Nguyên liệu
              </Link>
            </h6>
          </div>
        </div>
        <div className="col-8 ps-1">
          <div className="bg-light rounded p-2">
            <h5 className="text-primary fw-bold">Hướng dẫn</h5>
            <hr />
            {dish?.step?.map((item, idx) => (
              <div>
                <div className="text-primary fw-bold">
                  {dish.step.length > 1 && (
                    <Link
                      onClick={() => handleRemoveStep(idx)}
                      className="text-decoration-none"
                    >
                      <i className="fas fa-trash text-danger"></i>
                    </Link>
                  )}{" "}
                  Bước {idx + 1} :
                </div>
                <textarea
                  className="form-control"
                  rows="2"
                  value={item.des}
                  onChange={(e) => handleUpdateStep(idx, e.target.value)}
                ></textarea>
              </div>
            ))}
            <h6>
              <Link
                onClick={handleAddStep}
                className="text-decoration-none fw-bold"
              >
                <i className="fas fa-plus"></i> Bước
              </Link>
            </h6>
          </div>
        </div>
      </div>
      {showPopupConfirm && (
        <PopupConfirmComponent
          title={"Xác nhận xóa"}
          content={`Bạn có chắc muốn xóa món ăn này ?`}
          handleConfirm={handlePopDeleteDishConfirm}
          handleCancel={handlePopDeleteDishCancel}
        />
      )}
    </div>
  );
};

export default CC02;
