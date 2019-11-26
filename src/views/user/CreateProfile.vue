<template>
  <div class="dashboard">
    <Navbar />
    <div class="wrapper">
      <Sidebar />
      <div class="container">
        <h1 class="large text-primary">Create Your Profile</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form class="form">
          <div class="form-group">
            <select v-model="me.status" name="status">
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small class="form-text">Give us an idea of where you are at in your career</small>
          </div>
          <div class="form-group">
            <input v-model="me.company" type="text" placeholder="Company" name="company" />
            <small class="form-text">Could be your own company or one you work for</small>
          </div>
          <div class="form-group">
            <input v-model="me.website" type="text" placeholder="Website" name="website" />
            <small class="form-text">Could be your own or a company website</small>
          </div>
          <div class="form-group">
            <input v-model="me.location" type="text" placeholder="Location" name="location" />
            <small class="form-text">City & state suggested (eg. Boston, MA)</small>
          </div>
          <div class="form-group">
            <input v-model="me.skills" type="text" placeholder="* Skills" name="skills" />
            <small class="form-text">
              Please use comma separated values (eg.
              HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div class="form-group">
            <input
              v-model="me.githubusername"
              type="text"
              placeholder="Github Username"
              name="githubusername"
            />
            <small class="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div class="form-group">
            <textarea v-model="me.bio" placeholder="A short bio of yourself" name="bio"></textarea>
            <small class="form-text">Tell us a little about yourself</small>
          </div>
          <div class="form-group social-input">
            <i class="fab fa-twitter fa-2x"></i>
            <input v-model="me.social.twitter" type="text" placeholder="Twitter URL" name="twitter" />
          </div>
          <div class="form-group social-input">
            <i class="fab fa-facebook fa-2x"></i>
            <input
              v-model="me.social.facebook"
              type="text"
              placeholder="Facebook URL"
              name="facebook"
            />
          </div>
          <div class="form-group social-input">
            <i class="fab fa-youtube fa-2x"></i>
            <input v-model="me.social.youtube" type="text" placeholder="YouTube URL" name="youtube" />
          </div>
          <div class="form-group social-input">
            <i class="fab fa-linkedin fa-2x"></i>
            <input
              v-model="me.social.linkedin"
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
            />
          </div>
          <button @click="editProfile" type="submit" class="btn btn-primary my-1">Update</button>
          <router-link class="btn btn-light my-1" to="/dashboard">Go Back</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import UserServices from "../../services/UserServices";

export default {
  name: "edit-profile",
  components: {
    Navbar,
    Sidebar
  },
  data: () => {
    return {
      error: null,
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
    UserServices.getUserProfile().then(res => {
      next(vm => {
        vm.me = res.data;
      });
    });
  },
  async created() {
    try {
      await UserServices.getUserProfile();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    editProfile() {
      UserServices.editUserProfile(this.me, res => {
        if (res.status !== 200) {
          this.error = res.data;
        } else {
          this.$router.push({ name: "profile" });
        }
      });
    }
  }
};
</script>
