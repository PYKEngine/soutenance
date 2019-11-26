<template>
  <div name="wall">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">The wall</h1>
        <p class="lead">
          <i class="fas fa-user"></i> What's new on the network!
        </p>
        <div class="post-form">
          <div class="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form class="form my-1" v-on:submit.prevent="onSubmit">
            <textarea
              v-model="text"
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
        <div class="posts">
          <div v-for="p in posts" :key="p.id" class="post bg-white p-1 my-1">
            <div>
              <router-link v-bind:to="`/profile/user/${p.user}`">
                <img class="round-img" :src="`https:${p.avatar}`" alt />
                <h4 style="color:#731f65">{{p.name}}</h4>
              </router-link>
            </div>
            <div>
              <p class="my-1">{{p.text}}</p>
              <p class="post-date">Posted on {{p.createdAt}}</p>
              <button @click="likePost(p._id)" type="button" class="btn btn-light">
                <i class="fas fa-thumbs-up"></i>
                <span>{{p.likes.length}}</span>
              </button>
              <button @click="unlikePost(p._id)" type="button" class="btn btn-light">
                <i class="fas fa-thumbs-down"></i>
              </button>
              <router-link v-bind:to="`/post/${p._id}`" class="btn btn-dark">
                Discussion
                <span class="comment-count">{{p.comments.length}}</span>
              </router-link>
              <button
                v-if="$store.state.userId === p.user"
                @click="deletePost(p._id)"
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
              <button
                v-if="$store.state.is_admin"
                @click="adminDeletePost(p._id)"
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
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
import * as postService from "../../services/PostService";
import * as AdminServices from "../../services/AdminServices";

export default {
  name: "wall",
  data: function() {
    return {
      text: null,
      posts: []
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  beforeRouteEnter(to, from, next) {
    postService.getAllPosts().then(res => {
      next(vm => {
        vm.posts = res.data;
      });
    });
  },
  methods: {
    onSubmit: async function() {
      const request = {
        text: this.text
      };
      await postService.createPost(request);
      this.$router.go();
    },
    deletePost: async function(id) {
      await postService.deletePost(id);
      this.$router.go();
    },
    adminDeletePost: async function(id) {
      await AdminServices.deletePost(id);
      this.$router.go();
    },
    likePost: async function(id) {
      await postService.likePost(id);
      this.$router.go();
    },
    unlikePost: async function(id) {
      await postService.unlikePost(id);
      this.$router.go();
    }
  }
};
</script>
