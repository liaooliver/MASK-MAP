<template>
    <div class="sideBar" v-if="filterList.length > 0">
        <div class="sideBar__head">
          <img src="../../assets/img_bg_orange.svg" alt="" srcset="">
          <div class="sideBar__dailyInfo">
            <p class="sideBar__dailyInfo--fontStyle">{{date}}</p>
            <h1 class="sideBar__dailyInfo--week">{{day}}</h1>
            <p class="sideBar__dailyInfo--note">身分證末一碼<b>{{purchase}}</b>字號者可購買口罩</p>
            <p class="sideBar__dailyInfo--fontStyle">※一週限購一次，每次一人限購兩片</p>
          </div>
        </div>
        <SearchField @filterPharmacyList="filterPharmacyList($event)" />
        <SearchBtn />
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
  computed: {
    purchase() {
      const condition = {
        1: '奇數',
        2: '偶數',
        3: '奇數',
        4: '偶數',
        5: '奇數',
        6: '偶數',
        0: '不限',
      };
      return condition[this.today().getDay()];
    },
    date() {
      const year = this.today().getFullYear();
      const month = this.today().getMonth() + 1;
      const day = this.today().getDate();
      const fullString = `${year}-${this.addZero(month)}-${this.addZero(day)}`;
      return fullString;
    },
    day() {
      const week = this.today().getDay();
      switch (week) {
        case 0:
          return '星期日';
        case 1:
          return '星期一';
        case 2:
          return '星期二';
        case 3:
          return '星期三';
        case 4:
          return '星期四';
        case 5:
          return '星期五';
        case 6:
          return '星期六';
        default:
          return '星期？';
      }
    },
  },
  mounted() {
    this.filterPharmacyList();
  },
  methods: {
    today() {
      return new Date();
    },
    addZero(value) {
      return value < 10 ? `0${value}` : `${value}`;
    },
    filterPharmacyList(value = null) {
      if (!value) {
        this.filterList = this.sites;
      } else {
        this.filterList = this.sites.filter(
          (site) => site.properties.address.indexOf(value) > -1,
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
