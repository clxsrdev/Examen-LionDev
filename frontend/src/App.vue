<script setup>
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
</script>

<template>
  <router-view />
  <ConfirmDialog />
  <Toast />
</template>
