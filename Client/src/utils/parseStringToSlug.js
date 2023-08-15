export function parseStringToSlug(string) {
    return string?.toLowerCase().split(" ").join("-");
}
