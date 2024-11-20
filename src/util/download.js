import axios from "axios";

export const downloadFile = async (fileUrl) => {
  try {
    const link = document.createElement("a"); // a 태그 생성
    link.href = fileUrl; // a태그의 경로에 다운로드 파일 url 설정

    document.body.appendChild(link); // dom에 추가
    link.click(); // click 이벤트 강제 발생
    document.body.removeChild(link); // html의 body에서 a태그 삭제
  } catch (error) {
    console.error(error);
  }
};
