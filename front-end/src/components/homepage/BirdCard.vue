<template>
  <v-card class="bird-card">
    <router-link :to="`/bird/${bird.id}`" class="bird-card-link">
      <v-img :src="bird.photo" height="220" cover class="bird-photo"></v-img>
      <v-card-text class="bird-info">
        <h3 class="bird-name">{{ bird.name }}</h3>
        <p class="bird-details">
          <strong>Species:</strong> {{ bird.species }} <br />
          <strong>Age:</strong> {{ bird.age }} years <br />
          <strong>Price:</strong> ${{ bird.price }}
        </p>
        <v-divider></v-divider>
        <p class="bird-description">
          {{ bird.description }}
        </p>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script>
export default {
  name: 'BirdCard',
  props: {
    bird: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.bird-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  height: 420px;
}

.bird-card:hover {
  transform: scale(1.02);
}

.bird-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.bird-photo {
  object-position: top;
}

.bird-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}

.bird-name {
  font-size: 1.3em;
  color: #333;
}

.bird-details {
  font-size: 0.9em;
  color: #555;
  margin: 8px 0;
}

.bird-description {
  font-size: 0.85em;
  color: #666;
  text-align: justify;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
