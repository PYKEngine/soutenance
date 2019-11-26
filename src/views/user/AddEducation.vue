<template>
  <div class="dashboard">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">
          <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
          you have attended
        </p>
        <small>* = required field</small>
        <form class="form">
          <div class="form-group">
            <input
              v-model="education.school"
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="education.degree"
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="education.fieldofstudy"
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input v-model="education.from" type="date" name="from" />
          </div>
          <div class="form-group">
            <p>
              <input v-model="education.current" type="checkbox" name="current" value /> Current School or Bootcamp
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input v-model="education.to" type="date" name="to" />
          </div>
          <div class="form-group">
            <textarea
              v-model="education.description"
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
            ></textarea>
          </div>
          <button @click="addEducation" type="submit" class="btn btn-primary my-1">Add education</button>
          <router-link class="btn btn-light my-1" to="/dashboard">Go Back</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import UserServices from "../../services/UserServices";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Sidebar
  },
  data: () => {
    return {
      error: null,
      education: {
        school: null,
        degree: null,
        fieldofstudy: null,
        from: null,
        to: null,
        current: null,
        description: null
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    UserServices.getUserProfile().then(res => {
      next(vm => {
        vm.education = res.data;
      });
    });
  },
  async created() {
    try {
      await UserServices.getUserProfile();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    addEducation() {
      UserServices.editProfileEdu(this.education, res => {
        if (res.status !== 200) {
          this.error = res.data;
        } else {
          this.$router.push({ name: "profile" });
        }
      });
    }
  }
};
</script>
