export const runtime = "nodejs";
import { NextRequest } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract rating and floor it
    const ratingStr = $(".rating-number").first().text().trim();
    const rating = Math.floor(Number(ratingStr) || 0);

    // Assign stars based on rating
    let stars = "1⭐";
    if (rating >= 2500) stars = "7⭐";
    else if (rating >= 2200) stars = "6⭐";
    else if (rating >= 2000) stars = "5⭐";
    else if (rating >= 1800) stars = "4⭐";
    else if (rating >= 1600) stars = "3⭐";
    else if (rating >= 1400) stars = "2⭐";

    // Extract username (from profile page)
    const user =
      $(".user-details-container header h2").first().text().trim() || username;

    // Extract problems solved
    let problemsSolved = "";
    $('h3').each((i, el) => {
      const text = $(el).text();
      if (text.startsWith("Total Problems Solved:")) {
        const match = text.match(/Total Problems Solved:\s*(\d+)/);
        if (match) {
          problemsSolved = match[1];
        }
      }
    });

    return new Response(
      JSON.stringify({
        username: user,
        rating: rating.toString(),
        stars,
        problemsSolved,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch CodeChef data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}