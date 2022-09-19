import { faker } from "@faker-js/faker";

export function user() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    return user;
}

export function adminFactory() {
    const email = "admin@admin.com"
    const password = "admin123"
  
    return {
      email,
      password,
    };
}