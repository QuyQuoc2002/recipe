import { toast } from "react-toastify";
import MessageService from "./MessageService";

const ToastService = {
  // showToast: (messageCd, params, toastOptions = {}) => {
  //   const message = MessageService.getMessage(messageCd);
  //   const content = MessageService.replaceParam(message.content, params);
  //   switch (message.type) {
  //     case "S":
  //       toast.success(content, toastOptions);
  //       break;
  //     case "I":
  //       toast.info(content, toastOptions);
  //       break;
  //     case "W":
  //       toast.warning(content, toastOptions);
  //       break;
  //     case "E":
  //       toast.error(content, toastOptions);
  //       break;
  //     default:
  //       toast.error("Code lỗi rồi em", toastOptions);
  //   }
  // },
  showToast: (
    message,
    type,
    toastOptions = { style: { whiteSpace: "pre-line" } }
  ) => {
    if (!message.trim()) return;
    switch (type) {
      case "S":
        toast.success(message, toastOptions);
        break;
      case "I":
        toast.info(message, toastOptions);
        break;
      case "W":
        toast.warning(message, toastOptions);
        break;
      case "E":
        toast.error(message, toastOptions);
        break;
      default:
        toast.error("Code lỗi rồi em", toastOptions);
    }
  },
};

export default ToastService;
