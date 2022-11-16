<!-- Basically tutorial.vue = View Course -->
<template>
    <div v-if="currentCourse" class="edit-form">
      <h4>Course</h4>
      <form>
        <div class="form-group">
            <label for="dept">Department</label>
            <input type="text" 
            class="form-control" 
            id="dept" 
            v-model="currentCourse.dept"/>
        </div>
        <div class="form-group">
            <label for="courseNumber">Course Number</label>
            <input
            type="text"
            class="form-control"
            id="courseNumber"
            v-model="currentCourse.number"
            />
        </div>
        <div class="form-group">
            <label for="level">Level</label>
            <input
            type="text"
            class="form-control"
            id="level"
            v-model="currentCourse.level"
            />
        </div>
        <div class="form-group">
            <label for="hours">Hours</label>
            <input
            type="text"
            class="form-control"
            id="hours"
            v-model="currentCourse.hours"
            />
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input
            type="text"
            class="form-control"
            id="name"
            v-model="currentCourse.name"
            />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input
            type="text"
            class="form-control"
            id="description"
            v-model="currentCourse.description"
            />
        </div>
        <div class="form-group">
          <button class="m-3 btn btn-sm btn-danger" type="button"
        @click="deleteCourse()"
      >
        Delete
      </button>
        </div>
        
      <button type="submit" class="m-3 btn btn-sm btn-danger" 
        @click="updateCourse()"
      >
        Update
      </button>
      </form>
      
      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Course...</p>
    </div>
</template>
  <script>
  import CourseDataService from "../services/CourseDataService";
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "course",
    data() {
      return {
        currentCourse: null,
        message: ''
      };
    },
    methods: {
      getCourse(id) {
        CourseDataService.get(id)
          .then(response => {
            this.currentCourse = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      updatePublished(status) {
        var data = {
          id: this.currentCourse.id,
          dept: this.currentCourse.dept,
          courseNumber: this.currentCourse.courseNumber,
          level: this.currentCourse.level,
          hours: this.currentCourse.hours,
          name: this.currentCourse.name,
          description: this.currentCourse.description,
          published: status
        };
        CourseDataService.update(this.currentCourse.id, data)
          .then(response => {
            this.currentCourse.published = status;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveCourses() {
      CourseDataService.getAll()
        .then(response => {
          this.courses = response.data;
          this.filteredCourses = this.courses
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
      updateCourse() {
        CourseDataService.update(this.currentCourse.id, this.currentCourse)
          .then(response => {
            console.log(response.data);
            this.retrieveCourses(); 
          })
          .catch(e => {
            console.log(e);
          });
      },
      deleteCourse() {
        CourseDataService.delete(this.currentCourse.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "courses" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getCourse(this.$route.params.id);
    }
  };
  </script>
  <style>
   .edit-form {
    max-width: 300px;
    margin: auto;
   }
  </style>