import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

// 초기 상태 정의
const initState = {
  token: "", // 접근 토큰(JWT)
  user: {
    username: "", // 사용자 ID
    email: "", // Email
    roles: [], // 권한 목록
  },
};

// 인증 관련 스토어 정의
export const useAuthStore = defineStore("auth", () => {
  const state = ref({ ...initState }); // 상태 초기화

  const isLogin = computed(() => !!state.value.user.username); // 로그인 여부, !!를 붙이면 boolean으로 형변환

  const username = computed(() => state.value.user.username); // 로그인 사용자 ID

  const email = computed(() => state.value.user.email); // 로그인 사용자 email

  const login = async (member) => {
    //state.value.token = "test token";
    //state.value.user = {username: member.username, email: member.username + "@test.com",};

    // api 호출
    const { data } = await axios.post("/api/auth/login", member);
    state.value = { ...data };

    // stringfy : JSON 데이터를 'auth'라는 이름으로 Sritng화 시켜서 로컬 스토리지에 저장 (직렬화)
    localStorage.setItem("auth", JSON.stringify(state.value));
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.clear(); // 로컬스트로지 비우기
    state.value = { ...initState }; // 상태 초기화
  };

  // 토큰을 가져오는 함수
  const getToken = () => state.value.token;

  // 저장된 인증 정보를 불러오는 함수
  const load = () => {
    // 저장해둔 키값으로 로컬 스토리지에서 데이터를 가져온다
    const auth = localStorage.getItem("auth");
    if (auth != null) {
      // parse : String을 JSON 데이터로 변환 (역직렬화)
      state.value = JSON.parse(auth);
      console.log(state.value);
    }
  };
  // 사용자의 프로필(이메일)을 변경하는 함수
  const changeProfile = (member) => {
    state.value.user.email = member.email;
    // 이미 auth 정보가 있는 경우 덮어쓴다
    localStorage.setItem("auth", JSON.stringify(state.value));
  };

  load(); // 스토어가 초기화될때 인증 정보 로드

  // 외부 클래스에서 사용하기 위해서는 return문 필수
  return {
    state,
    username,
    email,
    isLogin,
    changeProfile,
    login,
    logout,
    getToken,
  };
});
