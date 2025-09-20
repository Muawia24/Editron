/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTogether } from "./get-together";
import { getRateLimiter, getIPAddress } from "./rate-limiter";
import { getAdjustedDimensions } from "./get-adjusted-dimentions";
import { z } from "zod";


const schema = z.object({
    ImageUrl: z.string(),
    prompt: z.string(),
    width: z.number(),
    height: z.number(),
    userAPIKey: z.string().nullable(),
    model: z
    .enum([
      "black-forest-labs/FLUX.1-kontext-dev",
      "black-forest-labs/FLUX.1-kontext-pro",
    ])
    .default("black-forest-labs/FLUX.1-kontext-dev"),
});

const ratelimit = getRateLimiter();

export async function generateImage(
    data: z.infer<typeof schema>,
) : Promise<{success: true; url: string} | { success: false; error: string }> {

    const { ImageUrl, prompt, width, height, userAPIKey, model } = schema.parse(data);

    if (ratelimit && !userAPIKey) {
        const ip = await getIPAddress();
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return { success: false, error: "No requests left. Please add your own API key or try again in 24h." };
        }
    }

    const adjustedDimentions = getAdjustedDimensions(width, height);
    const together = getTogether(userAPIKey);
    let url;
    try {
        const json = await together.images.create({
            model,
            prompt,
            width: adjustedDimentions.width,
            height: adjustedDimentions.height,
            image_url: ImageUrl,
        });
        url = json.data[0].url;
    } catch(e: any) {
        console.log(e);

        if (e.toString().includes("403")) {
            return {
                success: false,
                error:
                "You need a paid Together AI account to use the Pro model. Please upgrade by purchasing credits here: https://api.together.xyz/settings/billing.",
            };
        }
    }
    if (url) {
        return { success: true, url };
    } else {
        return { success: false, error: "Failed to generate image. Please try again." };
    }
}