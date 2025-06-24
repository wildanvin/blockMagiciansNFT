import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "About",
  description: "Learn more about Block Magicians",
});

const linkStyle =
  "text-emerald-400 no-underline hover:underline decoration-emerald-400 hover:decoration-cyan-300 underline-offset-4";

const About: NextPage = () => {
  return (
    <section className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20">
      {/* decorative background glow */}
      <div className="absolute inset-0 -z-10 opacity-20 blur-[120px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-cyan-400/70 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-10">
          About Block&nbsp;Magicians
        </h1>

        <article className="prose prose-invert prose-lg mx-auto">
          <p>
            Corruption, organized crime, back‑room deals, wars... No one in their right mind likes any of that, not even
            the people doing it. But for some reason we can't stop doing it... Who perpetuates this cycle?{" "}
            <strong>Moloch</strong> does.
          </p>

          <p>
            <a
              href="https://slatestarcodex.com/2014/07/30/meditations-on-moloch/"
              className={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Meditations on Moloch
            </a>{" "}
            is an essay that resonated with me years ago. It made me think that maybe we can engineer virtuous systems
            where bad actors simply can’t thrive.
          </p>

          <p>
            This NFT collection is a tribute to ten protocols that, in my view, are pushing the space forward in that
            direction. We all come to crypto for different reasons (&nbsp;
            <a
              href="https://www.youtube.com/watch?v=2XlYSmIlpfs"
              className={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              why are we here?
            </a>
            &nbsp;), but lets keep in mind that better coordination will benefit us all.
          </p>

          <p className="italic">Will we defeat Moloch? — There’s only one way to find out.</p>
        </article>
      </div>
    </section>
  );
};

export default About;
