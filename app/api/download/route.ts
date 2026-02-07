import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const filename = searchParams.get("filename") || "video.mp4";

    if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

    try {
        const response = await fetch(url);
        const contentType = response.headers.get("content-type") || "video/mp4";
        return new NextResponse(response.body, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}