const fetch = require("node-fetch");
const { format, subDays, formatISO } = require("date-fns");
const fs = require("fs");
const token = process.env.RAINDROP_TOKEN;
const today = new Date();
const formattedToday = format(today, "yyyy-MM-dd");
const formattedPostDate = formatISO(today);

async function fetchLinks() {
  // Get content bookmarked between last Sunday and this Saturday inclusive
  const url = new URL("https://api.raindrop.io/rest/v1/raindrops/0?search=%23weekly");
  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(rsp);
  return await rsp.json();
}
async function archiveLinks() {
  // Archive this week's links
  const url = new URL("https://api.raindrop.io/rest/v1/tags/0");
  const rsp = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "replace": `Posted ${formattedToday}`,
      "tags": ["weekly"]
  }),
  });
  return await rsp.json();
}
function writePost(raindrops) {
  const formattedLinks = raindrops.map((raindrop) => {
    const { link, title, note } = raindrop;
    return `* [${title}](${link}) ${note}`;
  });
  let postContent = fs.readFileSync("./scripts/link_template.md", "utf8");
  postContent = postContent.replace("{{date}}", formattedPostDate);
  postContent = postContent.replace("{{links}}", formattedLinks.join("\n"));
  const filename = `./src/blog/links/${formattedToday}.md`;
  if (process.env.DEBUG) {
    console.log(postContent);
    return;
  }
  fs.writeFileSync(`./src/blog/links/${formattedToday}.md`, postContent);
}

async function main() {
  fetchLinks().then((res) => {
    if (res.items.length === 0) {
      console.log("No links found, exiting");
      return;
    }
    writePost(res.items);
    archiveLinks().then((res) => {
      console.log("Links archived");
    });
  });
}

main();