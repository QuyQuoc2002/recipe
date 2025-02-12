import { useEffect, useState } from "react";
import Select from "react-select";
import ToastService from "../../../common/service/ToastService";
import httpRequest from "../../../request/httpRequest";
import { Link } from "react-router-dom";

const filterDefault = {
  levelId: null,
  catId: null,
  methId: null,
};

const listFilterDefault = {
  level: null,
  cat: null,
  meth: null,
};

const searchDefault = "";

const NV01 = () => {
  //---------------------------------------------------------------------------------------------------
  const [listDish, setListDish] = useState([]);
  const [listFilter, setListFilter] = useState(listFilterDefault);
  const [filter, setFilter] = useState(filterDefault);
  const [search, setSearch] = useState(searchDefault);

  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    getAllDish();
    getAllFilter();
  }, []);

  const getAllDish = async () => {
    try {
      const response = await httpRequest.post(`/nv/nv01/get-all-dish`, {
        search,
      });
      setListDish((prev) => response.data);
      setFilter((prev) => filterDefault);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const getAllFilter = async () => {
    try {
      const response = await httpRequest.post(`/nv/nv01/get-all-filter`, {});
      setListFilter((prev) => response.data);
    } catch (error) {
      console.log(error);
      ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
    }
  };

  const valueChangeFilter = (prop, value) => {
    setFilter((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const searchValueChange = (value) => {
    setSearch((prev) => value);
  };

  const handleCancelFilter = () => {
    setFilter((prev) => filterDefault);
  };

  const handleSearch = () => {
    getAllDish();
  };

  //---------------------------------------------------------------------------------------------------
  return (
    <div className="container-fluid pt-2 px-2">
      <div className="bg-light rounded mx-0 p-4">
        <div className="row">
          <div className="col-11 ">
            <input
              value={search}
              onInput={(e) => searchValueChange(e.target.value)}
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
            />
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => handleSearch()}
            >
              <i className="fas fa-search"></i> Tìm
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-3 pe-1">
          <div className="bg-light rounded p-4">
            <button
              className="btn btn-secondary w-100"
              onClick={handleCancelFilter}
            >
              Hủy bộ lọc
            </button>
            <hr></hr>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {listFilter?.level?.map((item) => (
                <div key={item.id}>
                  <input
                    type="radio"
                    name="level"
                    class="btn-check"
                    id={`level${item.id}`}
                    value={item.id}
                    onChange={(e) =>
                      valueChangeFilter("levelId", Number(e.target.value))
                    }
                    checked={filter.levelId === item.id}
                  />
                  <label
                    class="btn btn-outline-primary"
                    htmlFor={`level${item.id}`}
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <hr></hr>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {listFilter?.cat?.map((item) => (
                <div className="">
                  <input
                    type="radio"
                    name="cat"
                    class="btn-check"
                    id={`cat${item.id}`}
                    value={item.id}
                    onChange={(e) =>
                      valueChangeFilter("catId", Number(e.target.value))
                    }
                    checked={filter.catId === item.id}
                  />
                  <label
                    class="btn btn-outline-primary"
                    htmlFor={`cat${item.id}`}
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <hr></hr>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {listFilter?.meth?.map((item) => (
                <div className="">
                  <input
                    type="radio"
                    name="cametht"
                    class="btn-check"
                    id={`meth${item.id}`}
                    value={item.id}
                    onChange={(e) =>
                      valueChangeFilter("methId", Number(e.target.value))
                    }
                    checked={filter.methId === item.id}
                  />
                  <label
                    class="btn btn-outline-primary"
                    htmlFor={`meth${item.id}`}
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <hr></hr>
            <div>
              <Select
                className="border border-primary rounded text-primary"
                isMulti
                placeholder="Nguyên liệu..."
                options={[
                  { value: "chocolate", label: "Chocolate" },
                  { value: "strawberry", label: "Strawberry" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-9 ps-1">
          <div className="bg-light rounded p-4">
            <div className="row ">
              {listDish
                ?.filter(
                  (item) => !filter.levelId || item.levelId === filter.levelId
                )
                ?.filter((item) => !filter.catId || item.catId === filter.catId)
                ?.filter(
                  (item) => !filter.methId || item.methId === filter.methId
                )
                ?.map((dish, idx) => (
                  <div key={idx} className="col-4">
                    <div class="card">
                      <img
                        src={dish.thumbnail}
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <Link
                          className="text-decoration-none"
                          to={`/nv/nv02/${dish.id}`}
                        >
                          <h5
                            class="card-title text-truncate-2"
                            style={{ minHeight: "50px" }}
                          >
                            {dish.name}
                          </h5>
                        </Link>
                        <p
                          className="text-truncate-3"
                          style={{ minHeight: "75px" }}
                        >
                          {dish.des}
                        </p>
                        <div className="d-flex gap-2">
                          <div>
                            <i className="far fa-clock text-primary"></i>{" "}
                            {dish.time} Phút
                          </div>
                          <div>
                            <i className="fas fa-sort-amount-up text-primary"></i>{" "}
                            {dish.level}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NV01;
