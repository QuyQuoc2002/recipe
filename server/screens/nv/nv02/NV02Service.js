import * as NV02Repository from "./NV02Repository.js";

export const addStaff = async (req, res) => {
  try {
    let { fullname, mobile, birthday, email } = req.body;
    let account;

    fullname = fullname
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const accountOrigin = generateAccount(fullname);
    console.log(accountOrigin);

    const existingAccountsCount = await NV02Repository.findStaffByAccount([
      accountOrigin,
    ]);

    if (existingAccountsCount) account = accountOrigin + existingAccountsCount;
    else account = accountOrigin;

    await NV02Repository.addStaff([
      fullname,
      mobile,
      birthday,
      email,
      account,
      accountOrigin,
    ]);

    return res.status(200).json({ account, fullname });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu tiếng Việt
};

const generateAccount = (fullName) => {
  const words = fullName.split(" ");
  if (words.length < 2) return "";

  const lastName = removeDiacritics(words[words.length - 1]);
  const initials = words
    .slice(0, -1)
    .map((word) => removeDiacritics(word.charAt(0)))
    .join("");

  return `${lastName}${initials}`; // Ghép lại thành tài khoản
};
