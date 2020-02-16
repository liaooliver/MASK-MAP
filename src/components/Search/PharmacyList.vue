<template>
    <section class="PharmacyLists">
        <ul class="PharmacyLists__list">
            <li class="PharmacyLists__card" v-for="site in sites" :key="site.properties.id">
                <h4 class="PharmacyLists__card--title PharmacyLists__paragraph">
                    {{ site.properties.name }}
                </h4>
                <p class="PharmacyLists__card--content  PharmacyLists__paragraph">
                    {{ site.properties.address }}
                </p>
                <p class="PharmacyLists__card--content  PharmacyLists__paragraph">
                    營業時間｜未提供
                </p>
                <div class="PharmacyLists__status">
                    <span class="PharmacyLists__status--item PharmacyLists__status--low">
                        成人口罩 {{ site.properties.mask_adult }}
                    </span>
                    <span class="PharmacyLists__status--item PharmacyLists__status--amid">
                        兒童口罩 {{ site.properties.mask_child }}
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
  mounted() {
    console.log(this.sites);
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/components/PharmacyList.scss';
</style>
