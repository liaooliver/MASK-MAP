<template>
    <div style="height:100%;" v-if="filterList.length > 0">
        <img src="../../assets/img_bg_orange.svg" alt="" srcset="">
        <SearchField @filterPharmacyList="filterPharmacyList($event)" />
        <SearchBtn @filterPharmacyList="filterPharmacybyType($event)" />
        <pharmacy-list :sites="filterList" />
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
      filterList: [],
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
        this.filterList = this.sites.filter(
          (site) => site.properties.address.indexOf(value) > -1,
        );
      }
    },
    filterPharmacybyType(type) {
      if (type === 'adult') {
        this.filterList = this.sites.filter(
          (site) => site.properties.mask_adult > 0,
        ).sort((a, b) => b.properties.mask_adult - a.properties.mask_adult);
      } else if (type === 'child') {
        this.filterList = this.sites.filter(
          (site) => site.properties.mask_child > 0,
        ).sort((a, b) => b.properties.mask_adult - a.properties.mask_adult);
      } else {
        this.filterList = this.sites;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
