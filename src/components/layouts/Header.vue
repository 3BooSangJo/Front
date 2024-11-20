<script setup>
// @는 src 폴더를 의미한다 (설정 파일에서 정해줌)
import config from "@/config";
</script>

<template>
  <div class="jumbotron p-5 bg-primary text-white">
    <!-- 설정 파일에서 가져온 타이틀과 서브 타이틀 표시 -->
    <h1>{{ config.title }}</h1>
    <p>{{ config.subtitle }}</p>
  </div>
</template>

<style scoped>
.jumbotron {
  background-image: url("@/assets/images/bg1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
  padding: 2rem;
}
</style>
