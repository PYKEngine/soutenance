<template>
  <div class="dashboard">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Dashboard</h1>
        <p class="lead">
          <i class="fas fa-user"></i>
          Welcome {{me.user.name}}
        </p>
        <p>{{error}}</p>
        <div class="dash-buttons">
          <router-link to="/profile/edit" class="btn btn-light text-primary">
            <i class="fas fa-user-circle text-primary"></i> Edit Profile
          </router-link>
          <router-link to="/profile/add-experience" class="btn btn-light text-primary">
            <i class="fab fa-black-tie text-primary"></i> Add Experience
          </router-link>
          <router-link to="/profile/add-education" class="btn btn-light text-primary">
            <i class="fas fa-graduation-cap text-primary"></i> Add Education
          </router-link>
        </div>
        <h2 class="my-2">Experience Credentials</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Company</th>
              <th class="hide-sm">Title</th>
              <th class="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exp in me.experience" :key="exp.id">
              <td>{{exp.company}}</td>
              <td class="hide-sm">{{exp.title}}</td>
              <td class="hide-sm">
                <div v-if="exp.current">
                  <p>{{exp.from}} - Current</p>
                </div>
                <div v-else>
                  <p>{{exp.from}} - {{exp.to}}</p>
                </div>
              </td>
              <td>
                <a v-on:click.prevent="deleteExp(exp._id)" class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="my-2">Education Credentials</h2>
        <table class="table">
          <thead>
            <tr>
              <th>School</th>
              <th class="hide-sm">Degree</th>
              <th class="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(edu, index) in me.education"
              v-bind:item="edu"
              v-bind:index="index"
              v-bind:key="edu.id"
            >
              <td>{{edu.school}}</td>
              <td class="hide-sm">{{edu.degree}}</td>
              <td class="hide-sm">
                <div v-if="edu.current">
                  <p>{{edu.from}} - Current</p>
                </div>
                <div v-else>
                  <p>{{edu.from}} - {{edu.to}}</p>
                </div>
              </td>
              <td>
                <a v-on:click="deleteEdu(edu._id)" class="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="my-2">
          <button @click="deleteProfile" class="btn btn-danger">
            <i class="fas fa-user-minus"></i>
            Delete My Account
          </button>
        </div>
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
      me: {
        social: {},
        skills: [],
        _id: null,
        user: {
          _id: null,
          name: null,
          avatar: null
        },
        bio: null,
        company: null,
        createdAt: null,
        githubusername: null,
        location: null,
        status: null,
        updatedAt: null,
        website: null,
        education: [],
        experience: [],
        network: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    UserServices.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
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
    async deleteExp(id) {
      await UserServices.deleteProfileExp(id);
      this.$router.go();
    },
    async deleteEdu(id) {
      await UserServices.deleteProfileEdu(id);
      this.$router.go();
    },
    async deleteProfile() {
      alert("This will erase your profile permanently, Are you sure ?");
      await UserServices.deleteProfile();
      this.$router.push("/");
    }
  }
};
</script>
