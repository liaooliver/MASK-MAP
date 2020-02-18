<template>

  <div id="app" class="full-page" >
    <div class="sidebar" v-if="sites.length > 0">
      <SideBar :sites="sites" />
    </div>
    <div class="map" v-if="sites.length > 0">
      <Maps :sites="sites" />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/Search/SideBar.vue';
import Maps from './components/Maps.vue';

export default {
  name: 'App',
  data() {
    return {
      sites: [],
    };
  },
  components: {
    SideBar,
    Maps,
  },
  created() {
    this.$http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => {
        // this.sites = res.data.features;
        for (let i = 0; i < 100; i += 1) {
          this.sites.push(res.data.features[i]);
        }
      });
  },
};

</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
