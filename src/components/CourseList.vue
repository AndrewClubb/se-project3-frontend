<!-- Basically tutorialsList -->
<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course List</v-toolbar-title>
      </v-toolbar>
      <br /><br />
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="courses"
          :items-per-page="10"
          @click:row="rowClick"
        >
        </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            {{ currentCourse.name }}
          </v-card-title>
          <!-- <v-card-title>
            {{ currentCourse.number }}
          </v-card-title>
          <v-card-title>
            {{ currentCourse.description }}
          </v-card-title> -->
          <v-card-text>
            <br />
            <v-text-field
              v-model="currentCourse.number"
              label="Course Number"
              dense
              readonly
            >
            </v-text-field>
            <br />
            <v-textarea
              v-model="currentCourse.description"
              label="Description"
              dense
              readonly
            >
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" @click="dialog = false"> Close </v-btn>
            <!-- <v-btn
              color="accent"
              @click="
                editAppointment();
                apptDialog = false;
              "
            >
              Save Changes
            </v-btn>
            <v-btn
              color="red"
              @click="
                cancelAppointment();
                apptDialog = false;
              "
            >
              Cancel Appointment
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>

  <!-- <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="cName" v-on:keyup.enter="searchBy()"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
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
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(course, index) in filteredCourses"
          :key="index"
          @click="setActiveCourse(course, index)"
        >
          {{ course.name }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCourses">
        Remove All
      </button> -->
  <!-- </div>
    <div class="col-md-6">
      <div v-if="currentCourse">
        <h4>Course</h4>
        <div>
          <label><strong>Department:</strong></label> {{ currentCourse.dept }}
        </div>
        <div>
          <label><strong>Course Number:</strong></label> {{ currentCourse.courseNumber }}
        </div>
        <div>
          <label><strong>Level:</strong></label> {{ currentCourse.level }}
        </div>
        <div>
          <label><strong>Hours:</strong></label> {{ currentCourse.hours }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentCourse.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentCourse.description }}
        </div>
        <button class="m-3 btn btn-sm btn-danger" type="button"
          @click="deleteCourse()"
        >
          Delete
        </button>
        <a class="m-3 btn btn-sm btn-danger"
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
  </div> -->
</template>

<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "course-list",
  data() {
    return {
      dialog: false,
      search: "",
      courses: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Course Number", value: "number" },
        { text: "Description", value: "description" },
      ],
      filteredCourses: [],
      currentCourse: {},
      currentIndex: -1,
      cName: "",
    };
  },
  methods: {
    async retrieveCourses() {
      await CourseDataService.getAll()
        .then((response) => {
          this.courses = response.data;
          this.filteredCourses = this.courses;
          console.log(this.courses);
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
    rowClick: function (item, row) {
      row.select(true);
      this.currentCourse = item;
      this.dialog = true;
    },
  },
  async mounted() {
    await this.retrieveCourses();
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
