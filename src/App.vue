<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :posts="posts" :step="step" :imageUrl="imageUrl" @write="myPost = $event" />

  <button v-if="step == 0" @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/AppContainer.vue";
import posts from "./assets/posts.js";
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      posts: posts,
      btnCnt: 0,
      step: 3,
      imageUrl: "",
      myPost: "",
      myFilter: "",
    }
  },
  mounted() {
    this.emitter.on('giveFilter', (myFilter) => {
      this.myFilter = myFilter;
    });
  },
  components: {
    Container,
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    ...mapState(['age', 'likes']),
    ...mapState({ 내이름: 'name' }),
  },
  methods: {
    ...mapMutations(['setMore', 'upLikes', '한살더먹기']),
    more() {
      var url = `https://codingapple1.github.io/vue/more${this.btnCnt}.json`;
      axios.get(url).then((result) => {
        // 요청 성공시 실행할 코드
        this.btnCnt++;
        this.posts.push(result.data);
      }).catch((error) => {
        // 요청 실패시 실행할 코드
        console.log(error);
      });
    },
    upload(e) {
      let tmpFile = e.target.files;
      let url = URL.createObjectURL(tmpFile[0]);
      this.imageUrl = url;
      this.step++;
    },
    publish() {
      var myPost = {
        userId: "kim-hyun123",
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.myPost,
        filter: this.myFilter,
      };
      this.posts.unshift(myPost);
      this.step = 0;
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
