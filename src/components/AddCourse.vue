<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Tutorial Add</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy validation>
        <v-text-field
          v-model="course.name"
          id="name"
          :counter="50"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseNumber"
          id="courseNumber"
          :counter="50"
          label="Course Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.description"
          id="description"
          :counter="50"
          label="Description"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.level"
          id="level"
          :counter="50"
          label="Level"
          required
        ></v-text-field
        ><v-text-field
          v-model="course.hours"
          id="hours"
          :counter="50"
          label="Hours"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.dept"
          id="dept"
          :counter="50"
          label="Department"
          required
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="saveCourse()"
        >
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="cancel()"> Cancel </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import CourseDataService from "../services/CourseDataService";
export default {
  name: "add-course",
  data() {
    return {
      valid: false,
      course: {
        id: null,
        name: "",
        courseNumber: "",
        description: "",
        level: "",
        hours: "",
        dept: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveCourse() {
      var data = {
        name: this.course.name,
        courseNumber: this.course.courseNumber,
        description: this.course.description,
        level: this.course.level,
        hours: this.course.hours,
        dept: this.course.dept,
      };
      CourseDataService.create(data)
        .then((response) => {
          this.course.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "courses" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "calendar" });
    },
    newCourse() {
      this.submitted = false;
      this.course = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
