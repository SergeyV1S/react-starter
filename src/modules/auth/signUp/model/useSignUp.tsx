import { useNavigate } from "react-router-dom";
import type { z } from "zod";

import { AUTH_KEY, PATHS } from "@shared/constants";
import { toast } from "@shared/hooks";
import { formatePhone } from "@shared/lib";

import { usePostRegisterMutation } from "../api/usePostCreateUser";
import type { signUpSchema } from "../lib";

export const useSignUp = () => {
  const navigate = useNavigate();

  const registerMutation = usePostRegisterMutation({
    options: {
      onSuccess: () => {
        localStorage.setItem(AUTH_KEY, "true");
        navigate(PATHS.PROFILE);
      },
      onError(error) {
        if (error?.response?.data?.message) {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Ошибка регистрации",
            description: `${error.response.data.message}`
          });
        } else {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Не удалось выполнить запрос"
          });
        }
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { firstName, mail, password, phone, role, secondName } = values;
    const formatedPhone = formatePhone(phone);

    await registerMutation.mutateAsync({
      params: {
        firstName: firstName,
        mail: mail,
        password: password,
        phone: formatedPhone,
        role: role.toUpperCase(),
        secondName: secondName
      }
    });
  };

  return { onSubmit, registerMutation };
};
