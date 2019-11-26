
<template>
  <div
    name="message-modal"
    class="login-signin"
    transition="pop-out"
    :width="modalWidth"
    :height="600"
  >
    <h4>Send a message</h4>
    <form v-on:submit.prevent="onSubmit" class="login-form">
      <textarea v-model="text" class="login-label" cols="52" rows="4"></textarea>
      <button class="btn login-primary-btn" type="submit">Send Message</button>
    </form>
  </div>
</template>

<script>
const MODAL_WIDTH = 656;
import MessageService from "../services/MessageService";

export default {
  name: "MessageModal",
  props: ["data"],
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      text: ""
    };
  },

  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    onSubmit: async function() {
      const request = {
        text: this.text,
        id: this.data
      };
      await MessageService.sendMessage(request);
      this.$router.go();
    }
  }
};
</script>


<style lang="scss">
.v--modal-overlay .v--modal-box {
  display: flex;
  align-content: center;
  justify-content: center;
}

.login-signin {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

textarea {
  padding: 1rem;
  line-height: 0.5rem;
  margin: 2rem 0;
}
</style>