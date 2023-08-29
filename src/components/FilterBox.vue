<template>
    <div @click="fire" :class="filterName + ' filter-item'" :style="{ backgroundImage: `url(${imageUrl})` }">

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FilterBox',
    props: {
        imageUrl: String,
        filterName: String,
    },
    methods: {
        fire() {
            this.emitter.emit('giveFilter', this.filterName);
        },
    }
}
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
    background-position: center;
}
</style>