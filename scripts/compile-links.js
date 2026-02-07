import fetch from "node-fetch";
import { format, subDays, formatISO } from "date-fns";
import { readFileSync, writeFileSync } from "fs";
const token = process.env.RAINDROP_TOKEN;
const today = new Date();
const formattedToday = format(today, "yyyy-MM-dd");
const formattedPostDate = formatISO(today);

async function fetchLinks() {
  if (!token) {
    throw new Error("RAINDROP_TOKEN environment variable is not set");
  }
  // Get content bookmarked between last Sunday and this Saturday inclusive
  const url = new URL("https://api.raindrop.io/rest/v1/raindrops/0?search=%23weekly");
  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!rsp.ok) {
    throw new Error(`Failed to fetch links: ${rsp.status} ${rsp.statusText}`);
  }
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
  if (!rsp.ok) {
    throw new Error(`Failed to archive links: ${rsp.status} ${rsp.statusText}`);
  }
  return await rsp.json();
}
function writePost(raindrops) {
  const formattedLinks = raindrops.map((raindrop) => {
    const { link, title, note } = raindrop;
    return `* [${title}](${link}) ${note}`;
  });
  let postContent = readFileSync("./scripts/link_template.md", "utf8");
  postContent = postContent.replace("{{date}}", formattedPostDate);
  postContent = postContent.replace("{{links}}", formattedLinks.join("\n"));
  const filename = `./src/blog/links/${formattedToday}.md`;
  if (process.env.DEBUG) {
    console.log(postContent);
    return;
  }
  writeFileSync(`./src/blog/links/${formattedToday}.md`, postContent);
}

async function main() {
  try {
    const res = await fetchLinks();
    if (!res.items || res.items.length === 0) {
      console.log("No links found, exiting");
      return;
    }
    writePost(res.items);
    await archiveLinks();
    console.log("Links archived");
  } catch (err) {
    console.error("Error compiling links:", err.message);
    process.exit(1);
  }
}

main();