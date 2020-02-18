<template>
    <div class="SearchBtn">
        <div class="SearchBtn__group">
            <button class="SearchBtn__group--active"
                @click.prevent="searchPharmacy('all')">
                所有口罩
            </button>
            <button class="SearchBtn__group--disabled"
                @click.prevent="searchPharmacy('adult')">
                成人口罩
            </button>
            <button class="SearchBtn__group--disabled"
                @click.prevent="searchPharmacy('child')">
                兒童口罩
            </button>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    searchPharmacy(type) {
      this.$emit('filterPharmacyList', type);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
