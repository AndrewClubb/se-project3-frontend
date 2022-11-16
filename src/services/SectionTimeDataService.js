import http from "./services.js";
class SessionDataService {
  getAll() {
    return http.get("/schedule-t2/sectionTime");
  }
  get(id) {
    return http.get(`/schedule-t2/sectionTime/${id}`);
  }
  create(data) {
    return http.post("/schedule-t2/sectionTime", data);
  }
  update(id, data) {
    return http.put(`/schedule-t2/sectionTime/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t2/sectionTime/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t2/sectionTime`);
  }
}
export default new SessionDataService();
