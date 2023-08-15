import { axiosClient } from "~/api";

export const recommendationService = {
    getHome(region, language) {
        return axiosClient.get(`/home?r=${region}&l=${language}`);
    },
};
