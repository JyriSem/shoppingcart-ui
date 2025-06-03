<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister" class="p-4 card">
      <h2 class="text-center mb-4">Register</h2>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" id="username" class="form-control" placeholder="Enter username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter password" required />
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
      <div class="text-center mt-3">
        <a href="#" @click="$emit('switch-to-login')">Already have an account? Log in</a>
      </div>
    </form>
  </div>
</template>

<script>
import { register } from '@/services/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        await register(this.username, this.password);
        this.successMessage = 'Registration successful! Please log in.';
        this.errorMessage = '';
        this.username = '';
        this.password = '';
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Registration failed';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
/* No component-specific styles needed; moved to global.css */
</style>