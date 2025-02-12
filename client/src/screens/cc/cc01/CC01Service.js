const CC01Service = {
  validateCheckInOut: ({ account, password }) => {
    const message = [];

    if (!account.trim()) {
      message.push("Vui lòng nhập mã nhân viên");
    }

    if (!password.trim()) {
      message.push("Vui lòng nhập password");
    }

    return message.map((item, idx) => `${idx + 1}. ${item}`).join("\n");
  },
};

export default CC01Service;
