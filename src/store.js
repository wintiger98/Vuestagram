import { createStore } from "vuex";
import posts from "./assets/posts.js";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "kim",
      isLiked: false,
      likes: posts[0].likes,
      age: 20,
      more: {},
    };
  },
  mutations: {
    upLikes(state) {
      if (state.isLiked) {
        state.likes--;
        state.isLiked = false;
      } else {
        state.isLiked = true;
        state.likes++;
      }
    },
    한살더먹기(state) {
      state.age++;
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  actions: {
    getData() {
      axios.get("https://codingapple1.github.io/vue/more0.json").then((a) => {
        this.commit("setMore", a.data);
      });
    },
  },
});

export default store;
