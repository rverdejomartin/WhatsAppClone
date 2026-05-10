<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

//variables de ayuda
const nombre = ref('');
const avatarElegido = ref(null);
const error = ref('');

//avatares predefinidos, SVGs gratuitos
const avatares = [
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Felix',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Luna',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Rocky',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Milo',
];
</script>


<template>

</template>


<style scoped>

</style>