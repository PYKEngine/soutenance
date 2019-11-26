import { http } from "./HttpService";

class MessageService {
  static getMessagesByUserId() {
    return http().get("/messages");
  }

  static sendMessage(request) {
    return http().post(`/messages/${request.id}`, request);
  }
}

export default MessageService;
