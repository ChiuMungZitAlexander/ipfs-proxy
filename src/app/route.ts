import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const maxDuration = 15;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const ipfs = searchParams.get("ipfs");

  if (!ipfs || !/ipfs:\/\//.test(ipfs)) {
    return new Response("Invalid ipfs", {
      status: 400,
    });
  }

  try {
    const response = await axios({
      url: ipfs.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/"),
      method: "GET",
      responseType: "stream",
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": response.headers["content-type"],
      },
    });
  } catch (error) {
    console.error("Error fetching IPFS content:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
};
