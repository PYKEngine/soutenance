<template>
  <div class="network">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Network</h1>
        <div v-if="!me.network.length">
          You have nobody yet in your network,
          <router-link class="text-primary" to="/members">try to find a member</router-link>
        </div>
        <div v-else>
          <div v-for="u in me.network" :key="u.id" class="post bg-white p-1 my-1">
            <div v-if="u.state === 'pending'">
              <p class="lead">
                <i class="fas fa-user-add"></i>
                Pending requests
              </p>
              <div>
                <router-link v-bind:to="`/profile/user/${u.user}`">
                  <img class="round-img" :src="`https:${u.avatar}`" alt />
                  <h4 style="color:#731f65">{{u.name}}</h4>
                </router-link>
              </div>
              <div>
                <button @click="acceptRequest(u._id)" type="button my-1" class="btn btn-light">
                  <i class="fas fa-user-check"></i>
                  <span>Accept request</span>
                </button>
                <button @click="rejectRequest(u._id)" type="button my-1" class="btn btn-light">
                  <i class="fas fa-user-times"></i>
                  <span>Decline request</span>
                </button>
                <router-link class="btn btn-primary my-1" v-bind:to="`/profile/user/${u.user}`">
                  <i class="fas fa-user"></i>
                  <span>See profile</span>
                </router-link>
              </div>
            </div>
            <div v-else>
              <p class="lead">
                <i class="fas fa-user-add"></i>
                {{u.name}}
              </p>
              <div>
                <router-link v-bind:to="`/profile/user/${u.user}`">
                  <img class="round-img" :src="`https:${u.avatar}`" alt />
                </router-link>
              </div>
              <div>
                <button @click="rejectRequest(u._id)" type="button" class="btn btn-light">
                  <i class="fas fa-user-times"></i>
                  <span>Remove from my network</span>
                </button>
                <button @click="createMessage(u.user)" class="btn btn-light">
                  <i class="fas fa-envelope"></i>
                  <span>Send a message</span>
                </button>
                <router-link class="btn btn-primary" v-bind:to="`/profile/user/${u.user}`">
                  <i class="fas fa-user"></i>
                  <span>See profile</span>
                </router-link>
              </div>
            </div>
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

export default {
  name: "network",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      me: []
    };
  },
  beforeRouteEnter(to, from, next) {
    UserService.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
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
    acceptRequest: async function(id) {
      await UserService.acceptNetworkRequest(id);
      this.$router.go();
    },
    rejectRequest: async function(id) {
      await UserService.deleteNetworkRequest(id);
      this.$router.go();
    }
  }
};
</script>
