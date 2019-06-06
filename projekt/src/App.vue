<template>
    <div id="app">
        <div id="nav">
            <router-link to="/panelkibica">Panel kibica</router-link> |
            <router-link to="/paneloceniania">Panel Oceniania</router-link> |
            <router-link to="/konkurs">Konkurs</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        mounted () {
            this.$store.dispatch('fetchData', { self: this });
        }
    };
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.wyszukiwarka {
    margin: 5px;
    span { font-size: x-small; color: gray; }
    input {
        border: 1px solid lightgray;
        border-radius: 10px;
        padding: 5px;
        color: darken(cornflowerblue, 25%);
    }
    select {
        border: 0px;
        appearance: none;
        background-color: transparent;
        color: cornflowerblue;
        &:hover{ text-decoration: underline; }
        &:-moz-focusring {
            color: transparent;
            text-shadow: 0 0 0 cornflowerblue;
        }
        option { border: none; }
    }
}
</style>
