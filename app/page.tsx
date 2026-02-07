"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Link as LinkIcon } from "lucide-react";
import { getVideoData } from "./actions";
import VideoResult from "@/components/VideoResult";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    setResult(null);

    const res = await getVideoData(url);
    if (res.error) setError(res.error);
    else setResult(res.data);

    setLoading(false);
  };

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative bg-white py-12 px-4 transition-all">

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f5f5f5_100%)]"></div>

      {/* Wrapper Konten */}
      <div className="w-full max-w-xl flex flex-col items-center space-y-8 z-10">

        {/* Header Section (Hanya Icon & Judul) */}
        <div className="text-center space-y-4 animate-enter">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-100/80 mb-2 text-neutral-900 shadow-sm border border-neutral-100">
            <LinkIcon size={22} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            TikTok Downloader
          </h1>

          {/* Deskripsi telah dihapus sesuai permintaan */}
        </div>

        {/* Input Form */}
        <div className="w-full animate-enter [animation-delay:100ms]">
          <form onSubmit={handleSubmit} className="relative group w-full">
            <div className="relative shadow-lg shadow-neutral-200/50 rounded-2xl">
              <Input
                placeholder="Tempel tautan TikTok di sini..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-20 h-14 sm:h-16 text-base sm:text-lg pl-6 rounded-2xl border-neutral-200 focus:border-neutral-900 focus:ring-0"
              />
              <div className="absolute right-2 top-2 bottom-2">
                <Button
                  type="submit"
                  disabled={loading || !url}
                  className="h-full rounded-xl px-4 sm:px-6 aspect-auto bg-neutral-900 hover:bg-neutral-800 transition-all active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5 text-white" /> : <ArrowRight className="w-5 h-5 text-white" />}
                </Button>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex justify-center animate-enter">
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 py-2 px-4 rounded-full font-medium">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Result Section */}
        {result && (
          <div className="w-full animate-enter [animation-delay:200ms] pb-4">
            <VideoResult data={result} />
          </div>
        )}

      </div>

      {/* Footer Otomatis */}
      {!result && (
        <footer className="absolute bottom-6 text-xs text-neutral-400 font-medium text-center w-full">
          &copy; {new Date().getFullYear()} Takhiyuddin.com. All rights reserved.
        </footer>
      )}
      {result && (
        <footer className="mt-12 text-xs text-neutral-400 font-medium text-center w-full">
          &copy; {new Date().getFullYear()} Takhiyuddin.com. All rights reserved.
        </footer>
      )}
    </main>
  );
}