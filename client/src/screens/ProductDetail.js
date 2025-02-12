import { useEffect, useState } from "react";
import FileService from "../common/service/FileService";
import ReactQuill from "react-quill";
import { formatsDefault, modulesDefault } from "../common/service/QuillService";
import Select from "react-select";
import { useParams } from "react-router-dom";
import httpRequest from "../request/httpRequest";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [defaultProduct, setDefaultProduct] = useState({});

  const fetchData = async () => {
    try {
      const response = await httpRequest.get(
        `/api/client/product/${productId}`
      );
      setProduct((prev) => response.data);
      setDefaultProduct((prev) => response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
      }
    }
    try {
      const response = await httpRequest.get(`/api/client/productCategory`);
      setCategoryList((prev) => response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [productId]);

  const onThumbnailChange = (e) => {
    FileService.convertFileToBase64(e.target.files[0], (result) =>
      valueChangeProduct("productThumbnail", result)
    );
  };

  const onImgDetailChange = (e) => {
    const files = Array.from(e.target.files); // Chuyển FileList thành một mảng
    const promises = files.map((file) => {
      // Sử dụng Promise để xử lý bất đồng bộ
      return new Promise((resolve) => {
        FileService.convertFileToBase64(file, (result) => {
          resolve(result); // Khi chuyển đổi hoàn tất, resolve promise với kết quả
        });
      });
    });

    Promise.all(promises).then((results) => {
      // Khi tất cả các file đều đã được chuyển đổi
      // setProduct((prev) => [...prev, ...results]); // Cập nhật state với mảng mới của các base64 strings
      setProduct((prev) => ({
        ...prev,
        productImgDetail: [...prev.productImgDetail, ...results],
      }));
    });
  };

  const onRemoveImages = (idx) => {
    setProduct((prev) => ({
      ...prev,
      productImgDetail: prev.productImgDetail.filter(
        (_, index) => index !== idx
      ),
    }));
  };

  const valueChangeProduct = (prop, value) => {
    setProduct((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const onDiscardChanges = () => {
    setProduct(defaultProduct);
  };

  const onChangeSelectCategory = (e) => {
    setProduct((prev) => ({
      ...prev,
      productCategory: e.map((item) => ({
        _id: item.value,
        productCategoryName: item.label,
      })),
    }));
  };

  const onSaveProduct = async () => {
    try {
      const response = await httpRequest.put(
        `/api/client/product/${productId}`,
        product
      );
      toast.success("Update Success fully");
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 404) {
      }
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <h2 className="mb-4 text-primary">PRODUCT DETAIL</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Name
                  </label>
                  <input
                    class="form-control"
                    value={product.productName}
                    onInput={(e) =>
                      valueChangeProduct("productName", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Slug
                  </label>
                  <input
                    className="form-control"
                    value={product.productSlug}
                    onInput={(e) =>
                      valueChangeProduct("productSlug", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Price
                  </label>
                  <input className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Discount
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    value={product.productDiscount}
                    onInput={(e) =>
                      valueChangeProduct("productDiscount", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Category
                  </label>
                  <Select
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={product?.productCategory?.map((item) => ({
                      value: item._id,
                      label: item.productCategoryName,
                    }))}
                    options={categoryList?.map((item) => ({
                      value: item._id,
                      label: item.productCategoryName,
                    }))}
                    onChange={(e) => onChangeSelectCategory(e)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Video youtube URL
                  </label>
                  <input
                    className="form-control"
                    value={product.productVideo}
                    onInput={(e) =>
                      valueChangeProduct("productVideo", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product How to
                  </label>
                  {/* <textarea
                   className="form-control"
                    rows={3}
                    value={product.productHowTo}
                    onInput={(e) =>
                      valueChangeProduct("productHowTo", e.target.value)
                    }
                  ></textarea> */}

                  <ReactQuill
                    value={product.productHowTo}
                    onChange={(e) => valueChangeProduct("productHowTo", e)}
                    theme="snow"
                    modules={modulesDefault}
                    formats={formatsDefault}
                    bounds=".app" //Optionally set a boundary for the editor
                    placeholder="Write something..."
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Overview
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={product.productOverview}
                    onInput={(e) =>
                      valueChangeProduct("productOverview", e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Product thumbnail</label>
                  <input
                    className="form-control mb-2"
                    type="file"
                    onChange={(e) => onThumbnailChange(e)}
                  />
                  {product?.productThumbnail && (
                    <div className="w-100" style={{ border: "2px solid #ddd" }}>
                      <img
                        className="w-100"
                        src={product?.productThumbnail}
                        alt="Thumbnail"
                      />
                    </div>
                  )}
                </div>
                <div className=" col-md-9 mb-3">
                  <label for="formFileMultiple" className="form-label">
                    Product Img Detail
                  </label>
                  <input
                    className="form-control mb-2"
                    type="file"
                    multiple
                    onChange={(e) => onImgDetailChange(e)}
                  />
                  {product?.productImgDetail?.length !== 0 && (
                    <div
                      className="product-image-detail-container-wrapper"
                      style={{ border: "2px solid #ddd" }}
                    >
                      {product?.productImgDetail?.map((item, idx) => (
                        <div
                          key={idx}
                          className="product-image-detail-container position-relative"
                          style={{ border: "2px solid #ddd" }}
                        >
                          <img src={item} alt="Thumbnail" />
                          <button
                            type="button"
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              border: "none",
                              background: "rgba(255, 0, 0, 0.7)", // Màu nền đỏ nhạt với độ trong suốt
                              color: "white",
                              borderRadius: "50%", // Làm tròn nút
                              cursor: "pointer",
                              width: "25px", // Kích thước nút
                              height: "25px", // Kích thước nút
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              onRemoveImages(idx);
                            }}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label mb-0 text-primary fw-bold text-uppercase">
                    Product Description
                  </label>
                  <ReactQuill
                    value={product.productDesc}
                    onChange={(e) => valueChangeProduct("productDesc", e)}
                    theme="snow"
                    modules={modulesDefault}
                    formats={formatsDefault}
                    bounds=".app" //Optionally set a boundary for the editor
                    placeholder="Write something..."
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <button
                    type="button"
                    className="w-100 btn btn-primary"
                    onClick={() => onSaveProduct()}
                  >
                    SAVE
                  </button>
                </div>
                <div className="col-md-6 mb-3">
                  <button
                    type="button"
                    className="w-100 btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    DISCARD CHANGES
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Confirm dialog
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure discard your changes</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => onDiscardChanges()}
                data-bs-dismiss="modal"
              >
                DISCARD
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
