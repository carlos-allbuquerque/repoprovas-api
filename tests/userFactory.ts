import { faker } from "@faker-js/faker";

export function user() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    return user;
}
