const filename = process.argv[2] || "docs/index.html";
const fs = require("fs");

const cheerio = require("cheerio");

const htmlString = fs.readFileSync(filename, "utf8");
const $ = cheerio.load(htmlString);

$("#n-recentchanges").remove();
$("#n-randompage").remove();
$("#n-help").remove();
$("#p-tb").remove(); // remove toolbox

$("#footer-places").remove();
$("#footer-icons").remove();

$("#mw-head").remove();

// remove all links to edit pages
$(".mw-editsection").remove();

// remove all additional-links to a users
$(".mw-usertoollinks").remove();

$(".printfooter").remove();
$('link[type="application/x-wiki"]').remove();
$('link[type="application/rsd+xml"]').remove();
$('link[type="application/atom+xml"]').remove();
$('link[rel="edit"]').remove();

// no js needed
$('script[src^="load.php"]').remove();

// remove all links with no existing href
$("a.new").each(function () {
  $(this).replaceWith($(this).text());
});

fs.writeFileSync(filename, $.html());

console.log(`${filename} processed`);
