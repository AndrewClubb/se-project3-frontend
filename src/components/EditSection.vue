<!-- Basically tutorial.vue = View Course -->
<template>
  <div v-if="currentSection" class="edit-form">
    <h4>Section</h4>
    <form>
      <div class="form-group">
        <label for="number">Section Number</label>
        <input
          type="text"
          class="form-control"
          id="number"
          v-model="currentSection.number"
        />
      </div>
      <div class="form-group">
        <label for="courseId">Course Id</label>
        <input
          type="text"
          class="form-control"
          id="courseId"
          v-model="currentSection.courseId"
        />
      </div>
      <div class="form-group">
        <label for="semesterId">Semester Id</label>
        <input
          type="semesterId"
          class="form-control"
          id="semesterId"
          v-model="currentSection.semesterId"
        />
      </div>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "section",
  data() {
    return {
      currentSection: null,
      message: "",
    };
  },
  methods: {
    getSection(id) {
      SectionDataService.get(id)
        .then((response) => {
          this.currentSection = response.data;
          console.log(response.data);
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
  mounted() {
    this.message = "";
    this.getSection(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
