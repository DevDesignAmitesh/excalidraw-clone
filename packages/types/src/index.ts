import z from "zod";
import { config } from "dotenv";
config();

export const SignUpTypes = z.object({
  name: z.string().min(3, "name it too short").max(20, "name is too long"),
  email: z
    .string()
    .min(4)
    .email("this is not a valid email")
    .max(20, "email is too long"),
  password: z
    .string()
    .min(5, "password is to short")
    .max(20, "password is too long"),
});

export const SignInTypes = z.object({
  email: z.string().min(4).email("this is not a valid email"),
  password: z.string().min(5, "password is to short"),
});

export const CreateRoomTypes = z.object({
  name: z.string().min(4, "name is too short").max(20, "name is too long"),
  slug: z.string().min(4, "slug is too short").max(20, "slug is too long"),
});

export const JWT_SECRET = "JWT_SECRETudcif398f3iufwdcsx23y3948fy29ew8ch";
