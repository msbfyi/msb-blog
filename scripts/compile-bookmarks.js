import fetch from "node-fetch";
import { format, subDays, formatISO } from "date-fns";
import { readFileSync, writeFileSync } from "fs";
// const token = process.env.103SOCIAL_USER_TOKEN;
const token = "UhPoZ6AWcFOsxHQRE0sJqXt6FdvZeEMOLC2OyFnQ6xE";
const today = new Date();
const formattedToday = format(today, "yyyy-MM-dd");
const formattedPostDate = formatISO(today);

async function fetchBookmarks() {
  // Get content bookmarked between last Sunday and this Saturday inclusive
  const url = new URL("https://103.social/api/v1/bookmarks?since_id=184");
  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(rsp);
  return await rsp.json();
}

function writePost(bookmarks) {
  console.log("test");
  // console.log(bookmarks);
  const formattedBookmarks = bookmarks.map((bookmark) => {
    // const { link, title, note } = bookmark;
    // return `* [${title}](${link}) ${note}`;
    const { id } = bookmark;
    return `id: ${id}`;
  });
  // let postContent = readFileSync("./scripts/link_template.md", "utf8");
  // postContent = postContent.replace("{{date}}", formattedPostDate);
  // postContent = postContent.replace("{{links}}", formattedLinks.join("\n"));
  // const filename = `./src/social-bookmarks/${formattedToday}.md`;
  // if (process.env.DEBUG) {
    console.log(formattedBookmarks);
    return;
  // }
  // writeFileSync(`./src/social-bookmarks/${formattedToday}.md`, postContent);
}

async function main() {
  fetchBookmarks().then((res) => {
    if (res.length === 0) {
      console.log("No bookmarks found, exiting");
      return;
    }
    writePost(res);
  });
}

main();