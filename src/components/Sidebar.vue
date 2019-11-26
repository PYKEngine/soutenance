<template>
  <div class="sidebar">
    <div class="sidebar-profile">
      <router-link to="/profile/me">
        <img class="sidebar-img" :src="`https:${me.data.user.avatar}`" alt />
        <h1 class="sidebar-username">{{ me.data.user.name }}</h1>
      </router-link>
      <p class="sidebar-title">{{ me.data.status }}</p>
      <p class="sidebar-location">{{ me.data.location }}</p>
      <div class="sidebar-icons">
        <i v-if="me.data.website" class="fas fa-globe"></i>
        <i v-if="me.data.social.twitter" class="fab fa-twitter"></i>
        <i v-if="me.data.social.facebook" class="fab fa-facebook-f"></i>
        <i v-if="me.data.social.linkedin" class="fab fa-linkedin-in"></i>
        <i v-if="me.data.social.youtube" class="fab fa-youtube"></i>
        <i v-if="me.data.githubusername" class="fab fa-github"></i>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/messages">Messages</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/network">Network</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserServices from "../services/UserServices";

export default {
  name: "sidebar",
  data: function() {
    return {
      me: {
        data: {
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
        }
      },
      error: null
    };
  },
  components: {},
  async created() {
    try {
      this.me = await UserServices.getUserProfile();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {}
};
</script>
