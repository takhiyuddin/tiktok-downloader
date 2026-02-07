"use server";

export async function getVideoData(url: string) {
    if (!url.includes("tiktok.com")) return { error: "Link tidak valid." };

    try {
        const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.code === 0) {
            return {
                success: true,
                data: {
                    title: data.data.title,
                    cover: data.data.cover,
                    author: data.data.author.nickname,
                    play: data.data.play,  // Video No-Watermark
                    music: data.data.music // Audio
                },
            };
        } else {
            return { error: "Video tidak ditemukan." };
        }
    } catch (err) {
        return { error: "Terjadi kesalahan server." };
    }
}