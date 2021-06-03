<template>
  <div class="container-fluid" style="height: 100%">
    <div class="row" style="height: 100%">
      <div class="col-3 px-0" style="border: solid; height: 100%">
        <view-1></view-1>
      </div>
      <div class="col px-0" style="border: solid; height: 100%">
        <view-2></view-2>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
// import loginView from './components/login/loginView';
import View1 from "./components/View1";
import View2 from "./components/View2";
// import DataService from './services/data-service';
// import PipeService from './services/pipe-service';

export default {
  name: "App",
  components: {
    View1,
    View2,
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function foo() {
      this.initialize();
    });
  },
  methods: {
    initialize() {
      console.log("hello world");
    },
  },
};
</script>

<style scoped>
</style>

