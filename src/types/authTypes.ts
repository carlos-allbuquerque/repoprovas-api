import { User } from "@prisma/client";
export type userData = Omit<User, "id" | "createdAt" >;

export type newUserData = {
    email: string;
    password: string;
    confirmPassword: string;
}

