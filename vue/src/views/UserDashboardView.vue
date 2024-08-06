<template>
  <div class="home">
    <h1>User Dashboard ;p</h1>
    <p>You must be authenticated to see this</p>
    <user-dashboard-page />
    
  </div>
  

</template>

<script>

import UserDashboardPage from '../components/UserDashboardPage.vue'


export default {
  components:{
    UserDashboardPage,
  
  }
};

</script>
