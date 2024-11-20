<script setup>
import { computed } from "vue";
import MenuItem from "./MenuItem.vue";
import AccountMenuItem from "./AccountMenuItem.vue";
import LogoutMenuItem from "./LogoutMenuItem.vue";
import config from "@/config";

const { login, join } = config.accountMenus;
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();
// 로그인 여부
const isLogin = computed(() => auth.isLogin); // 로그인 상태를 반응형으로 처리
const username = computed(() => auth.username);
</script>

<template>
  <ul class="navbar-nav ms-auto">
    <!-- isLogin이 true인 경우 해당 템플릿으로 묶은 부분을 렌더링한다 -->
    <!-- v-if는 실제로 요소를 구조에서 없앴다가 다시 만들지만 v-show는 요소는 그대로인 상태로 display만 none으로 변경한다 -->
    <!-- template은 실제 구조에서는 보이지 않지만 로직에서 어떤 태그들을 묶어서 처리하는 용도로 사용된다 -->
    <template v-if="isLogin">
      <!-- AccountMenuItem으로 username이라는 props를 넘겨준다 -->
      <AccountMenuItem :username="username" />
      <LogoutMenuItem />
    </template>
    <!-- isLogin이 false인 경우 -->
    <template v-else>
      <!-- MenuItem으로 menu라는 props를 넘겨준다 -->
      <MenuItem :menu="login" />
      <MenuItem :menu="join" />
    </template>
  </ul>
</template>
