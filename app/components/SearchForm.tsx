"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { getVideoData } from "@/app/actions";
import VideoResult from "./VideoResult";

export default function SearchForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError("");
        setResult(null);

        const res = await getVideoData(url);

        if (res.error) {
            setError(res.error);
        } else {
            setResult(res.data);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="relative w-full flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <Input
                        placeholder="Tempel link TikTok di sini..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-6 pr-4 h-14 text-base shadow-sm"
                    />
                </div>
                <Button
                    disabled={loading || !url}
                    type="submit"
                    className="h-14 px-8 rounded-full shrink-0"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            Download <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm border border-red-100 animate-fade-in">
                    {error}
                </div>
            )}

            {result && <VideoResult data={result} />}
        </div>
    );
}