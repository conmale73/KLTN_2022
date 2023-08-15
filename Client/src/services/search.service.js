import { axiosClient } from "~/api";

export const searchService = {
    search(query, type, region, language) {
        return axiosClient.get(
            `/search/?q=${query}&f=${type}&r=${region}&l=${language}`
        );
    },
    query(query) {
        return axiosClient.get(`/query/?q=${query}`);
    },
};
