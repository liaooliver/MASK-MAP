<template>
    <div class="SearchBtn">
        <div class="SearchBtn__group">
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.all}"
                @click.prevent="searchPharmacy($event,'all')">
                所有口罩
            </button>
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.adult}"
                @click.prevent="searchPharmacy($event,'adult')">
                成人口罩
            </button>
            <button
            class="SearchBtn__group--disabled"
             :class="{ 'SearchBtn__group--active': style.child}"
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
        all: true,
        adult: false,
        child: false,
      },
    };
  },
  methods: {
    searchPharmacy(event, type) {
      event.preventDefault();
      this.$store.dispatch('sortByType', type);
      const keys = Object.keys(this.style);
      keys.forEach((key) => {
        this.style[key] = false;
      });
      this.style[type] = true;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';
</style>
