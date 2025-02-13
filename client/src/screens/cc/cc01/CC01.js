import { useEffect, useState } from "react";
import ToastService from "../../../common/service/ToastService";
import httpRequest from "../../../request/httpRequest";
import { Link } from "react-router-dom";

const searchDefault = "";

const CC01 = () => {
  //---------------------------------------------------------------------------------------------------
  const [search, setSearch] = useState(searchDefault);
  const [listDish, setListDish] = useState([]);

  //---------------------------------------------------------------------------------------------------
  const searchValueChange = (value) => {
    setSearch((prev) => value);
  };

  useEffect(() => {
    getAllDish();
  }, []);

  const getAllDish = async () => {
    try {
      const response = await httpRequest.post(`/cc/cc01/get-all-dish`, {
        search,
      });
      setListDish((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0 p-4">
        <div>
          <input
            value={search}
            onInput={(e) => searchValueChange(e.target.value)}
            type="text"
            class="form-control"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <div className="bg-light rounded mx-0 p-4 mt-2">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Thành phần chính</th>
              <th scope="col">Loại</th>
            </tr>
          </thead>
          <tbody>
            {listDish
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.mainIngre.toLowerCase().includes(search.toLowerCase()) ||
                  item.cat.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, idx) => (
                <tr>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <Link
                      className="text-decoration-none"
                      to={`/cc/cc02/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td>{item.mainIngre}</td>
                  <td>{item.cat}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CC01;
