import { db } from "@/lib/db";

export const twoFactorToken = async (token: string) => {
    try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
        where: {
            token
        }
    });
    return twoFactorToken;

} catch {
    return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {email}
        });
        return twoFactorToken;
    } catch (error) {
        return null;
    }
}