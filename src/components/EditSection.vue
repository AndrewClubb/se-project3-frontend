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

      <div class="form-group">
        <strong>Room Number: </strong><br/>
        <input
          type="roomNumber"
          class="form-control"
          id="roomNumber"
          v-model="room.number"
        />
      </div>

      <v-container fluid>
        <strong>Meeting Days for this Section: </strong>
        <!-- <p>{{ selected }}</p> -->
        <v-checkbox
          v-model="selected"
          label="Sunday"
          value="Sunday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Monday"
          value="Monday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Tuesday"
          value="Tuesday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Wednesday"
          value="Wednesday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Thursday"
          value="Thursday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Friday"
          value="Friday"
        ></v-checkbox>
        <v-checkbox
          v-model="selected"
          label="Saturday"
          value="Saturday"
        ></v-checkbox>
      </v-container>
    </v-row>
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
import RoomDataService from "../services/RoomDataService";

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
      // facultySections: [],
      // relevantFacultySections: [],
      // faculty: [],
      // relevantFaculty: [],
      room: null,
      selected: [],
      weekdays: [],
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
          if (sectionTime.sunday == 1){
            this.selected.push("Sunday");
            this.weekdays[0] = 1;
          }
          if (sectionTime.monday == 1){
            this.selected.push("Monday")
            this.weekdays[1] = 1;
          }
          if (sectionTime.tuesday == 1){
            this.selected.push("Tuesday")  
            this.weekdays[2] = 1;
          }
          if (sectionTime.wednesday == 1){
            this.selected.push("Wednesday")
            this.weekdays[3] = 1;
          }
          if (sectionTime.thursday == 1){
            this.selected.push("Thursday")
            this.weekdays[4] = 1;
          }
          if (sectionTime.friday == 1){
            this.selected.push("Friday")
            this.weekdays[5] = 1;
          }
          if (sectionTime.saturday == 1){
            this.selected.push("Saturday")
            this.weekdays[6] = 1;
          }
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
    async getRoom(id) {
      await RoomDataService.get(id)
        .then((response) => {
          this.room = response.data;
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // async getFaculty() {
    //   await FacultyDataService.get()
    //     .then((response) => {
    //       this.faculty = response.data;

    //       for (let i = 0; i < this.faculty.length; i++){
    //         for (let j = 0; j < this.relevantFacultySections.length; j++){
    //           if (this.faculty[i].facultyId == this.relevantFacultySections[j]){
    //             this.relevantFaculty.push(this.faculty[i])
    //           }
    //         }
    //       }

    //       // console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // async getFacultySections() {
    //   await FacultySectionDataService.get()
    //     .then((response) => {
    //       this.facultySections = response.data;

    //       for (let i = 0; i < this.facultySections.length; i++){
    //         console.out(this.facultySections[i]);
    //         if (this.facultySections[i].sectionId == this.sectionId){
    //           this.relevantFacultySections.push(this.facultySections[i]);
    //         }
    //       }
    //       // console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
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
      
      var updatedObject = {
        startTime: this.newStartTime,
        endTime: this.newEndTime,
        startDate: this.newStartDate,
        endDate: this.newEndDate,
        sunday: this.weekdays[0],
        monday: this.weekdays[1],
        tuesday: this.weekdays[2],
        wednesday: this.weekdays[3],
        thursday: this.weekdays[4],
        friday: this.weekdays[5],
        saturday: this.weekdays[6],
        roomNumber: this.room.number
      } 

      
      SectionTimeDataService.update(this.sectionTime.id, updatedObject)
        .then((response) => {
          console.log(response.data);
          // this.retrieveSections();

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
    await this.getRoom(this.sectionTime.roomId);
    // await this.getFacultySections();
    // await this.getFaculty();
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
