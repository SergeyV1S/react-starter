import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { signUpSchema } from "../lib";

export const useSignUpForm = () => {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      phone: "",
      role: "user",
      mail: "",
      password: ""
    }
  });

  const isDisabled =
    !signUpForm.formState.dirtyFields.firstName ||
    !signUpForm.formState.dirtyFields.mail ||
    !signUpForm.formState.dirtyFields.password ||
    !signUpForm.formState.dirtyFields.phone ||
    !signUpForm.formState.dirtyFields.secondName;

  return { signUpForm, isDisabled };
};
