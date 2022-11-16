import apiClient from "@/services/services.js";

export default {
  loginUser(user) {
    return apiClient.post("schedule-t2/google/login", user);
  },
  logoutUser(token) {
    return apiClient.post("schedule-t2/google/logout", token);
  },
};
