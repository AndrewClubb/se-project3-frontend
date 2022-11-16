import http from "./services.js";
class CourseDataService {
  getAll() {
    return http.get("/schedule-t2/course");
  }
  get(id) {
    return http.get(`/schedule-t2/course/${id}`);
  }
  create(data) {
    return http.post("/schedule-t2/course", data);
  }
  update(id, data) {
    return http.put(`/schedule-t2/course/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t2/course/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t2/course`);
  }
}
export default new CourseDataService();
