import http from "./services";
class SessionDataService {
  getAll() {
    return http.get("/schedule-t2/section");
  }
  get(id) {
    return http.get(`/schedule-t2/section/${id}`);
  }
  create(data) {
    return http.post("/schedule-t2/section", data);
  }
  update(id, data) {
    return http.put(`/schedule-t2/section/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t2/section/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t2/section/`);
  }
}
export default new SessionDataService();