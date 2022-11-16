import http from "./services";
class CourseDataService {
  getAll() {
    return http.get("/schedule-t2/course");
  }
  get(id) {
    return http.get(`/schedule-t2/course/${id}`);
  }
  create(data) {
    return http.post("/schedule-t2", data);
  }
  update(id, data) {
    return http.put(`/schedule-t2/course/${id}`, data);
  }
  delete(id) {
    return http.delete(`/schedule-t2/course/${id}`);
  }
  deleteAll() {
    return http.delete(`/schedule-t2`);
  }
}
export default new CourseDataService();
