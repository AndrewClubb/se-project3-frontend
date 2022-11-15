<template>
    <div>
        <div> 
          <form>
            <label>Select Session: </label>
            <select @change="changeDisplayedSession">
              <option selected value="First Session">First Session</option>
              <option value="Second Session">Second Session</option>
            </select>
          </form>  
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
            </v-sheet>
        </v-col>
        </v-row>
    </div>
</template>

<script>
    import SectionDataService from "../services/SectionDataService";
    import SectionTimeDataService from "../services/SectionTimeDataService";
    import CourseDataService from "../services/CourseDataService";
    export default {
      data: () => ({
        today: '2023-01-08', // placeholder same as first session
        calEnd: "2023-04-27", // ending date of the last session
        sessionOne: '2023-01-08', // placeholder first session start
        sessionTwo: '2023-03-06', // placeholder second session start
        displayedSession: "First Session",
        sections: [],
        sectionTimes: [],
        courses: [],
        selectedEvent: {},
        selectedOpen: false,
        events: [ // example events 
          {
            name: 'Weekly Meeting',
            start: '2019-01-07 9:00', 
            // start: {
            //   date: '2019-01-07',
            //   time: '09:00',
            // },
            end: '2019-01-07 10:00',
          },
          {
            name: `Thomas' Birthday`,
            start: '2019-01-10',
          },
          {
            name: 'Mash Potatoes',
            start: '2019-01-09 12:30',
            end: '2019-01-09 15:30',
          },
          {
            name: "Second Weekly Meeting",
            start: "2019-07-10 12:30",
            end: "2019-07-10 15:00"
          },
          {
            name: "Some other event",
            start: "2019-07-07 12:30",
            end: "2019-07-07 15:00"
          }
        ],
      }),
      mounted () {
        this.$refs.calendar.scrollToTime('08:00')
      },
      async beforeMount() {
        await this.getSections();
        // console.log(this.events)
      },
      methods: {
        async getSections() {
          await SectionDataService.getAll()
            .then(async response => {
              this.sections = response.data;
              await this.getSectionTimes(); // grab sectionTimes
              await this.getCourses();
              // map sectionTimes to sections
              this.sections.forEach(this.createEvent)
              
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
        // Map sectionTimes to sections and add a new event.
        // If the section is a full semester, 2 events will
        // be created, one for each section time.
        createEvent(section) {
          
          this.sectionTimes.forEach( sectionTime => {
            if (section.id == sectionTime.sectionId) 
            {
              // find the course name
              // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
              let relevantCourse = this.courses.find( course => course.id == section.courseId);
              let name = relevantCourse.name;
              // console.log(name)
              // create the event object and add it to the list
              let tempEvent = {
                name: name,
                // figure out how to do multiple week days
                // find a function to get the next X weekday from a date.
                // have a loop to iterate through the weekdays in sectionTime and make 
                // and event for each one that is valid
                start: sectionTime.startDate + " " + sectionTime.startTime,
                end: sectionTime.startDate + " " + sectionTime.endTime
              }
              // console.log(tempEvent);
              this.events.push(tempEvent);
              // add a test to see if the section is in both first and second session
              // add another event if it is, but with the end date
              // if (sectionTime.)
            }
          });
          // for (let i = 0; i < this.sectionTimes.length; i++){
          //   if (section.id == this.sectionTimes[i].sectionId)
          //   {
          //     // find the course name
          //     // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
          //     let relevantCourse = this.courses.find( course => course.id == section.courseId);
          //     let name = relevantCourse.name;
          //     // console.log(name)
          //     // create the event object and add it to the list
          //     let sectionTime = this.sectionTimes[i];
          //     let tempEvent = {
          //       name: name,
          //       // figure out how to do multiple week days
          //       start: sectionTime.startDate + " " + sectionTime.startTime,
          //       end: sectionTime.startDate + " " + sectionTime.endTime
          //     }
          //     // console.log(tempEvent);
          //     this.events.push(tempEvent);
          //     // add a test to see if the section is in both first and second session
          //     // add another event if it is, but with the end date
          //     // if (sectionTime.)
          //   }  
          // }
        },
        // createCalEvents() {
        //   this.sections.forEach(this.createCalEvent);
        // },
        // createCalEvent(event) {
        //   this.events.push({
        //     name: event.name
        //   });
        // },
        changeDisplayedSession() {
          if (this.displayedSession == "First Session"){
            this.today = this.sessionTwo;
            this.displayedSession = "Second Session";
          }
          else{
            this.today = this.sessionOne;
            this.displayedSession = "First Session";
          }
        },
        showEvent (event) {
          console.log(event.date);
        },
      }
    }
</script>

<style scoped>
    .my-event {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 2px;
      background-color: #1867c0;
      color: #ffffff;
      border: 1px solid #1867c0;
      font-size: 12px;
      padding: 3px;
      cursor: pointer;
      margin-bottom: 1px;
      left: 4px;
      margin-right: 8px;
      position: relative;
    }
    
    .my-event.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
</style>