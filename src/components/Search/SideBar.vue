<template>
    <div style="height:100%;">
        <img src="../../assets/img_bg_orange.svg" alt="" srcset="">
        <SearchField @filterPharmacyList="filterPharmacyList($event)" />
        <SearchBtn/>
        <pharmacy-list :sites="filterList"/>
    </div>
</template>

<script>
import PharmacyList from './PharmacyList.vue';
import SearchField from './SearchField.vue';
import SearchBtn from './SearchBtn.vue';

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
  data() {
    return {
      filterList: null,
    };
  },
  mounted() {
    this.filterPharmacyList();
  },
  methods: {
    filterPharmacyList(value = null) {
      if (!value) {
        this.filterList = this.sites;
      } else {
        this.filterList = this.sites.filter((site) => site.properties.address.indexOf(value) > -1);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
