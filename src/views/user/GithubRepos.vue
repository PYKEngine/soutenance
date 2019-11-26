<template>
  <div class="profile">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Github Repositories</h1>
        <div class="profile-grid my-1">
          <!-- Github -->
          <div class="profile-github">
            <h2 class="text-primary my-1">
              <i class="fab fa-github"></i>
              {{repositories[0].owner.login}} Github Repos
            </h2>
            <div v-for="repos in repositories" :key="repos.id" class="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <router-link
                    v-bind:to="`${html_url}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="color:#731f65"
                  >{{repos.full_name}}</router-link>
                  <p
                    class="post-date"
                  >Created at {{repos.created_at}} - Last update at {{repos.updated_at}}</p>
                </h4>
                <p>Size: {{repos.size}}</p>
                <p>Git it: {{repos.git_url}}</p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">Stars: {{repos.stargazers_count}}</li>
                  <li class="badge badge-dark">Watchers: {{repos.watchers}}</li>
                  <li class="badge badge-light">Forks: {{repos.forks_count}}</li>
                </ul>
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
import UserServices from "../../services/UserServices";

export default {
  name: "profile",
  components: {
    Navbar,
    Sidebar
  },
  data: function() {
    return {
      repositories: []
    };
  },
  beforeRouteEnter(to, from, next) {
    UserServices.getGitProfile(to.params.id).then(res => {
      next(vm => {
        vm.repositories = res.data;
      });
    });
  },
  methods: {}
};
</script>