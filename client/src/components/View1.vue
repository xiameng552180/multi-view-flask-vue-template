<template>
  <div>
    <div style="background: grey">View1</div>
    <div class="form-group">
      <label for="mySelect">Select visualization:</label>
      <select class="form-control" id="mySelect" @change="selectvis()">
        <option>lollipop plot</option>
        <option>word cloud</option>
      </select>
    </div>
  </div>
</template>

<script>
import DataService from "../services/data-service";
import PipeService from "../services/pipe-service";
export default {
  name: "View1",
  data() {
    return {};
  },
  mounted() {
    this.selectvis();
  },
  methods: {
    selectvis() {
      DataService.selection = document.getElementById("mySelect").value;
      PipeService.$emit(PipeService.UPDATE_VIEW2);
      // console.log(DataService.selection)
    },
  },
};
</script>



