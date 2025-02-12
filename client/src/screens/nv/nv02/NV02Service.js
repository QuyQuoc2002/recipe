const regexFullName =
  /^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ\s]+$/;
const regexMobile = /^(0[1-9])[0-9]{8}$/;

const NV02Service = {
  validateAddStaff: ({ fullname, mobile }) => {
    const message = [];

    if (fullname.trim().split(/\s+/).length < 2) {
      message.push("Họ tên cần có tối thiểu 2 từ");
    } else if (!regexFullName.test(fullname)) {
      message.push("Họ tên có chứa kí tự không hợp lệ");
    }

    if (!mobile.trim()) {
      message.push("Vui lòng nhập số điện thoại");
    } else if (!regexMobile.test(mobile)) {
      message.push("Số điện thoại không hợp lệ");
    }

    return message.map((item, idx) => `${idx + 1}. ${item}`).join("\n");
  },
};

export default NV02Service;
