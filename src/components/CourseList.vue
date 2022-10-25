<!-- Basically tutorialsList -->
<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="cName"
          v-on:keyup.enter="searchBy()"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchBy()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Course List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(course, index) in filteredCourses"
          :key="index"
          @click="setActiveCourse(course, index)"
        >
          {{ course.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCourse">
        <h4>Course</h4>
        <div>
          <label><strong>Course Number:</strong></label>
          {{ currentCourse.courseNumber }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentCourse.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentCourse.description }}
        </div>
        <div>
          <label><strong>Hours:</strong></label> {{ currentCourse.hours }}
        </div>
        <div>
          <label><strong>Level:</strong></label> {{ currentCourse.level }}
        </div>
        <button
          class="m-3 btn btn-sm btn-danger"
          type="button"
          @click="deleteCourse()"
        >
          Delete
        </button>
        <a
          class="m-3 btn btn-sm btn-danger"
          :href="'/courses/' + currentCourse.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Course...</p>
      </div>
    </div>
  </div>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "course-list",
  data() {
    return {
      courses: [],
      filteredCourses: [],
      currentCourse: null,
      currentIndex: -1,
      cName: "",
    };
  },
  methods: {
    retrieveCourses() {
      CourseDataService.getAll()
        .then((response) => {
          this.courses = response.data;
          this.filteredCourses = this.courses;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveCourses();
      this.currentCourse = null;
      this.currentIndex = -1;
    },
    setActiveCourse(course, index) {
      this.currentCourse = course;
      this.currentIndex = index;
    },
    removeAllCourses() {
      CourseDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchBy() {
      this.filteredCourses = this.courses.filter(
        (course) =>
          course.name.includes(this.cName) ||
          course.dept.includes(this.cName) ||
          course.courseNumber.includes(this.cName)
      );
    },
    deleteCourse() {
      CourseDataService.delete(this.currentCourse.id)
        .then((response) => {
          console.log(response.data);
          this.currentCourse = null;
          this.retrieveCourses();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveCourses();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
