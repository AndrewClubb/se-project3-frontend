<template>
    <div>
        <div> 
          <form>
            <label>Select Session: </label>
            <select @change="changeDisplayedSession">
              <option selected value="Term One">Term One</option>
              <option value="Term Two">Term Two</option>
            </select>
          </form>
          <p>{{today}}</p>  
        </div>
        <v-row>
        <v-col>
            <v-sheet height="650">
              <v-calendar
                  ref="calendar"
                  :now="today"
                  :value="today"
                  :events="events"
                  color="primary"
                  type="week"
                  min-weeks="5"
                  :end="calEnd"
                  @click:event="showEvent"
              ></v-calendar>

              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    :color="selectedEvent.color"
                    dark
                  >
                    <v-btn icon :href="'/courses/' + selectedEvent.courseId">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- Include this button if the user is a section head -->
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.number"></span><br/>
                    <span v-html="selectedEvent.faculty"></span><br/>
                    <span v-html="selectedEvent.room"></span><br/>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="secondary"
                      @click="selectedOpen = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>

            </v-sheet>
        </v-col>
        </v-row>
    </div>
</template>

<script>
    import SectionDataService from "../services/SectionDataService";
    import SectionTimeDataService from "../services/SectionTimeDataService";
    import CourseDataService from "../services/CourseDataService";
    import FacultyDataService from "../services/FacultyDataService";
    import FacultySectionDataService from "../services/FacultySectionDataService";
    import RoomDataService from "../services/RoomDataService";
    export default {
      data: () => ({
        today: '2023-01-08',
        calEnd: "2023-04-27", // ending date of the last session
        termOne: '2023-01-08', // placeholder first session start
        termTwo: '2023-03-05', // placeholder second session start
        displayedTerm: "Term One",
        sections: [],
        sectionTimes: [],
        courses: [],
        faculty: [],
        facultySection: [],
        rooms: [],
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
      }),
      mounted () {
        this.$refs.calendar.scrollToTime('08:00')
      },
      async beforeMount() {
        await this.getSections();
        // console.log(this.events)
      },
      methods: {
        showEvent ({ nativeEvent, event }) {
          const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => this.selectedOpen = true, 10)
          }

          if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
          } else {
            open()
          }

          nativeEvent.stopPropagation()
        },
        addDays(date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        },
        async getSections() {
          await SectionDataService.getAll()
            .then(async response => {
              this.sections = response.data;
              await this.getSectionTimes(); // grab sectionTimes
              await this.getCourses();
              await this.getFactulty();
              await this.getFactultySection();
              await this.getRooms();
              // map sectionTimes to sections
              for (let i = 0; i < this.sections.length; i++){
                this.createEvent(this.sections[i]);
              }
              

              // Change this for the filter
              // this.filteredCourses = this.courses
              
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getSectionTimes() {
          await SectionTimeDataService.getAll()
            .then(response => {
              this.sectionTimes = response.data;
              // Change this for the filter
              // this.filteredCourses = this.courses
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getCourses() {
          await CourseDataService.getAll()
            .then(response => {
              this.courses = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getFactulty() {
          await FacultyDataService.getAll()
            .then(response => {
              this.faculty = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getFactultySection() {
          await FacultySectionDataService.getAll()
            .then(response => {
              this.facultySection = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getRooms() {
          await RoomDataService.getAll()
            .then(response => {
              this.rooms = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        },
        // Map sectionTimes to sections and add a new event.
        // If the section is a full semester, 2 events will
        // be created, one for each section time.
        createEvent(section) {
          for (let i = 0; i < this.sectionTimes.length; i++){
            let sectionTime = this.sectionTimes[i];

            if (section.id == sectionTime.sectionId) 
            {
              // find the course name
              // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
              let relevantCourse = this.courses.find( course => course.id == section.courseId);
              let name = relevantCourse.name;
              let courseId = relevantCourse.id;

              // find the faculty in charge of the  
              // grab facultySections, find facultySection with sectionId, find relevant faculty
              let relevantFacultySection = this.facultySection.find( facultySection => facultySection.sectionId == section.id);
              let faculty = "Not found";
              if (relevantFacultySection != undefined && relevantFacultySection.facultyId != undefined && relevantFacultySection.facultyId != null){
                let relevantFaculty = this.faculty.find( faculty => faculty.id == relevantFacultySection.facultyId);
                faculty = relevantFaculty.fName + " " + relevantFaculty.lName;
              } 
              

              // find the room number
              let relevantRoom = this.rooms.find(room => room.id == sectionTime.roomId);
              let room = relevantRoom.number;

              // used for temporary filtering
              // let courseNumber = relevantCourse.number;

              let activeWeekdays = [];
              // load up which weekdays have classes for this section
              if (sectionTime.sunday == 1)
                activeWeekdays[0] = 1;
              if (sectionTime.monday == 1)
                activeWeekdays[1] = 1;
              if (sectionTime.tuesday == 1)
                activeWeekdays[2] = 1;
              if (sectionTime.wednesday == 1)
                activeWeekdays[3] = 1;
              if (sectionTime.thursday == 1)
                activeWeekdays[4] = 1;
              if (sectionTime.friday == 1)
                activeWeekdays[5] = 1;
              if (sectionTime.saturday == 1)
                activeWeekdays[6] = 1;
              
              // the date for the start of the week
              let currentDay = new Date(sectionTime.startDate);
              if (currentDay < new Date(this.termOne))
                currentDay = this.addDays(currentDay, 7);
              else
                currentDay;
              
              let validBothTerms = false;
              let termTwoCurrentDay = new Date(this.termTwo);
              if (new Date(sectionTime.endDate) > new Date(this.termTwo)){
                validBothTerms = true;
              }

              for (let i = 0; i < activeWeekdays.length; i++){
                let readableCurrentDay = currentDay.toISOString().slice(0, 10);
                if (activeWeekdays[i] == 1){
                  let tempEvent = {
                    name: name,
                    start: readableCurrentDay + " " + sectionTime.startTime,
                    end: readableCurrentDay + " " + sectionTime.endTime,
                    number: relevantCourse.number,
                    faculty: "Faculty: " + faculty,
                    room: "Room: " + room,
                    courseId: courseId,
                  }

                  // temporary filtering
                  // if (courseNumber.includes("NURS"))
                  this.events.push(tempEvent);

                  let termTworReadableCurrentDay = termTwoCurrentDay.toISOString().slice(0, 10)
                  // if their data hasn't passed, then include courses in both first and second term
                  if (validBothTerms) {
                    let tempEvent = {
                      name: name,
                      start: termTworReadableCurrentDay + " " + sectionTime.startTime,
                      end: termTworReadableCurrentDay + " " + sectionTime.endTime,
                      number: relevantCourse.number,
                      faculty: "Faculty: " + faculty,
                      room: "Room: " + room,
                      courseId: courseId,
                    }
                    
                    this.events.push(tempEvent);
                  }
                }
                
                currentDay = this.addDays(currentDay, 1);
                termTwoCurrentDay = this.addDays(termTwoCurrentDay, 1);
              }
            }
          }
        },
        changeDisplayedSession() {
          if (this.displayedTerm == "Term One"){
            this.today = this.termTwo;
            this.displayedTerm = "Term Two";
          }
          else{
            this.today = this.termOne;
            this.displayedTerm = "Term One";
          }
        },
      }
    }
</script>