import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signup } from "../api/members/signup";

// 7주차 try/catch/finally + isSubmitting을 useMutation 하나로 대신함
// try 안의 성공 처리 → onSuccess, catch 안의 실패 처리 → onError
export function useSignupMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      alert(response.message);
      navigate({ to: "/login" });
    },
    onError: () => {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
