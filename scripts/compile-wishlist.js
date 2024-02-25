const fetch = require("node-fetch");
const { format, subDays, formatISO } = require("date-fns");
const fs = require("fs");
// const collectionId = process.env.RAINDROP_WISHLIST_COLLECTION_ID;
// const token = process.env.RAINDROP_TOKEN;
const collectionId = "4167541992274753";
const token = "7b28ab59-d109-49e5-a7f2-427d885c2915";
const today = new Date();
const lastSaturday = subDays(today, 7);
const formattedLastSunday = format(lastSaturday, "yyyy-MM-dd");
const formattedToday = format(today, "yyyy-MM-dd");
const formattedPostDate = formatISO(today);

async function fetchWishlist() {
  // Get content bookmarked between last Sunday and this Saturday inclusive
  const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);
  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await rsp.json();
}
function writeWishlist(raindrops) {
  const formattedLinks = raindrops.map((raindrop) => {
    const { link, title, note } = raindrop;
    return `* [${title}](${link}) ${note}`;
  });
  let postContent = fs.readFileSync("./scripts/wishlist_template.md", "utf8");
  postContent = postContent.replace("{{date}}", formattedPostDate);
  postContent = postContent.replace("{{links}}", formattedLinks.join("\n"));
  const filename = `./src/blog/wishlist.md`;
  if (process.env.DEBUG) {
    console.log(postContent);
    return;
  }
  fs.writeFileSync(`./src/blog/wishlist.md`, postContent);
}

async function main() {
  fetchWishlist().then((res) => {
    if (res.items.length === 0) {
      console.log("No links found, exiting");
      return;
    }
    writeWishlist(res.items);
  });
}

main();