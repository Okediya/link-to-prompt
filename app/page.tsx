/**
 * page.tsx — Main application page for Link to Prompt.
 *
 * Layout:
 *  - Header: Logo + app name + URL input + Generate button
 *  - Centered panel: Editable prompt viewer
 *
 * Uses a manual fetch to /api/generate for initial prompt generation.
 */

"use client";

import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Copy, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Logo from "@/components/Logo";

export default function HomePage() {
  // --- State ---
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // --- Handlers ---

  /** Generate the initial prompt from a URL. */
  const handleGenerate = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!url.trim()) {
        toast.error("Please enter a valid URL.");
        return;
      }

      setIsGenerating(true);
      setPrompt("");
      setHasGenerated(false);

      let targetUrl = url.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = `https://${targetUrl}`;
      }

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: targetUrl }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Generation failed.");
        }

        setPrompt(data.prompt);
        setHasGenerated(true);
        toast.success("Prompt generated successfully. You can edit it below.");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [url]
  );

  /** Copy the current prompt to clipboard. */
  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard.");
    } catch {
      toast.error("Failed to copy. Please try manually.");
    }
  }, [prompt]);

  // --- Render ---

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* ====== HEADER ====== */}
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 shrink-0">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Logo className="w-16 h-8 md:w-20 md:h-10" />
          <h1 className="text-lg md:text-xl font-light tracking-wide text-[#C0C0C0] hidden sm:block">
            Link to Prompt
          </h1>
        </div>

        {/* URL Input + Generate Button */}
        <form
          onSubmit={handleGenerate}
          className="flex items-center gap-2 flex-1 max-w-2xl"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
            className="flex-1 h-10 px-4 text-sm bg-transparent border border-[#C0C0C0]/20 rounded-md text-white placeholder:text-[#C0C0C0]/40 focus:outline-none focus:border-[#C0C0C0]/50 transition-colors"
            disabled={isGenerating}
          />
          <Button
            type="submit"
            disabled={isGenerating || !url.trim()}
            variant="outline"
            className="h-10 px-5 bg-transparent border-[#C0C0C0]/30 text-[#C0C0C0] hover:bg-[#C0C0C0]/10 hover:text-white transition-all disabled:opacity-30 shrink-0"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline mr-2">Generate Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </header>

      {/* ====== MAIN CENTERED PANEL ====== */}
      <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto w-full flex flex-col min-h-full">
          {/* Panel header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[#C0C0C0]/80 tracking-wide">
              {hasGenerated ? "Editable Generated Prompt" : "Generated Prompt"}
            </h2>
            {prompt && (
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs bg-transparent border-[#C0C0C0]/20 text-[#C0C0C0] hover:bg-[#C0C0C0]/10 hover:text-white transition-all shrink-0"
              >
                <Copy className="w-3.5 h-3.5 mr-2" />
                Copy Output
              </Button>
            )}
          </div>

          {/* Prompt display/editor */}
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] border border-white/5 rounded-lg bg-[#111111]/50 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#C0C0C0]/40" />
              <p className="text-sm text-[#C0C0C0]/40 tracking-wide">
                Scraping and analyzing website structure...
              </p>
            </div>
          ) : prompt ? (
            <Card className="flex-1 bg-[#111111] border-white/10 p-1 flex flex-col overflow-hidden shadow-2xl">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[600px] p-5 bg-transparent text-white font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-white/20 custom-scrollbar"
              />
            </Card>
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[400px] border border-white/5 rounded-lg border-dashed">
              <p className="text-sm text-[#C0C0C0]/30 text-center max-w-sm leading-relaxed">
                Your generated prompt will appear here. Paste a URL above
                and click Generate to begin. Once generated, you can manually
                edit the prompt to refine it exactly how you want.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
