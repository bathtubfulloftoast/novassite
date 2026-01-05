import colors from 'colors';

const cache = new Map();

export async function fetcher(CACHE_DURATION, url, service) {
   const entry = cache.get(url);

   if (entry && (Date.now() - entry.timestamp < CACHE_DURATION)) {
      const remaining = CACHE_DURATION - (Date.now() - entry.timestamp);
      return {
         ...entry.data,
         ...(process.env.DEVMODE === "true" && {
            cache_remaining: Math.floor(remaining / 1000),
         }),
      };
   }

   try {
      const response = await fetch(url);
      const data = await response.json();

      cache.set(url, {
         data,
         timestamp: Date.now(),
      });

      console.log(`${colors.green("[Site]")} grabbed from ${service}`);
      return {
         ...data,
         ...(process.env.DEVMODE === "true" && {
            cache_remaining: Math.floor(CACHE_DURATION / 1000),
         }),
      };
   } catch (error) {
      console.log(`${colors.red("[ERROR]")} failed to grab from ${service}`);
      console.error(error);
      return {error: "Failed to fetch data"};
   }
}
