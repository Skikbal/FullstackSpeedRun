import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(
  //   /[@$!%*?&]/,
  //   "Password must contain at least one special character (@$!%*?&)"
  // );

const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters long"),
  email: z.string().email("invalid email format"),
  password: passwordValidation,
});

const loginSchema = z.object({
    email: z.string().email("invalid email format"),
    password: z.string(),
  });

export { registerSchema,loginSchema };
