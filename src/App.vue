<template>
  <div>
    <div v-if="!isAuthenticated">
      <RegisterForm v-if="showRegister" @switch-to-login="showRegister = false" />
      <LoginForm v-else @login-success="handleLoginSuccess" @switch-to-register="showRegister = true" />
    </div>
    <div v-else class="container-fluid d-flex flex-column h-100">
      <div class="header d-flex justify-content-between align-items-center p-2 mb-3 bg-light rounded">
        <span class="text-info fw-bold">Welcome, {{ currentUsername }}</span>
        <button @click="logout" class="btn btn-outline-secondary btn-sm" aria-label="Log out">Log Out</button>
      </div>
      <div class="content d-flex flex-row">
        <router-view class="flex-grow-1" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isAuthenticated: false,
      showRegister: false,
      currentUsername: '',
    };
  },
  async mounted() {
    await this.checkAuth();
  },
  methods: {
    async checkAuth() {
      try {
        const response = await axios.get('http://localhost:8089/auth/me', { withCredentials: true });
        this.isAuthenticated = true;
        this.currentUsername = response.data.username;
      } catch (error) {
        console.error('Auth check failed:', error);
        this.isAuthenticated = false;
        this.currentUsername = '';
      }
    },
    async handleLoginSuccess() {
      try {
        const response = await axios.get('http://localhost:8089/auth/me', { withCredentials: true });
        this.isAuthenticated = true;
        this.currentUsername = response.data.username;
        this.showRegister = false;
      } catch (error) {
        console.error('Failed to fetch username:', error);
        this.isAuthenticated = false;
        this.currentUsername = '';
      }
    },
    async logout() {
      try {
        await axios.post('http://localhost:8089/auth/logout', {}, { withCredentials: true });
        this.isAuthenticated = false;
        this.currentUsername = '';
      } catch (error) {
        console.error('Logout failed:', error);
        this.isAuthenticated = false;
        this.currentUsername = '';
      }
    },
  },
};
</script>

<style scoped>
/* No component-specific styles needed; moved to global.css */
</style>