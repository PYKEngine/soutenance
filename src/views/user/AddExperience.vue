<template>
  <div class="dashboard">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form class="form">
          <div class="form-group">
            <input
              v-model="experience.title"
              type="text"
              placeholder="* Job Title"
              name="title"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="experience.company"
              type="text"
              placeholder="* Company"
              name="company"
              required
            />
          </div>
          <div class="form-group">
            <input v-model="experience.location" type="text" placeholder="Location" name="location" />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input v-model="experience.from" type="date" name="from" />
          </div>
          <div class="form-group">
            <p>
              <input v-model="experience.current" type="checkbox" name="current" value /> Current Job
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input v-model="experience.to" type="date" name="to" />
          </div>
          <div class="form-group">
            <textarea
              v-model="experience.description"
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
            ></textarea>
          </div>
          <button @click="addExperience" type="submit" class="btn btn-primary my-1">Add experience</button>
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
  name: "add-experience",
  components: {
    Navbar,
    Sidebar
  },
  data: () => {
    return {
      error: null,
      experience: {
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: "",
        description: ""
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    UserServices.getUserProfile().then(res => {
      next(vm => {
        vm.experience = res.data;
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
    addExperience() {
      UserServices.editProfileExp(this.experience, res => {
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
