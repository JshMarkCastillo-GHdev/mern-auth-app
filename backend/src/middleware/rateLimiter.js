import rateLimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).send();
    }
    next(); // THIS IS A MUST to stop an endless loop of ratelimiting
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;
