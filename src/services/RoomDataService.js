import http from "../http-common";
class RoomDataService {
  // getAll() {
  //   return http.get("/schedule-t2/course");
  // }
  get(id) {
    return http.get(`/schedule-t2/room/${id}`);
  }
  // create(data) {
  //   return http.post("/schedule-t2", data);
  // }
  // update(id, data) {
  //   return http.put(`/schedule-t2/course/${id}`, data);
  // }
  // delete(id) {
  //   return http.delete(`/schedule-t2/course/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/schedule-t2`);
  // }
}
export default new RoomDataService();
