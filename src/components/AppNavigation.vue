<script setup lang="ts">
const applicationName = 'Bookmonkey Vue'
</script>

<template>
  <nav>
    <ul>
      <li><strong>{{ applicationName.toUpperCase() }}</strong></li>
    </ul>
    <ul>
      <li><a href="#">Books</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#" role="button">Login</a></li>
    </ul>
  </nav>
</template>