<template>
  <div>
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>

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
    this.initMap();
  },
  methods: {
    // 建立地圖
    initMap() {
      // 從 window google 物件解構 google map
      const { maps } = window.google;

      // 預設初始位置
      const userPos = {
        lat: 25.0456832,
        lng: 121.5440975,
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
      this.setMarker();
    },
    // 建立地標
    setMarker() {
      const _ = this;
      // 從全域上的 window 將 maps & MarkerClusterer 物件解構
      const { maps } = window.google;
      const { MarkerClusterer } = window;

      // 透過 maps 建構子實體化 infoWindow 實例
      _.infoWindow = new maps.InfoWindow();
      const markers = this.sites.map((location) => {
        const { properties, geometry } = location;
        const lat = geometry.coordinates[1];
        const lng = geometry.coordinates[0];
        // maps 建構子實體化 marker 實例
        const marker = new maps.Marker({
          position: { lat, lng },
          title: properties.name,
        });
        // 為 marker 加上監聽器
        maps.event.addListener(marker, 'click', () => {
          _.infoWindow.setContent(_.createMarker(properties));
          _.infoWindow.open(_.map, marker);
        });
        return marker;
      });
      // eslint-disable-next-line no-new
      new MarkerClusterer(this.map, markers,
        {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          gridSize: 70,
        });
    },
    createMarker(properties) {
      return `
        <h1 style="font-weight:bold;">${properties.name}</h1>
        <p>${properties.address}</p>
        <p>聯絡電話｜${properties.phone}</p>
        <p>更新時間｜${properties.updated}</p>
        <div style="display:flex;justify-content: space-between; margin-top:6px;">
          ${this.makeRank(properties.mask_adult)}
          ${this.makeRank(properties.mask_child)}
        </div>
      `;
    },
    makeRank(number) {
      let button;
      if (number >= 50) {
        button = `
        <button 
        style="width:45%;border:0px; padding:5px;border-radius:5px;
        background:#cdfad3; color:#2baf3c">
          ${number}
        </button>
        `;
      } else if (number < 50 && number > 20) {
        button = `
        <button 
        style="width:45%;border:0px; padding:5px;border-radius:5px;
        background:#ffeebe; color:#FF973B">
          ${number}
        </button>
        `;
      } else if (number <= 20) {
        button = `
        <button 
        style="width:45%;border:0px; padding:5px;border-radius:5px;
        background:#ffddd0; color:#E6541D">
          ${number}
        </button>
        `;
      }
      return button;
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
