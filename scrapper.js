const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = "https://artfacts.net/lists/global_top_100_artists";

(async () => {
  const browser = await puppeteer.launch();
  //   console.info("browser: ", browser);
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(1000 * 3);
  // await page.waitForSelector(
  //   ".app-js-components-lists-ArtistRankList__desktopOnly"
  // );
  //   await page.screenshot({ path: "example.png" });
  const html = await page.content();
  let res = [];
  const $ = await cheerio.load(html);

  $("tbody > tr").each((index, element) => {
    const tds = $(element).find("td");
    let artist = $(tds[0]).text();
    // $(elem) gets jQuery elem as output, $($()) translates into DOM elem
    let born = $(tds[1]).text();
    let deceased = $(tds[2]).text() ? $(tds[2]).text() : 0;
    let nationality = $(tds[3]).text();
    let rank = $(tds[4]).text();
    res[index] = {
      artist: artist,
      born: born,
      deceased: deceased,
      nationality: nationality,
      rank: rank,
    };
  });
  console.log(res);
  await browser.close();
})();
