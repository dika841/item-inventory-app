import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TLoginForm } from "../_schema/login.schema";
import { signIn } from "next-auth/react";
import { message } from "antd";

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login-by-credentials"],
    mutationFn: async (payload: TLoginForm) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: payload.email,
        password: payload.password,
      });
      if (!res?.ok) {
        return Promise.reject(res?.error);
      }
      return Promise.resolve(res);
    },
    onSuccess: () => {
      message.success("Login successfully");
      router.push("/");
    },
    onError: (error: string) => {
      message.error(error);
    },
  });
};
