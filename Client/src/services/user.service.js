import { axiosClient } from "~/api";

export const userService = {
    login(email, password) {
        return axiosClient.post("/api/auth/login", {
            email: email,
            password: password,
        });
    },
};
