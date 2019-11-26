<template>
  <div class="profile">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <div class="profile-grid my-1">
          <!-- Top -->
          <div class="profile-top bg-primary p-2">
            <img class="round-img my-1" v-bind:src="`http:${me.user.avatar}`" alt />
            <h1 class="large">{{me.user.name}}</h1>
            <p class="lead">{{me.status}}</p>
            <p>{{me.location}}</p>
            <div class="icons my-1">
              <a
                v-if="me.website"
                v-bind:href="me.website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fas fa-globe fa-2x"></i>
              </a>
              <a
                v-if="me.social.twitter"
                v-bind:href="me.social.twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-twitter fa-2x"></i>
              </a>
              <a
                v-if="me.social.facebook"
                v-bind:href="me.social.facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-facebook fa-2x"></i>
              </a>
              <a
                v-if="me.social.linkedin"
                v-bind:href="me.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-linkedin fa-2x"></i>
              </a>
              <a
                v-if="me.social.youtube"
                v-bind:href="me.social.youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-youtube fa-2x"></i>
              </a>
              <a
                v-if="me.githubusername"
                v-bind:href="`https://github.com/${me.githubusername}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-github fa-2x"></i>
              </a>
            </div>
          </div>
          <!-- About -->
          <div class="profile-about bg-light p-2">
            <h2 class="text-primary">My Bio</h2>
            <p>{{me.bio}}</p>
            <div class="line"></div>
            <h2 class="text-primary">My Skill Set</h2>
            <div class="skills">
              <div v-for="skill in me.skills" :key="skill.id" class="p-1">
                <i class="fas fa-check"></i>
                {{skill}}
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div class="profile-exp bg-white p-2">
            <h2 class="text-primary">My Experience</h2>
            <div v-for="exp in me.experience" :key="exp.id">
              <h3 class="text-dark">{{exp.company}}</h3>
              <div v-if="exp.current">
                <p>{{exp.from}} - Current</p>
              </div>
              <div v-else>
                <p>{{exp.from}} - {{exp.to}}</p>
              </div>
              <p>
                <strong>Position:</strong>
                {{exp.title}}
              </p>
              <p>
                <strong>Description:</strong>
                {{exp.description}}
              </p>
            </div>
          </div>

          <!-- Education -->
          <div class="profile-edu bg-white p-2">
            <h2 class="text-primary">My Education</h2>
            <div v-for="edu in me.education" :key="edu.id">
              <h3>{{edu.school}}</h3>
              <p>{{edu.from}} - {{edu.to}}</p>
              <p>
                <strong>Degree:</strong>
                {{edu.degree}}
              </p>
              <p>
                <strong>Field Of Study:</strong>
                {{edu.fieldofstudy}}
              </p>
              <p>
                <strong>Description:</strong>
                {{edu.description}}
              </p>
            </div>
          </div>
          <!-- Github -->
          <div v-if="me.githubusername" class="profile-github">
            <router-link v-bind:to="`/profile/github/${me.githubusername}`">
              <h2 class="text-primary my-1">
                <i class="fab fa-github"></i>
                See {{me.githubusername}} Github Repos
              </h2>
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
// import GitRepos from "@/components/GithubRepos.vue";
import * as userService from "../../services/UserService";

export default {
  name: "profile",
  components: {
    Navbar,
    Sidebar
    // GitRepos
  },
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
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    userService.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
      });
    });
  },
  methods: {}
};
</script>