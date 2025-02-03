<template>
  <v-card-text class="right-section">
    <v-list>
      <v-list-item>
        <strong>Species:</strong> {{ bird.species }}
      </v-list-item>
      <v-list-item>
        <strong>Age:</strong> {{ bird.age }} years
      </v-list-item>
      <v-list-item>
        <strong>Price:</strong> ${{ bird.price }}
      </v-list-item>
    </v-list>
    <v-divider class="my-4"></v-divider>
    <p>{{ bird.description }}</p>
  </v-card-text>
</template>

<script>
export default {
  props: {
    bird: Object,
  },
};
</script>

<style scoped>
.right-section {
  flex: 2;
  text-align: left;
  position: relative;
  max-height: 60rem;
  overflow-y: auto;
}

p {
  font-size: 14px;
  line-height: 1.6;
}
</style>