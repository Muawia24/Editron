import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import "server-only";

export function getRateLimiter() {
    let rateLimit: Ratelimit | undefined;

    if (process.env.UPSTASH_REDIS_URL) {
        rateLimit = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.fixedWindow(5, "1d"),
            analytics: true,
            prefix: "Editron",
        });
    }
    return rateLimit;
}

export async function getIPAddress() {
    const FALLBACK_IP_ADDRESS = "0.0.0.0";
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
    }
    return headersList.get("x-real-ip") ?? FALLBACK_IP_ADDRESS
}
