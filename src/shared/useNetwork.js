// 네트워크 상태 확인 -> 네트워크 끊겼을 때 알럿 창 띄워주기
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
import React from "react";

const useNetwork = () => {
  // 연결상태를 true/false로 반환
  const [status, setStatus] = React.useState(navigator.onLine);
  const handleChange = () => {
    // 연결상태가 변경하면 status를 변경
    onchange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  React.useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};

export default useNetwork;
