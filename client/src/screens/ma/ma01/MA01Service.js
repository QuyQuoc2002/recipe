const MA01Service = {
  validateAddDish: ({ name, mainIngreId, time, levelId, catId, methId }) => {
    const message = [];

    if (!name.trim()) {
      message.push("Nhập tên món ăn");
    }

    if (!mainIngreId) {
      message.push("Chọn thành phần chính");
    }

    if (time <= 0) {
      message.push("Nhập thời gian nấu lớn hơn 0");
    }

    if (!levelId) {
      message.push("Chọn độ khó");
    }

    if (!catId) {
      message.push("Chọn loại món ăn");
    }

    if (!methId) {
      message.push("Chọn cách chế biến");
    }

    return message.map((item, idx) => `${idx + 1}. ${item}`).join("\n");
  },
};

export default MA01Service;
