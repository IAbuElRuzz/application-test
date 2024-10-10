
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.email" type="email" placeholder="Email" required>
    <input v-model="formData.password" type="password" placeholder="Password" required>
    <button type="submit">Sign In</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/auth/signin', this.formData);
        if (response.status === 200) {
          this.$router.push('/welcome');
        }
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  }
}
</script>
    