import http from "../http-common";
class CourseDataService {
  getAll() {
    return http.get("/course-t3");
  }
  get(id) {
    return http.get(`/course-t3/id/${id}`);
  }
  create(data) {
    return http.post("/course-t3", data);
  }
  update(id, data) {
    return http.put(`/course-t3/${id}`, data);
  }
  delete(id) {
    return http.delete(`/course-t3/${id}`);
  }
  deleteAll() {
    return http.delete(`/course-t3`);
  }
}
export default new CourseDataService();