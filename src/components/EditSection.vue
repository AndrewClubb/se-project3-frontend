<!-- Basically tutorial.vue = View Course -->
<template>
  <div v-if="currentSection" class="edit-form">
    <h4>Section Edit</h4>
    <form>
      <div class="form-group">
        <strong>Course Name: </strong><br/>
        <span v-html="course.name"></span><br/><br/>
      </div>
      <div class="form-group">
        <strong>Course Number: </strong><br/>
        <span v-html="course.number"></span><br/><br/>
      </div>

      <v-row justify="space-around">
        <strong>Start Time: </strong><br/>
        <!-- You can aparently do both time pickers with a v-for loop -->
        <!-- See https://www.reddit.com/r/vuejs/comments/aqr9kj/vuetfiy_date_picker_inside_a_dialog_when_clicked/ -->
        <v-dialog
        ref="startTimePicker"
        v-model="modal1"
        :return-value.sync="newStartTime"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="newStartTime"
              label="Picker in dialog"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal1"
            v-model="newStartTime"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal1 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startTimePicker.save(newStartTime)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <strong>End Time: </strong><br/>
        <v-dialog
          ref="endTimePicker"
          v-model="modal2"
          :return-value.sync="newEndTime"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newEndTime"
              label="Picker in dialog"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal2"
            v-model="newEndTime"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal2 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.endTimePicker.save(newEndTime)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-row>

      <v-col justify="space-around">
        <strong>Start Date: </strong><br/>
        
        <v-menu
          ref="startDateMenu"
          v-model="startDateMenu"
          :close-on-content-click="false"
          :return-value.sync="newStartDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newStartDate"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newStartDate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="startDateMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startDateMenu.save(newStartDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <!-- <v-date-picker
          v-model="sectionTime.startDate"
        ></v-date-picker> -->
        <strong>End Date: </strong><br/>
        <v-menu
          ref="endDateMenu"
          v-model="endDateMenu"
          :close-on-content-click="false"
          :return-value.sync="newEndDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newEndDate"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newEndDate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="endDateMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.endDateMenu.save(newEndDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <!-- <v-date-picker
          v-model="sectionTime.endDate"
        ></v-date-picker> -->
      </v-col>
      <div class="form-group">
        <button
          class="m-3 btn btn-sm btn-danger"
          type="button"
          @click="deleteSection()"
        >
          Delete
        </button>
      </div>

      <button
        type="submit"
        class="m-3 btn btn-sm btn-danger"
        @click="updateSection()"
      >
        Update
      </button>
    </form>

    <p>{{ message }}</p>
  </div>
  <!-- <div v-else>
      <br />
      <p>Please click on a Course...</p>
    </div> -->
</template>
<script>
import SectionDataService from "../services/SectionDataService";
import SectionTimeDataService from "../services/SectionTimeDataService";
import CourseDataService from "../services/CourseDataService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "section",
  data() {
    return {
      currentSection: null,
      message: "",
      section: null,
      sectionTime: null,
      course: null,
      faculty: null,
      room: null,
      activeWeekdays: [],
      newStartTime: null,
      newEndTime: null,
      newStartDate: null,
      newEndDate: null,
      startDateMenu: false, // for the date picker
      endDateMenu: false, // for the date picker
      modal1: false, // for the time picker
      modal2: false, // for the time picker
    };
  },
  methods: {
    async getSection(id) {
      await SectionDataService.get(id)
        .then((response) => {
          this.currentSection = response.data;
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getSectionTime(id) {
      await SectionTimeDataService.get(id)
        .then((response) => {
          this.sectionTime = response.data;
          let sectionTime = response.data;

              // load up which weekdays have classes for this section
          if (sectionTime.sunday == 1)
            this.activeWeekdays[0] = 1;
          if (sectionTime.monday == 1)
            this.activeWeekdays[1] = 1;
          if (sectionTime.tuesday == 1)
            this.activeWeekdays[2] = 1;
          if (sectionTime.wednesday == 1)
            this.activeWeekdays[3] = 1;
          if (sectionTime.thursday == 1)
            this.activeWeekdays[4] = 1;
          if (sectionTime.friday == 1)
            this.activeWeekdays[5] = 1;
          if (sectionTime.saturday == 1)
            this.activeWeekdays[6] = 1;

          this.newStartTime = sectionTime.startTime;
          this.newEndTime = sectionTime.endTime;
          this.newStartDate = sectionTime.startDate;
          this.newEndDate = sectionTime.endDate;

          
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getCourse(id) {
      await CourseDataService.get(id)
        .then((response) => {
          this.course = response.data;
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentSection.id,
        number: this.number,
        courseId: this.courseId,
        semesterId: this.semesterId,
        published: status,
      };
      SectionDataService.update(this.currentSection.id, data)
        .then((response) => {
          this.currentSection.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveSections() {
      SectionDataService.getAll()
        .then((response) => {
          this.courses = response.data;
          this.filteredSections = this.sections;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateSection() {
      SectionDataService.update(this.currentSection.id, this.currentSection)
        .then((response) => {
          console.log(response.data);
          this.retrieveSections();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteSection() {
      SectionDataService.delete(this.currentSection.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "sections" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },
  async beforeMount() {
    this.message = "";
    await this.getSectionTime(this.$route.params.id);
    await this.getSection(this.sectionTime.sectionId);
    await this.getCourse(this.currentSection.courseId);

  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
