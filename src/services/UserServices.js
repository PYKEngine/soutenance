import { http } from "./HttpService";

class UserServices {
  static getUserProfile() {
    return http().get("/profile/me");
  }

  static editUserProfile(profile) {
    return http().post("/profile", profile);
  }

  static getAllUsers() {
    return http().get("/profile");
  }

  static deleteProfile() {
    return http().delete("/profile");
  }

  static getUserById(id) {
    return http().get(`/profile/user/${id}`);
  }

  static editProfileExp(profileExp) {
    return http().put("/profile/experience", profileExp);
  }

  static deleteProfileExp(id) {
    return http().delete(`/profile/experience/${id}`);
  }

  static editProfileEdu(profileEdu) {
    return http().put("/profile/education", profileEdu);
  }

  static deleteProfileEdu(id) {
    return http().delete(`/profile/education/${id}`);
  }

  static deleteNetworkRequest(id) {
    return http().delete(`/profile/network/reject/${id}`);
  }

  static acceptNetworkRequest(id) {
    return http().put(`/profile/network/accept/${id}`);
  }

  static getGitProfile(gitUsername) {
    return http().get(`/profile/github/${gitUsername}`);
  }
}

export default UserServices;
