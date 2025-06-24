import ViewNFTsClient from "./ViewNFTsClient";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// ────────────────────────────────────────────────────────────────────────────────
// 📜  Route Metadata (server component: do NOT add "use client")
// ────────────────────────────────────────────────────────────────────────────────

export const metadata = getMetadata({
  title: "View NFTs",
  description: "Latest BlockMagicians minted",
});

// ────────────────────────────────────────────────────────────────────────────────
// 🖼️  Page Component — Wrapped in the same gradient/glow layout as About page
// ────────────────────────────────────────────────────────────────────────────────

export default function ViewNFTsPage() {
  return (
    <section className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20">
      {/* decorative background glow */}
      <div className="absolute inset-0 -z-10 opacity-20 blur-[120px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-cyan-400/70 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ViewNFTsClient />
      </div>
    </section>
  );
}
