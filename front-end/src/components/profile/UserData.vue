<template>
    <v-container>
      <v-card class="profile-card">
        <div class="profile-content">
          <v-avatar size="150" class="profile-avatar">
            <v-img 
            :src="user.profilePicture ? user.profilePicture : 'https://myrightbird.com/assets/uploads/mybird_sun_conure_on_perch.jpg'"
          ></v-img>
          </v-avatar>
          <div class="profile-info">
            <div class="info-row">
              <span class="label">Username:</span>
              <span class="value">{{ user.username }}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">{{ user.phoneNumber }}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{ user.email }}</span>
            </div>
          </div>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-card {
    max-width: 50rem;
    margin: auto;
    padding: 20px;
    background-color: rgb(36, 111, 39);
    font-family: "Roboto", sans-serif;
  }
  
  .profile-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .profile-avatar {
    flex-shrink: 0;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .label {
    font-weight: bold;
    color: orange;
    font-size: 1.5rem;
    min-width: 120px;
  }
  
  .value {
    color: white;
    font-size: 1.5rem;
    flex-grow: 1;
    text-align: right;
  }

  @media only screen and (max-width: 600px) {
    .profile-content{
      flex-direction: column;
    }
    .value{
      font-size: 1rem;
    }
  }
  </style>
  