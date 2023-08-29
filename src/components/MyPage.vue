<script setup>
import { ref, onMounted, toRefs, defineProps, watch, computed } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex';

let followers = ref([]);
let originFollowers = ref([]);

const props = defineProps({
    one: Number,
});

onMounted(() => {
    axios.get('/follower.json').then((a) => {
        followers.value = a.data;
        originFollowers.value = [...a.data];
    })
});
let { one } = toRefs(props);
one.value;

watch(one, () => {
    one;
});

let result = computed(() => {
    return followers.value.length;
});
result.value;

let store = useStore();
store.state.name;

function followerSearch(searchText) {
    let newFollowers = originFollowers.value.filter((word) => { return word.name.indexOf(searchText) != -1 });
    followers.value = [...newFollowers];
}

</script>

<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input placeholder="🔍" @input="followerSearch($event.target.value)" />
        <div class="post-header" v-for="follower in followers" :key="follower">
            <div class="profile" :style="{ backgroundImage: `url(${follower.image})` }"></div>
            <span class="profile-name">{{ follower.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyPage",
}
</script>

<style></style>