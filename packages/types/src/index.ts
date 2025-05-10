import z from "zod";

export const SignUpTypes = z.object({
  name: z.string().min(3, "name it too short"),
  email: z.string().min(4).email("this is not a valid email"),
  password: z.string().min(5, "password is to short"),
});

export const SignInTypes = z.object({
  email: z.string().min(4).email("this is not a valid email"),
  password: z.string().min(5, "password is to short"),
});
