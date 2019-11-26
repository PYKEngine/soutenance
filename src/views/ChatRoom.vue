<template>
  <div name="wall">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Chatroom</h1>
        <p class="lead">
          <i class="fas fa-comments"></i> Let's have a talk {{ me.user.name }}!
          We have {{ users.length }} user(s) connected
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import io from "socket.io-client";
import UserServices from "../services/UserServices";

export default {
  name: "chatroom",
  data: function() {
    return {
      me: {
        social: {
          youtube: null,
          twitter: null,
          facebook: null,
          linkedin: null,
          instagram: null
        },
        skills: [],
        _id: null,
        user: {
          _id: null,
          name: null,
          avatar: null
        },
        __v: null,
        bio: null,
        company: null,
        createdAt: null,
        githubusername: null,
        location: null,
        status: null,
        updatedAt: null,
        website: null,
        education: [
          {
            _id: null,
            school: null,
            degree: null,
            fieldofstudy: null,
            from: null,
            to: null,
            current: null,
            description: null
          }
        ],
        experience: [
          {
            _id: null,
            title: null,
            company: null,
            location: null,
            from: null,
            current: null,
            description: null
          }
        ],
        network: [
          {
            state: null,
            _id: null,
            user: null
          }
        ]
      },
      socket: io("http://localhost:5555"),
      messages: [],
      users: []
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    joinServer: function() {
      this.socket.on("loggedIn", data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newUser", "Kevin");
      });
    }
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    UserServices.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
      });
    });
  }
};
</script>
