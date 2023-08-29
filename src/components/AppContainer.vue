<template>
  <div>
    <div v-if="step == 0">
      <Post :post="post" v-for="post in posts" :key="post" />
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div :class="myFilter" class="upload-image" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="filters">
        <FilterBox :imageUrl="imageUrl" :filterName="filter" v-for="filter in filters" :key="filter">
          <span>{{ filter }}</span>
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div :class="myFilter" class="upload-image" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>
    <!-- 마이페이지 -->
    <div v-if="step == 3">
      <MyPage :one="1" />
    </div>
  </div>
</template>

<script>
import Post from "./AppPost.vue";
import FilterBox from "./FilterBox.vue";
import filters from "../assets/filters.js";
import MyPage from "./MyPage.vue";

export default {
  name: "AppContainer",
  data() {
    return {
      filters: filters,
      myFilter: "",
    }
  },
  mounted() {
    this.emitter.on('giveFilter', (myFilter) => {
      this.myFilter = myFilter;
    });
  },
  props: {
    posts: Array,
    step: Number,
    imageUrl: String,
  },
  components: {
    Post,
    FilterBox,
    MyPage,
  },
}
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
}

.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}

.filters::-webkit-scrollbar {
  height: 5px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>