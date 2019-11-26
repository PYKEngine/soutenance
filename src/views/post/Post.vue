<template>
  <div name="wall">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <div class="post bg-white p-1 my-1">
          <div>
            <router-link v-bind:to="`/profile/user/${post.user}`">
              <img class="round-img" :src="`https:${post.avatar}`" alt />
              <h4 style="color:#731f65">{{post.name}}</h4>
            </router-link>
          </div>
          <div>
            <p class="my-1">{{post.text}}</p>
          </div>
        </div>
        <div class="post-form">
          <div class="bg-primary p">
            <h3>Leave A Comment</h3>
          </div>
          <form class="form my-1" v-on:submit.prevent="onSubmit">
            <textarea
              v-model="text"
              name="text"
              cols="30"
              rows="5"
              placeholder="Comment on this post"
              required
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
        <div class="comments">
          <div v-for="c in post.comments" :key="c.id" class="post bg-white p-1 my-1">
            <div>
              <router-link v-bind:to="`/profile/user/${c.user}`">
                <img class="round-img" :src="`https:${c.avatar}`" alt />
                <h4>{{c.name}}</h4>
              </router-link>
            </div>
            <div>
              <p class="my-1">{{c.text}}</p>
              <p class="post-date">Posted on {{c.date}}</p>
              <button
                v-if="$store.state.userId === c.user"
                @click="deleteComment(c._id)"
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
              <button
                v-if="$store.state.is_admin"
                @click="adminDeleteComment(c._id)"
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
      post: []
    };
  },
  components: {
    Navbar,
    Sidebar
  },
  beforeRouteEnter(to, from, next) {
    postService.getPostById(to.params.id).then(res => {
      next(vm => {
        vm.post = res.data;
      });
    });
  },
  methods: {
    onSubmit: async function() {
      const request = {
        text: this.text
      };
      await postService.commentPost(this.post._id, request);
      this.$router.go();
    },
    deleteComment: async function(id) {
      await postService.deleteCommentPost(this.post._id, id);
      this.$router.go();
    },
    adminDeleteComment: async function(id) {
      await AdminServices.deleteCommentPost(this.post._id, id);
      this.$router.go();
    }
  }
};
</script>