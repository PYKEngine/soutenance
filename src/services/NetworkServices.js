import { http } from "./HttpService";

class NetworkServices {
  static sendNetworkRequest(id) {
    return http().post(`/network/${id}`);
  }
}

export default NetworkServices;
