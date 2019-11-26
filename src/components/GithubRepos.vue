<template>
  <div class="profile-github">
    <h2 class="text-primary my-1">
      <i class="fab fa-github"></i> My Github Repos
    </h2>
    {{githubusername}}
    <div class="repo bg-white p-1 my-1">
      <div>
        <h4>
          <a href="#" target="_blank" rel="noopener noreferrer">Repo One</a>
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, laborum!
        </p>
      </div>
      <div>
        <ul>
          <li class="badge badge-primary">Stars: 44</li>
          <li class="badge badge-dark">Watchers: 21</li>
          <li class="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
    <div class="repo bg-white p-1 my-1">
      <div>
        <h4>
          <a href="#" target="_blank" rel="noopener noreferrer">Repo Two</a>
        </h4>
        <p>{{githubusername}}</p>
      </div>
      <div>
        <ul>
          <li class="badge badge-primary">Stars: 44</li>
          <li class="badge badge-dark">Watchers: 21</li>
          <li class="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserServices from "../services/UserServices";

export default {
  props: ["githubusername"],
  name: "githubrepos",
  data: function() {
    return {
      error: null,
      github: {}
    };
  },
  components: {},
  async mounted() {
    try {
      this.github = await UserServices.getGitProfile(this.githubusername);
    } catch (error) {
      this.error = error.message;
    }
  },
  async created() {},
  methods: {}
};
</script>
