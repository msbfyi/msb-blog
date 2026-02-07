import fetch from "node-fetch";
import { format, subDays, formatISO } from "date-fns";
import { readFileSync, writeFileSync } from "fs";
// const collectionId = process.env.RAINDROP_WISHLIST_COLLECTION_ID;
const token = process.env.RAINDROP_TOKEN;
const collectionId = "41992274";
const today = new Date();
const lastSaturday = subDays(today, 7);
const formattedLastSunday = format(lastSaturday, "yyyy-MM-dd");
const formattedToday = format(today, "yyyy-MM-dd");
const formattedPostDate = formatISO(today);

async function fetchWishlist() {
  if (!token) {
    throw new Error("RAINDROP_TOKEN environment variable is not set");
  }
  // Get content bookmarked between last Sunday and this Saturday inclusive
  const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);
  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!rsp.ok) {
    throw new Error(`Failed to fetch wishlist: ${rsp.status} ${rsp.statusText}`);
  }
  return await rsp.json();
}
function writeWishlist(raindrops) {
  const formattedLinks = raindrops.map((raindrop) => {
    const { link, title, note } = raindrop;
    return `* [${title}](${link}) ${note}`;
  });
  let postContent = readFileSync("./scripts/wishlist_template.md", "utf8");
  postContent = postContent.replace("{{date}}", formattedPostDate);
  postContent = postContent.replace("{{links}}", formattedLinks.join("\n"));
  const filename = `./src/blog/wishlist.md`;
  if (process.env.DEBUG) {
    console.log(postContent);
    return;
  }
  writeFileSync(`./src/wishlist/wishlist.md`, postContent);
}

async function main() {
  try {
    const res = await fetchWishlist();
    if (!res.items || res.items.length === 0) {
      console.log("No links found, exiting");
      return;
    }
    writeWishlist(res.items);
  } catch (err) {
    console.error("Error compiling wishlist:", err.message);
    process.exit(1);
  }
}

main();