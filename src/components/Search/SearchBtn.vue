<template>
    <div class="SearchBtn">
        <div class="SearchBtn__group">
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.isAll}"
                @click.prevent="searchPharmacy($event,'all')">
                所有口罩
            </button>
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.isAdult}"
                @click.prevent="searchPharmacy($event,'adult')">
                成人口罩
            </button>
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.isChild}"
                @click.prevent="searchPharmacy($event,'child')">
                兒童口罩
            </button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        isAll: true,
        isAdult: false,
        isChild: false,
      },
    };
  },
  methods: {
    searchPharmacy(event, type) {
      event.preventDefault();
      this.$store.dispatch('sortByType', type);
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      // for (key in this.style) {
      //   this.style[key] = false;
      // };
      // this.style[type] = true;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
