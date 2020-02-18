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
      infoWindow: null,
      moveToPosition: this.$store.getters.sendPanTo,
    };
  },
  watch: {
    moveToPosition: {
      handler(val) {
        this.lanuchPanTO(val, { zoom: 14 });
      },
      deep: true,
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    lanuchPanTO(value) {
      this.map.panTo(value);
    },
    // 建立地圖
    initMap() {
      const { maps } = window.google;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
          const userPos = {
            lat: 25.0456832,
            lng: 121.5440975,
            // lat: position.coords.latitude,
            // lng: position.coords.longitude,
          };
          // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
          this.map = new maps.Map(document.getElementById('map'), {
            // 設定地圖的中心點經緯度位置
            center: userPos,
            // 設定地圖縮放比例 0-20
            zoom: 14,
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
        const { properties, geometry } = location;
        const lat = geometry.coordinates[1];
        const lng = geometry.coordinates[0];

        const marker = new maps.Marker({
          position: { lat, lng },
          title: properties.name,
        });

        maps.event.addListener(marker, 'click', () => {
          this.infoWindow.setContent(
            `
            <h1>${properties.name}</h1><br>
            <p>${properties.address}</p>
            <p>聯絡電話 | ${properties.phone}</p>
            `,
          );
          this.infoWindow.open(this.map, marker);
        });

        return marker;
      });

      const markerCluster = new MarkerClusterer(this.map, markers,
        {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          gridSize: 70,
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

.window-title{
  color: aquamarine;
}
</style>
