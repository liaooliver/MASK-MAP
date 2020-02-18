<template>
    <section class="PharmacyLists" >
        <ul class="PharmacyLists__list">
            <li class="PharmacyLists__card"
            v-for="site in siteList"
            :key="site.id"
            @click="getPharmacy(site)">
                <h4 class="PharmacyLists__card--title PharmacyLists__paragraph">
                    {{ site.name }}
                </h4>
                <p class="PharmacyLists__card--content  PharmacyLists__paragraph">
                    {{ site.address }}
                </p>
                <p class="PharmacyLists__card--content  PharmacyLists__paragraph">
                    營業時間｜未提供
                </p>
                <div class="PharmacyLists__status">
                    <span
                    :class="{
                      'PharmacyLists__status--low':site.mask_adult_status[0],
                      'PharmacyLists__status--amid':site.mask_adult_status[1],
                      'PharmacyLists__status--high':site.mask_adult_status[2]
                    }"
                    class="PharmacyLists__status--item">
                        成人口罩 {{ site.mask_adult }}
                    </span>
                    <span
                    :class="{
                      'PharmacyLists__status--low':site.mask_child_status[0],
                      'PharmacyLists__status--amid':site.mask_child_status[1],
                      'PharmacyLists__status--high':site.mask_child_status[2]
                    }"
                    class="PharmacyLists__status--item">
                        兒童口罩 {{ site.mask_child }}
                    </span>
                </div>
            </li>
        </ul>
    </section>
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
      siteList: [],
    };
  },
  watch: {
    sites: {
      handler(newValue) {
        this.sites = newValue;
        this.filterData(this.sites);
      },
      deep: true,
    },
  },
  mounted() {
    this.filterData(this.sites);
  },
  methods: {
    filterData(array) {
      const _ = this;
      this.siteList.length = 0;
      array.forEach((site) => {
        const { properties, geometry } = site;
        _.siteList.push({
          id: properties.id,
          name: properties.name,
          address: properties.address,
          mask_adult: properties.mask_adult,
          mask_adult_status: _.filterStatus(properties.mask_adult),
          mask_child: properties.mask_child,
          mask_child_status: _.filterStatus(properties.mask_child),
          lat: geometry.coordinates[1],
          lng: geometry.coordinates[0],
        });
      });
    },
    filterStatus(stock) {
      const status = [0, 0, 0];
      if (stock >= 50) status[2] = 1;
      if (stock < 50 && stock > 20) status[1] = 1;
      if (stock <= 20) status[0] = 1;
      return status;
    },
    getPharmacy(info) {
      console.log(info);
      const { lat, lng } = info;
      this.$store.dispatch('assigned', { lat, lng });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/components/PharmacyList.scss';
</style>
