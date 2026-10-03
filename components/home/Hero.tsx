import { Mail } from "lucide-react";
import { Fragment } from "react";
import type { SVGProps } from "react";

import { personal, sections } from "@/lib/data";

import { Collapsible, delay, Rule, rowDelay } from "./Section";
import { sectionContent } from "./SectionContent";
import { SectionNav } from "./SectionNav";

// Outline GitHub mark, drawn to match lucide's 1.5px stroke icons.
function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const socials = [
  {
    label: "GitHub",
    href: personal.github,
    icon: GitHubIcon,
    newTab: true,
  },
  {
    label: `Email ${personal.email}`,
    href: `mailto:${personal.email}`,
    icon: Mail,
    newTab: false,
  },
];

// "Johnny Dao" renders as J[ohnny ]D[ao]. While a section is open the bracketed
// parts fold to zero width, leaving "JD".
const nameParts = personal.name.split(" ").map((word, i, words) => ({
  initial: word[0],
  rest: word.slice(1) + (i < words.length - 1 ? "\u00a0" : ""),
}));

export function Hero() {
  return (
    <header className="home-hero flex flex-col items-center pt-[clamp(4.5rem,13vh,8.5rem)] text-center">
      <h1
        aria-label={personal.name}
        className="home-name home-enter font-serif text-[clamp(4.5rem,16vw,7.5rem)] font-normal italic leading-[0.95] tracking-[-0.01em] text-fg"
        style={delay(0, { "--rise": "0.06em", "--blur": "14px" })}
      >
        {nameParts.map(({ initial, rest }) => (
          <Fragment key={initial + rest}>
            <span aria-hidden="true" className="inline-block align-top">
              {initial}
            </span>
            <span aria-hidden="true" className="home-name-rest inline-grid align-top">
              {/* Padding plus matching negative margin gives slanted glyphs room
                  past the clip edge without changing the width. */}
              <span className="-mx-[0.1em] min-w-0 overflow-x-clip whitespace-pre px-[0.1em]">{rest}</span>
            </span>
          </Fragment>
        ))}
      </h1>

      <Collapsible>
        <div className="mt-9 flex items-center justify-center gap-5 sm:mt-10 sm:gap-7">
          <Rule side="left" delay={420} />
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon, newTab }, i) => (
              <li key={href} className="home-enter" style={delay(520 + i * 80, { "--rise": "0.375rem" })}>
                <a
                  href={href}
                  aria-label={newTab ? `${label} (opens in a new tab)` : label}
                  className="flex size-11 items-center justify-center text-fg outline-none transition-opacity duration-300 hover:opacity-55 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-fg"
                  {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-[1.4rem]" />
                </a>
              </li>
            ))}
          </ul>
          <Rule side="right" delay={420} />
        </div>
      </Collapsible>

      <Collapsible>
        <p
          className="home-enter mx-auto mt-14 max-w-[36rem] font-serif text-[clamp(1.375rem,3.4vw,1.75rem)] italic leading-[1.4] text-fg-soft [text-wrap:balance] sm:mt-[4.5rem]"
          style={delay(680)}
        >
          Computer science student at UMKC. I research <span className="whitespace-nowrap">AI-agent</span> security and build desktop and iOS apps.
        </p>
      </Collapsible>

      <SectionNav content={sectionContent} />

      <Collapsible>
        <p
          className="home-enter mt-11 font-serif text-[1.125rem] italic text-muted [text-wrap:balance] sm:mt-12"
          style={rowDelay(sections.length + 1, 140)}
        >
          Based in Shawnee, Kansas. Graduating {personal.graduation}.
        </p>
      </Collapsible>
    </header>
  );
}
