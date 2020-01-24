<template>
  <!-- <router-view></router-view> -->
  <div class="container-fluid h-100" style="overflow-y: auto">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">{{ prueba }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      prueba: "andres"
    };
  }
};
</script>
