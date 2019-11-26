<template>
  <div class="dashboard">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Dashboard</h1>
        <p class="lead">
          <i class="fas fa-user"></i>
          Welcome Admin
        </p>
        <p>{{error}}</p>
        <div class="post bg-white p-1 my-1">
          <p class="lead">
            <i class="fas fa-stream"></i>
            Total posts
          </p>
          <div class="my-1">
            {{data.posts.length}}
            <router-link class="btn btn-primary my-1" to="/wall">
              <span>Go to the wall</span>
            </router-link>
          </div>
        </div>
        <div class="post bg-white p-1 my-1">
          <p class="lead">
            <i class="fas fa-mail-bulk"></i>
            Total messages
          </p>
          <div class="my-1">
            {{data.messages.length}}
            <router-link class="btn btn-primary my-1" to="/wall">
              <span>Manage Messages</span>
            </router-link>
          </div>
        </div>
        <div class="post bg-white p-1 my-1">
          <p class="lead">
            <i class="fas fa-users"></i>
            Total users
          </p>
          <div class="my-1">
            {{data.profiles.length}}
            <router-link class="btn btn-primary my-1" to="/members">
              <span>Go to members</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import * as AdminServices from "../../services/AdminServices";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Sidebar
  },
  data: () => {
    return {
      error: null,
      data: []
    };
  },
  beforeRouteEnter(to, from, next) {
    AdminServices.adminDashboard().then(res => {
      next(vm => {
        vm.data = res.data;
      });
    });
  }
  // async created() {
  //   try {
  //     await UserServices.getUserProfile();
  //   } catch (err) {
  //     this.error = err.message;
  //   }
  // },
  // methods: {
  //   async deleteExp(id) {
  //     await UserServices.deleteProfileExp(id);
  //     this.$router.go();
  //   },
  //   async deleteEdu(id) {
  //     await UserServices.deleteProfileEdu(id);
  //     this.$router.go();
  //   },
  //   async deleteProfile() {
  //     alert("This will erase your profile permanently, Are you sure ?");
  //     await UserServices.deleteProfile();
  //     this.$router.push("/");
  //   }
  // }
};
</script>
