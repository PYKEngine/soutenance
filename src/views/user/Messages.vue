<template>
  <div class="messages">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Messages</h1>
        <div v-if="!messages.length">None in your network yet</div>
        <div v-else>
          <div v-for="m in messages" :key="m.id" class="post bg-white p-1 my-1">
            <div>
              <router-link v-bind:to="`/profile/user/${m.mail.user}`">
                <img class="round-img" :src="`https:${m.mail.avatar}`" alt />
                <h4 style="color:#731f65">{{m.mail.name}}</h4>
              </router-link>
              <button @click="createMessage(m.mail.user)" class="btn btn-light">
                <i class="fas fa-envelope"></i>
                <span>Respond</span>
              </button>
            </div>
            <div>
              <p class="my-1">{{m.mail.text}}</p>
              <p class="post-date">Received on {{m.mail.date}}</p>
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
import MessageService from "../../services/MessageService";

export default {
  name: "get-all-users",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      messages: []
    };
  },
  beforeRouteEnter(to, from, next) {
    MessageService.getMessagesByUserId().then(res => {
      next(vm => {
        vm.messages = res.data;
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
    }
  }
};
</script>
