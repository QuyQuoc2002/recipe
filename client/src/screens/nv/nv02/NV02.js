import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToastService from "../../../common/service/ToastService";
import httpRequest from "../../../request/httpRequest";

const NV02 = () => {
  //---------------------------------------------------------------------------------------------------
  const [dish, setDish] = useState({});
  const { id } = useParams();

  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    getDish();
  }, []);

  const getDish = async () => {
    try {
      const response = await httpRequest.post(`/nv/nv02/get-dish`, {
        id,
      });
      setDish((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0">
        <div className="row m-auto">
          <div className="col-6 p-0">
            <img className="rounded-start w-100" src={dish?.thumbnail}></img>
          </div>
          <div className="col-6 d-flex align-items-center ">
            <div className="w-100">
              <h2 className="text-primary fw-bold">{dish?.name}</h2>
              <p>{dish?.des}</p>
              <div className="row text-primary">
                <div className="col-3">
                  <div className="bg-info bg-opacity-25 w-100 rounded p-2 d-flex flex-column align-items-center">
                    <i class="fas fa-tasks fs-1 fw-bold"></i>
                    <div className="fs-5 fw-bold">{dish?.cat}</div>
                    <div className="fs-6">Loại</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-info bg-opacity-25 w-100 rounded p-2 d-flex flex-column align-items-center">
                    <i class="fas fa-sort-amount-up fs-1 fw-bold"></i>
                    <div className="fs-5 fw-bold">{dish?.level}</div>
                    <div className="fs-6">Độ Khó</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-info bg-opacity-25 w-100 rounded p-2 d-flex flex-column align-items-center">
                    <i class="far fa-clock fs-1 fw-bold"></i>
                    <div className="fs-5 fw-bold">{dish?.time} Phút</div>
                    <div className="fs-6">Thời gian</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-info bg-opacity-25 w-100 rounded p-2 d-flex flex-column align-items-center">
                    <i class="fas fa-utensils fs-1 fw-bold"></i>
                    <div className="fs-5 fw-bold">{dish?.meth}</div>
                    <div className="fs-6">Chế biến</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-4 pe-1">
          <div className="bg-light rounded p-4">
            <h5 className="text-primary fw-bold">
              Thành phần chính: {dish?.mainIngre}
            </h5>
            <div>
              {dish?.listIngre?.map((item) => (
                <div className="d-flex gap-2">
                  <div>
                    <i class="fas fa-check text-primary"></i>
                  </div>
                  <div>{`${item.quantity} ${item.unit} ${item.name}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-8 ps-1">
          <div className="bg-light rounded p-4">
            <h5 className="text-primary fw-bold">Hướng dẫn</h5>
            {dish?.listStep?.map((item, idx) => (
              <div>
                <div className="text-primary fw-bold">Bước {idx + 1} :</div>
                <div>{item.des}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NV02;
