<template>
<div class="auth-container">
    <form @submit.prevent="handleLogin" class="p-4 shadow-sm bg-white rounded">
      <h2 class="text-center mb-4">Login</h2>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" id="username" class="form-control" placeholder="Enter username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter password" required />
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary">Log In</button>
      </div>
      <div class="text-center mt-3">
        <a href="#" @click="$emit('switch-to-register')">Don't have an account? Register</a>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/services/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        console.log('Attempting login with username:', this.username);
        await login(this.username, this.password);
        console.log('Login successful');
        this.$emit('login-success');
        this.errorMessage = '';
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = error.response?.data?.error || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
/* No component-specific styles needed; moved to global.css */
</style>