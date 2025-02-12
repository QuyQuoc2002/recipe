const AAAComponent = () => {
  return <div>AAAComponent</div>;
};

export default AAAComponent;

// useEffect(() => {
//   fetchStaff(param.account);
// }, []);

// const fetchStaff = async (account) => {
//   try {
//     const response = await httpRequest.post(`/nv/nv03/get-staff-account`, {
//       account,
//     });
//     setStaff((prev) => response.data);
//   } catch (error) {
//     console.log(error);
//     ToastService.showToast("Lỗi hệ thống liện hệ nhà phát triển", "E");
//   }
// };
