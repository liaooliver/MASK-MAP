<template>
  <div>
    {{ moveToPosition.lat }}
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
      infoWindow: null,
      moveToPosition: this.$store.getters.sendPanTo,
    };
  },
  mounted() {
    // console.log(this.sites);
    this.initMap();
  },
  watch: {
    moveToPosition(value) {
      console.log(value);
      // return this.moveToPosition;
    },
  },
  computed: {
    // moveToPosition() {
    //   this.lanuchPanTO(this.$store.getters.sendPanTo);
    //   return this.$store.getters.sendPanTo;
    // },
  },
  methods: {
    lanuchPanTO(value) {
      console.log(value);
    },
    // 建立地圖
    initMap() {
      const { maps } = window.google;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
          this.map = new maps.Map(document.getElementById('map'), {
            // 設定地圖的中心點經緯度位置
            center: userPos,
            // 設定地圖縮放比例 0-20
            zoom: 17,
            // 限制使用者能縮放地圖的最大比例
            maxZoom: 20,
            // 限制使用者能縮放地圖的最小比例
            minZoom: 3,
            // 設定是否呈現右下角街景小人
            streetViewControl: true,
            // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
            mapTypeControl: false,
          });

          this.infoWindow = new maps.InfoWindow();
          this.infoWindow.setPosition(userPos);
          this.infoWindow.setContent('Location Found');
          this.infoWindow.open(this.map);
          this.map.setCenter(userPos);
          this.setMarker();
        });
      }
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
          title: location.properties.name,
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
