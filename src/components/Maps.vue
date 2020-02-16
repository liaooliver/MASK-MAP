<template>
  <div>
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
const { MarkerClusterer } = window;

export default {
  props: {
    sites: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: null,
      // 預設經緯度在信義區附近
      lat: 25.0325917,
      lng: 121.5624999,
    };
  },
  mounted() {
    // console.log(this.sites);
    this.initMap();
    this.setMarker();
  },
  methods: {
    // 建立地圖
    initMap() {
      const { maps } = window.google;
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new maps.Map(document.getElementById('map'), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 8,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false,
      });
    },
    // 建立地標
    setMarker() {
      // 建立一個新地標
      const { maps } = window.google;
      const markers = this.sites.map((location) => {
        const lat = location.geometry.coordinates[1];
        const lng = location.geometry.coordinates[0];
        return new maps.Marker({
          position: { lat, lng },
        });
      });

      const markerCluster = new MarkerClusterer(this.map, markers,
        {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          gridSize: 100,
        });
      markerCluster();
    },
  },
};
</script>


<style scoped>
@import '../assets/styles/main.scss';
.google-map {
  width: 100%;
  height: 100vh;
}
</style>
