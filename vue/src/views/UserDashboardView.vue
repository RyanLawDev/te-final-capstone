<template>
  <div class="dashboard">
    <div id="userDashboard">
      <h1>User Dashboard ;p</h1>

    </div>
    <div>
      <user-dashboard-page id="dashboardCards" />
    </div>
  </div>
</template>

<script>
import UserDashboardPage from "../components/UserDashboardPage.vue";

export default {
  components: {
    UserDashboardPage,
  },
};
</script>

<style scoped>
.dashboard {
  justify-content: center;
  align-items: center;
}

#dashboardCards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}

#userDashboard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>