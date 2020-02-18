<template>
    <div class="SearchField">
        <div class="SearchField__search">
            <input class="SearchField__search--input"
            type="text"
            v-model="pharmacy"
            placeholder="搜尋區域 , 地址 , 藥局"
        >
            <i class="SearchField__search--icon" @click="searchPharmacy(pharmacy)">
                <img src="../../assets/Icon_search.svg" alt="" srcset="">
            </i>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pharmacy: null,
    };
  },
  methods: {
    searchPharmacy() {
      this.$emit('filterPharmacyList', this.pharmacy);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
