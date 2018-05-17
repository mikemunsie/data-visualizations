<template>
  <div>
    <router-view />
    <div class='nav'>
      <span>Goto:</span>
      <select @change="updatePage" v-model="selected">
        <option value="/">Home</option>
        <option value="/barchart">Bar Chart</option>
        <option value="/forcegraph">Force Graph</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: window.location.hash.substr(1)
    }
  },
  methods: {
    updatePage() {
      this.$router.push(this.selected);
    }
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  font-weight: 500;
}

h1 {
  font-weight: 600;
  margin: 0;
}

select {
  font-family: inherit;
  border: 0;
  background: white;
  padding: 15px;
  font-size: inherit;
  font-weight: 300;
}

.nav {
  position: fixed;
  bottom: 0;
  padding: 15px;
  background: rgba(0,0,0,.9);
  color: white;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
}

.nav select {
  margin-left: 5px;
}
</style>
