<template>
    <div id="main-container" class="beautiful-colors">
        <HeaderComponent />
        <UserData />
        <BirdList />
    </div>


</template>

<script>
import HeaderComponent from '../components/general/HeaderComponent.vue';
import UserData from '@/components/profile/UserData.vue';
import BirdList from '@/components/profile/BirdList.vue';
export default {
    components: {
        HeaderComponent,
        UserData,
        BirdList,
    }

};
</script>

<style>
#main-container {
    min-height: 100vh;
}

.beautiful-colors {
    background: rgb(23, 173, 162);
    background: linear-gradient(142deg, rgba(23, 173, 162, 1) 0%, rgba(201, 102, 95, 1) 34%, rgba(200, 218, 49, 1) 66%, rgba(74, 255, 0, 1) 100%);
}
</style>