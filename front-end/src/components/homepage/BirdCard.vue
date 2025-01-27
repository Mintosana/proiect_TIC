<template>
  <router-link :to="`/bird/${bird.id}`" class="bird-card-link">
    <div class="bird-card">
      <img :src="bird.photo" alt="Bird photo" class="bird-photo" />

      <div class="bird-info">
        <h3 class="bird-name">{{ bird.name }}</h3>
        <p class="bird-details">
          <span><strong>Species:</strong> {{ bird.species }}</span><br />
          <span><strong>Age:</strong> {{ bird.age }} years</span><br />
          <span><strong>Price:</strong> ${{ bird.price }}</span>
        </p>
        <p class="bird-description">{{ bird.description }}</p>
      </div>
    </div>
  </router-link>
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
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 12px;
}

.bird-photo {
  width: 100%;
  height: 200px;
  object-fit: fill;
  background-color: #eaeaea;
}

.bird-info {
  padding: 16px;
}

.bird-name {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 8px;
}

.bird-details {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 12px;
  line-height: 1.5;
}

.bird-description {
  font-size: 0.85em;
  color: #666;
  margin-top: 12px;
}

.bird-card-link {
  text-decoration: none;
  color: inherit;
}

.bird-card-link:hover .bird-card {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>