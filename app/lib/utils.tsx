export function encryptId(id: number): string {
    return btoa(id.toString()).replace(/=/g, "");
}

export function generateRandomId(): string {
    const numericId = Math.floor(1000 + Math.random() * 9000);
    return encryptId(numericId);
}
