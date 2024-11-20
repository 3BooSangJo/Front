<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const cr = useRoute();
const router = useRouter();
const auth = useAuthStore();

// 로그인 폼에 사용될 객체 생성
const member = reactive({
  username: "",
  password: "",
});

const error = ref(""); // 에러 메시지 담을 객체

// 제출버튼 비활성화 여부를  판단하는 속성 (username과 password가 둘 다 입력되어있는지 체크)
const disableSubmit = computed(() => !(member.username && member.password));

const login = async () => {
  try {
    await auth.login(member);
    if (cr.query.next) {
      // 로그인후 이동할 페이지 정보가 있는 경우 해당 페이지로 이동
      router.push({ name: cr.query.next });
    } else {
      // 이동 페이지 정보가 없는 경우엔 홈 화면으로 이동
      router.push("/");
    }
  } catch (e) {
    error.value = e.response.data; // 에러 메세지를 화면에 표시
  }
};
</script>

<template>
  <div class="mt-5 mx-auto" style="width: 500px">
    <h1 class="my-5">
      <i class="fa-solid fa-right-to-bracket"></i>
      로그인
    </h1>

    <!-- preventDefault : 기본 동작 실행 안함 (서버 전송) -->
    <form @submit.prevent="login">
      <div class="mb-3 mt-3">
        <label for="username" class="form-label">
          <i class="fa-solid fa-user"></i>
          사용자 ID:
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="사용자 ID"
          v-model="member.username"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          v-model="member.password"
        />
      </div>

      <!-- 에러 메시지가 있으면 화면에 포시 -->
      <div v-if="error" class="text-danger">{{ error }}</div>

      <!-- 버튼 비활성화 여부를 disableSubmit 값으로 처리함 -->
      <button
        type="submit"
        class="btn btn-primary mt-4"
        :disabled="disableSubmit"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        로그인
      </button>
    </form>
  </div>
</template>
