<template>
  <div>
    <div v-if="!isAuthenticated">
      <RegisterForm v-if="showRegister" @switch-to-login="showRegister = false" />
      <LoginForm v-else @login-success="handleLoginSuccess" @switch-to-register="showRegister = true" />
    </div>
    <div v-else>
      <div class="text-end p-2">
        <button @click="logout" class="btn btn-outline-secondary btn-sm">Log Out</button>
      </div>
      <router-view />
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
    };
  },
  async mounted() {
    await this.checkAuth();
  },
  methods: {
    async checkAuth() {
      try {
        await axios.get('http://localhost:8089/api/cart/get-cart-items', { withCredentials: true });
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Auth check failed:', error);
        this.isAuthenticated = false;
      }
    },
    handleLoginSuccess() {
      this.isAuthenticated = true;
      this.showRegister = false;
    },
    async logout() {
      try {
        await axios.post('http://localhost:8089/auth/logout', {}, { withCredentials: true });
        this.isAuthenticated = false;
      } catch (error) {
        console.error('Logout failed:', error);
        this.isAuthenticated = false;
      }
    },
  },
};
</script>