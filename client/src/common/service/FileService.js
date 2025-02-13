import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const downloadBase64File = (
  base64String,
  fileName,
  msgSuccess = "Download file Success",
  msgError = "Download file Erorr"
) => {
  try {
    const encodedString = base64String.split(",")[1];
    const mimeType = base64String.split(";")[0].slice(5);
    const byteCharacters = atob(encodedString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(msgSuccess);
  } catch (error) {
    toast.error(msgError);
  }
};

/**
 * Convert file to base 64 string
 * @param {*} file
 */
export const convertFileToBase64 = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Kích thước 4x3 (400x300 px có thể chỉnh)
      const targetWidth = 1920;
      const targetHeight = 1080;

      // Tính toán giữ nguyên tỷ lệ
      const scale = Math.max(
        targetWidth / img.width,
        targetHeight / img.height
      );
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Xóa nền và vẽ lại hình ảnh
      ctx.fillStyle = "white"; // Có thể đổi màu nền
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(
        img,
        (targetWidth - newWidth) / 2,
        (targetHeight - newHeight) / 2,
        newWidth,
        newHeight
      );

      // Convert về Base64
      const base64String = canvas.toDataURL("image/jpeg"); // Định dạng có thể là "image/png"
      callback(base64String);
    };
  };

  reader.readAsDataURL(file);
};

export const downloadFile = ({ base64String, fileName, mimeType }) => {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const createExcelFile = (header, data, fileName) => {
  let dataSheet = [];
  dataSheet.push(header);
  dataSheet.push(...data);
  const workbook = XLSX.utils.book_new();
  // Add a worksheet to the workbook
  let worksheet = XLSX.utils.aoa_to_sheet(dataSheet);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convert the workbook to base64
  const base64String = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "base64",
  });
  return {
    base64String: base64String,
    fileName: fileName,
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
};
