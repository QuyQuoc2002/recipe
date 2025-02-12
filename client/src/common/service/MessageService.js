import config from "../../config";

const MessageService = {
  getMessage: (messageCd) =>
    config.messages.find((item) => item.messageCd === messageCd),
  replaceParam: (content, params) => {
    if (params.length === 0) {
      return content;
    } else {
      for (let i = 0; i < params.length; i++) {
        content = content.replace("{" + i + "}", params[i]);
      }
      return content;
    }
  },
};

export default MessageService;
