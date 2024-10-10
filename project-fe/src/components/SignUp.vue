<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.name" type="text" placeholder="Name" required>
    <input v-model="formData.email" type="email" placeholder="Email" required>
    <input v-model="formData.password" type="password" placeholder="Password" required>
    <span v-if="passwordError" class="error">{{ passwordError }}</span>
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      },
      passwordError: '' // Error message for password validation
    }
  },
  methods: {
    validatePassword(password) {
      const minLength = 8;
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (password.length < minLength) {
        return 'Password must be at least 8 characters long.';
      }
      if (!hasLetter) {
        return 'Password must contain at least one letter.';
      }
      if (!hasNumber) {
        return 'Password must contain at least one number.';
      }
      if (!hasSpecialChar) {
        return 'Password must contain at least one special character.';
      }
      return '';
    },
    async handleSubmit() {
      // Validate password before making the request
      this.passwordError = this.validatePassword(this.formData.password);
      if (this.passwordError) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/auth/signup', this.formData);
        if (response.status === 201) {
          this.$router.push('/welcome');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
  margin-top: 5px;
}
</style>