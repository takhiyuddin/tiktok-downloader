"use client";
import { useState } from "react";
import { Download, Music, Loader2, PlayCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

interface VideoData {
  title: string;
  cover: string;
  author: string;
  play: string;
  music: string;
  images?: string[];
}

export default function VideoResult({ data }: { data: VideoData }) {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const isSlideshow = data.images && data.images.length > 0;

  const handleDownload = async (url: string, type: "vid" | "mp3" | "img", index?: number) => {
    const loadingId = index !== undefined ? `img-${index}` : type;
    setLoadingType(loadingId);

    let ext = "mp4";
    if (type === "mp3") ext = "mp3";
    if (type === "img") ext = "jpg";

    const filename = `tikload-${type}-${Date.now()}.${ext}`;
    window.location.href = `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
    setTimeout(() => setLoadingType(null), 3000);
  };

  return (
    <div className="w-full mt-6 animate-enter pb-8">
      <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm flex flex-col gap-5">
        
        {/* === HEADER INFO === */}
        <div className="flex items-start gap-4 border-b border-neutral-100 pb-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 overflow-hidden shrink-0">
                <img src={data.cover} className="w-full h-full object-cover opacity-80" />
            </div>
            <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">@{data.author}</h3>
                <p className="text-neutral-900 font-semibold leading-snug text-sm sm:text-base line-clamp-2">
                    {data.title || "Tanpa Judul"}
                </p>
                {isSlideshow && (
                   <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      <ImageIcon size={12}/> {data.images?.length} Slide
                   </span>
                )}
            </div>
        </div>

        {/* === KONTEN UTAMA === */}
        {isSlideshow ? (
            /* --- MODE SLIDESHOW --- */
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {data.images?.map((img, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 aspect-[3/4]">
                            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-x-2 bottom-2">
                                 {/* ERROR FIX: size="sm" dihapus dibawah ini */}
                                 <Button 
                                    onClick={() => handleDownload(img, "img", idx)}
                                    disabled={loadingType === `img-${idx}`}
                                    className="w-full h-8 text-[10px] sm:text-xs bg-white/90 text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-white"
                                 >
                                    {loadingType === `img-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <>Simpan <Download className="w-3 h-3 ml-1.5 opacity-60" /></>}
                                 </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            /* --- MODE VIDEO --- */
            <div className="flex flex-col gap-4">
                <div className="w-full aspect-video sm:aspect-[9/16] rounded-xl overflow-hidden bg-neutral-100 relative border border-neutral-100">
                    <img src={data.cover} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <PlayCircle className="text-white/90 w-12 h-12 drop-shadow-lg" />
                    </div>
                </div>
                
                {/* CONTAINER TOMBOL */}
                <div className="flex flex-col gap-3">
                    
                    {/* Tombol Video */}
                    <Button 
                        onClick={() => handleDownload(data.play, "vid")}
                        disabled={loadingType === "vid"}
                        className="w-full flex items-center justify-between gap-4 py-6 h-auto bg-neutral-900 hover:bg-neutral-800 shadow-md shadow-neutral-200/50"
                    >
                        <span className="font-medium text-white text-sm">Download Video</span>
                        {loadingType === "vid" ? <Loader2 className="w-4 h-4 animate-spin text-white/50"/> : <Download className="w-4 h-4 text-white/50" />}
                    </Button>

                    {/* Tombol Audio */}
                    {data.music && (
                        <Button 
                            variant="secondary"
                            onClick={() => handleDownload(data.music, "mp3")}
                            disabled={loadingType === "mp3"}
                            className="w-full flex items-center justify-between gap-4 py-4 h-auto border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300"
                        >
                            <span className="font-medium text-sm">Download Audio (MP3)</span>
                            {loadingType === "mp3" ? <Loader2 className="w-4 h-4 animate-spin"/> : <Music className="w-4 h-4 text-neutral-400"/>}
                        </Button>
                    )}
                </div>
            </div>
        )}

        {/* Jika Slideshow, Audio ditaruh disini agar rapi dibawah grid */}
        {isSlideshow && data.music && (
            <div className="pt-2"> 
                 <Button 
                    variant="secondary"
                    onClick={() => handleDownload(data.music, "mp3")}
                    disabled={loadingType === "mp3"}
                    className="w-full flex items-center justify-between gap-4 py-4 h-auto border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  >
                    <span className="font-medium text-sm">Download Musik (MP3)</span>
                    {loadingType === "mp3" ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4 text-neutral-300"/>}
                  </Button>
            </div>
        )}

      </div>
    </div>
  );
}
