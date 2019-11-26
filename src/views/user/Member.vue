<template>
  <div class="members">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Members</h1>
        <div class="profiles">
          <!-- {{users}} -->
          <div v-for="u in users" :key="u.id" class="profiles2 bg-light">
            <router-link v-bind:to="`/profile/user/${u.user._id}`">
              <img class="round-img" :src="`https:${u.user.avatar}`" alt />
            </router-link>
            <div>
              <h2>{{u.user.name}}</h2>
              <p>{{u.status}}</p>
              <p>{{u.location}}</p>
              <button @click="networkRequest(u.user._id)" class="btn btn-light">
                <i class="fas fa-user-plus"></i>
                <span>Add to my network</span>
              </button>
              <router-link
                v-if="u.githubusername"
                v-bind:to="`/profile/github/${u.githubusername}`"
                class="btn btn-light"
              >
                <i class="fab fa-github"></i>
                <span>See Github repos</span>
              </router-link>
              <button @click="createMessage(u.user._id)" class="btn btn-light">
                <i class="fas fa-envelope"></i>
                <span>Send a message</span>
              </button>
              <button
                v-if="$store.state.is_admin"
                @click="deleteUser(u.user._id)"
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <ul>
              <li v-for="(skill, index) in u.skills" :key="index" class="text-primary">
                <i class="fas fa-check"></i>
                {{skill}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MessageModal from "@/components/MessageModal.vue";
import UserService from "../../services/UserServices";
import NetworkServices from "../../services/NetworkServices";
import * as AdminServices from "../../services/AdminServices";

export default {
  name: "get-all-users",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      users: []
    };
  },
  beforeRouteEnter(to, from, next) {
    UserService.getAllUsers().then(res => {
      next(vm => {
        vm.users = res.data;
      });
    });
  },
  methods: {
    show(id) {
      this.$modal.show(
        MessageModal,
        {
          data: id
        },
        { name: "message-modal" },
        { height: "auto" }
      );
    },
    createMessage(id) {
      this.show(id);
    },
    networkRequest: async function(id) {
      await NetworkServices.sendNetworkRequest(id);
      this.$router.go();
    },
    deleteUser: async function(id) {
      alert(`This will erase the profile #${id} permanently, Are you sure ?`);
      await AdminServices.deleteProfile(id);
      this.$router.go();
    }
  }
};
</script>
