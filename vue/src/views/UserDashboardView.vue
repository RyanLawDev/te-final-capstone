<template>
  <div class="dashboard">
    <div id="userDashboard">
      <h1 v-if="!isAdminUser">User Dashboard</h1>
      <h2 v-else>ADMIN DASHBOARD</h2>

    </div>
    <div>
      <user-dashboard-page id="dashboardCards" v-if="!isAdminUser"/>
      <new-notification-form id="newnotificationform" v-else />
    </div>
  </div>
</template>

<script>
import UserDashboardPage from "../components/UserDashboardPage.vue";
import NewNotificationForm from "../components/NewNotificationForm.vue";

export default {
  components: {
    UserDashboardPage,
    NewNotificationForm
  },
  computed: {
    isAdminUser() {
      let isAdmin = false;
      if(this.$store.state.user.authorities[0] === 'ROLE_ADMIN') {
        isAdmin = true;
      }
      return isAdmin;
    }
  }
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