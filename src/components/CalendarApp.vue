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
        today: '2023-01-08',
        calEnd: "2023-04-27", // ending date of the last session
        termOne: '2023-01-08', // placeholder first session start
        termTwo: '2023-03-05', // placeholder second session start
        displayedTerm: "Term One",
        sections: [],
        sectionTimes: [],
        courses: [],
        selectedEvent: {},
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
                    // figure out how to do multiple week days
                    // find a function to get the next X weekday from a date.
                    // have a loop to iterate through the weekdays in sectionTime and make 
                    // and event for each one that is valid
                    start: readableCurrentDay + " " + sectionTime.startTime,
                    end: readableCurrentDay + " " + sectionTime.endTime
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
                      end: termTworReadableCurrentDay + " " + sectionTime.endTime
                    }
                    
                    this.events.push(tempEvent);
                  }
                }
                
                currentDay = this.addDays(currentDay, 1);
                termTwoCurrentDay = this.addDays(termTwoCurrentDay, 1);
              }

          }
        });
        },
        changeDisplayedSession() {
          if (this.displayedTerm == "Term One"){
            this.today = this.termTwo;
            this.displayedTerm = "Term Two";
            console.log("Term 2");
          }
          else{
            this.today = this.termOne;
            this.displayedTerm = "Term One";
            console.log("Term 1");
          }
        },
        showEvent (event) {
          console.log(event.date);
        },
      }
    }
</script>