import React, { useState } from "react";

import { toast } from "react-toastify";
import Select from "react-select";
import ReactQuill from "react-quill";

import {
  formatsDefault,
  modulesDefault,
} from "../../../common/service/QuillService";
import ChartComponent from "../../../common/component/ChartComponent";
import * as FileService from "../../../common/service/FileService";

import AAAComponent from "./AAAComponent";
import ToastService from "../../../common/service/ToastService";

const AA01 = () => {
  // -----------DEFINE PARAMS-----------
  const [textEditor, setTextEditor] = useState("");
  const [base64String, setBase64String] = useState("");

  const chartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Biểu đồ",
        data: [3500, 6000, 4000, 2900, 7000],
        backgroundColor: "#009CFF33",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // -----------PAGE INITIAL-----------

  // -----------EVENT-----------
  const showToast = (type, content) => {
    toast[type](content, {});
  };

  // -----------UPDATE DATABASE-----------
  return (
    <div>
      <AAAComponent></AAAComponent>
      {/* -----START TOAST----- */}
      <div>
        <h1>Toast</h1>
        <ul>
          <li>
            <button onClick={() => showToast("success", "Toast success")}>
              Show toast Success
            </button>
          </li>
          <li>
            <button onClick={() => showToast("error", "Toast error")}>
              Show toast error
            </button>
          </li>
          <li>
            <button onClick={() => showToast("warning", "Toast warning")}>
              Show toast warning
            </button>
          </li>
          <li>
            <button onClick={() => showToast("info", "Toast info")}>
              Show toast info
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                ToastService.showToast("0001", ["aaaaaaaaaaaaaaaaa"])
              }
            >
              Show toast info In config
            </button>
          </li>
        </ul>
      </div>
      {/* -----END TOAST----- */}

      {/* -----START REACT SELECT----- */}
      {/* REFER https://react-select.com */}
      <div>
        <h1>SELECT</h1>
        <Select
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
        />
      </div>
      {/* -----END REACT SELECT----- */}

      {/* -----START TEXT EDITOR----- */}
      <div>
        <h1>TEXT EDITOR</h1>
        <ReactQuill
          value={textEditor}
          onChange={(e) => setTextEditor(e)}
          theme="snow"
          modules={modulesDefault}
          formats={formatsDefault}
          bounds=".app" //Optionally set a boundary for the editor
          placeholder="Write something..."
        />
      </div>
      {/* -----END TEXT EDITOR----- */}

      {/* -----START CHART----- */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "33.33%" }}>
          <h1>BAR CHART</h1>
          <ChartComponent
            type={"bar"}
            data={chartData}
            options={chartOptions}
            style={{ padding: "20px" }}
          />
        </div>
        <div style={{ width: "33.33%" }}>
          <h1>LINE CHART</h1>
          <ChartComponent
            type={"line"}
            data={chartData}
            options={chartOptions}
            style={{ padding: "20px" }}
          />
        </div>
        <div style={{ width: "33.33%" }}>
          <h1>PIE CHART</h1>
          <ChartComponent
            type={"pie"}
            data={chartData}
            options={chartOptions}
            style={{ padding: "20px" }}
          />
        </div>
      </div>
      {/* -----END CHART----- */}

      {/* -----START FILE----- */}
      <div>
        <h1>FILE</h1>
        <div>
          <input
            type="file"
            onChange={(e) =>
              FileService.convertFileToBase64(e.target.files[0], (result) =>
                setBase64String(result)
              )
            }
          />
          <button
            onClick={() =>
              FileService.downloadBase64File(base64String, "fileName")
            }
          >
            dowload file
          </button>
        </div>
        <textarea value={base64String} rows={10} cols={150} readOnly />
      </div>
      {/* -----END FILE----- */}
    </div>
  );
};

export default AA01;
