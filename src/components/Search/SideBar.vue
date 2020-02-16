<template>
    <div style="height:100%;">
        <img src="../../assets/img_bg_orange.svg" alt="" srcset="">
        <SearchField/>
        <SearchBtn/>
        <pharmacy-list :sites="sites"/>
    </div>
</template>

<script>
import SearchField from './SearchField.vue';
import SearchBtn from './SearchBtn.vue';
import PharmacyList from './PharmacyList.vue';

export default {
  components: {
    SearchField,
    SearchBtn,
    PharmacyList,
  },
  props: {
    sites: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
