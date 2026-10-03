import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { experience } from "@/lib/data";
import {
  benchmarks,
  ghostCommitResults,
  ghostSpliceResults,
  researchChapters,
  researchDataset,
  scannerResults,
  staticBenchmarks,
  type Benchmark,
} from "@/lib/research";

const chartPath = "/research/asset/malskillsbench-comparison.png";
const totalEntries = researchDataset.reduce((total, item) => total + item.count, 0);
const labelClass = "font-label text-[0.6875rem] font-medium uppercase tracking-[0.2em]";
const proseClass = "font-serif text-[1.1875rem] font-medium leading-[1.65] text-fg-soft sm:text-[1.3125rem] [text-wrap:pretty]";

function Chapter({ index, children }: { index: number; children: ReactNode }) {
  const chapter = researchChapters[index];

  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="research-chapter border-t border-border pt-9 sm:pt-12">
      <header className="mb-6">
        <p className={`${labelClass} mb-3 flex items-center gap-3 text-muted`}>
          <span aria-hidden="true" className="tabular-nums text-fg">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
          <span>{chapter.period} 2026</span>
        </p>
        <h3 id={`${chapter.id}-title`} className="font-serif text-[clamp(1.875rem,3.5vw,2.5rem)] font-normal leading-[1.1] text-fg">
          {chapter.title}
        </h3>
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="font-label text-[0.8125rem] leading-[1.7] text-muted">{children}</p>;
}

function ResultsTable({ caption, headings, rows }: { caption: string; headings: string[]; rows: string[][] }) {
  return (
    <>
      <div className="research-table-wrap overflow-x-auto border-y border-border" role="region" aria-label={caption} tabIndex={0}>
        <table className="research-table w-full border-collapse text-left font-label text-[0.8125rem] leading-[1.6] text-fg-soft">
          <caption className="pb-4 pt-5 text-left font-medium text-fg">{caption}</caption>
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading} scope="col" className="border-b border-border py-3 pr-5 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-muted last:pr-0">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => index === 0 ? (
                  <th key={index} scope="row" className="border-b border-border py-4 pr-5 font-medium text-fg">{cell}</th>
                ) : (
                  <td key={index} className="border-b border-border py-4 pr-5 tabular-nums last:pr-0">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 font-label text-[0.6875rem] text-muted sm:hidden">Scroll horizontally to see all columns →</p>
    </>
  );
}

function BenchmarkChart({ benchmark }: { benchmark: Benchmark }) {
  return (
    <figure className="min-w-0 border border-border bg-white/35 p-5 sm:p-6">
      <figcaption className="mb-6 font-label text-[0.875rem] font-medium text-fg">{benchmark.title}</figcaption>
      <div className="mb-4 flex items-center justify-between font-label text-[0.625rem] uppercase tracking-[0.14em] text-muted">
        <span>Profile / F1 score</span>
        <span>Cases scored</span>
      </div>
      <ul className="space-y-5">
        {benchmark.rows.map((row) => (
          <li key={row.profile} className="font-label text-[0.8125rem] leading-[1.5]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-fg">{row.profile}</span>
              <span className="shrink-0 tabular-nums text-muted">{row.scored}/200 <span className="text-[0.6875rem]">({row.scored / 2}%)</span></span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span aria-hidden="true" className="h-2.5 flex-1 bg-border/55">
                <span className="research-bar block h-full" data-tone={row.tone} style={{ width: `${row.f1 * 100}%` }} />
              </span>
              <span className="w-12 shrink-0 text-right tabular-nums text-fg"><span className="sr-only">F1 score </span>{row.f1.toFixed(4)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-3 flex justify-between pr-16 font-label text-[0.625rem] tabular-nums text-muted">
        <span>0</span><span>0.5</span><span>1.0</span>
      </div>
      {benchmark.note && <p className="mt-6 border-t border-border pt-4 font-label text-[0.75rem] leading-[1.6] text-muted">{benchmark.note}</p>}
    </figure>
  );
}

export function ExperienceResearch() {
  const role = experience[0];

  return (
    <article className="research-story">
      <header>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-5">
          <p className={`${labelClass} text-fg`}>{role.title}</p>
          <p className="font-serif text-[1.0625rem] italic text-muted">{role.period}</p>
        </div>
        <p className="mt-4 font-serif text-[1.125rem] italic text-muted">{role.subtitle}</p>
        <h3 className="mt-9 max-w-[24ch] font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.025em] text-fg [text-wrap:balance]">
          My work at the ASSET Research Lab.
        </h3>
        <h4 className="mt-4 font-serif text-[clamp(1.375rem,2.5vw,1.75rem)] font-normal leading-[1.3] text-fg-soft [text-wrap:balance]">
          Understanding defenses in the agentic AI ecosystem.
        </h4>
        <p className={`${proseClass} mt-6`}>
          As a research assistant at UMKC’s ASSET Research Lab, I’ve helped write manuscripts, reproduced attacks, recorded demonstrations, and compared security scanners on shared datasets. My research examines how AI agents encounter malicious skills, MCP servers, and plugins, and how well the defenses around them work.
        </p>
      </header>

      <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-20">
        <Chapter index={0}>
          <p className={proseClass}>
            Upon joining the research group, my first contribution was helping write the malicious-extensions manuscript using the research team’s existing corpus analysis and classifier results. The paper examines more than 100,000 AI-agent extensions (skills, MCP servers, and plugins): how reliably models and people identify malicious components, and how execution through an agent changes the harm those components can cause.
          </p>
        </Chapter>

        <Chapter index={1}>
          <p className={proseClass}>
            I reproduced GhostSplice, an attack that splits instructions across MCP tool descriptions and tool responses to induce an agent to send files to a collection tool. It was tested on GPT-5.4 and GPT-5.5 through Codex CLI at high and xhigh reasoning, with ten trials per configuration.
          </p>
          <ResultsTable
            caption="Codex CLI reproduction · successful exfiltration / trials"
            headings={["Model", "High reasoning", "xhigh reasoning"]}
            rows={ghostSpliceResults.map((result) => [result.model, result.high, result.xhigh])}
          />
          <Note>
            ASR means attack success rate. The manuscript-era tests reported 10/10 for both models at these settings. In my later reproduction, GPT-5.4 remained at 10/10 while GPT-5.5 dropped to 0/10. These results describe the tested configurations at the time of each run.
          </Note>
          <p className={proseClass}>
            I recorded six Codex-app demonstrations showing the model settings, approval decisions, and tool calls. I also helped the group write the{" "}
            <a href="https://asset-group.github.io/disclosures/ghostsplice/" target="_blank" rel="noopener noreferrer" className="research-link text-fg underline decoration-border-strong underline-offset-4">
              GhostSplice disclosure<span className="sr-only"> (opens in a new tab)</span>
            </a>.
          </p>
        </Chapter>

        <Chapter index={2}>
          <p className={proseClass}>
            I reproduced GhostCommit, which hides instructions inside an image, using fake secrets. The test checked whether a model copied the full test environment file (<code className="text-[0.8em]">.env</code>) into generated code. I ran ten trials for each of six model configurations.
          </p>
          <figure className="border-y border-border py-6">
            <figcaption className="mb-6 font-label text-[0.875rem] font-medium text-fg">Test secrets copied into generated code</figcaption>
            <ul className="space-y-5">
              {ghostCommitResults.map((result) => (
                <li key={result.model} className="grid gap-x-5 gap-y-2 font-label text-[0.8125rem] sm:grid-cols-[11rem_1fr]">
                  <div>
                    <span className="text-fg">{result.model}</span>
                    <span className="mt-0.5 block text-[0.6875rem] text-muted">{result.client}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-3 flex-1 bg-border/55">
                      <span className="block h-full bg-[#8a5140]" style={{ width: `${result.count * 10}%` }} />
                    </span>
                    <span className="w-24 shrink-0 text-right tabular-nums text-fg">{result.count}/10 · {result.count * 10}%</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-label text-[0.75rem] leading-[1.6] text-muted">10 trials per model. Success here means copying test secrets into code; it does not measure a completed external transfer.</p>
          </figure>
          <p className={proseClass}>
            I also reran and recorded the experiment in the desktop app. In the video demonstration, I opened the generated <code className="break-all text-[0.8em]">token_tracker.py</code> file to show the encoded test secret. All three tested Claude Code configurations scored 0/10 in these reproduction trials.
          </p>
          <figure>
            <div className="aspect-video overflow-hidden border border-border bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/uDzjUy2hFN4"
                title="GhostCommit experiment demonstration in the desktop app"
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="mt-3 font-label text-[0.75rem] leading-[1.6] text-muted">
              <a href="https://youtu.be/uDzjUy2hFN4" target="_blank" rel="noopener noreferrer" className="research-link inline-flex items-center gap-1.5 text-fg underline decoration-border-strong underline-offset-4">
                Watch on YouTube <ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
        </Chapter>

        <Chapter index={3}>
          <p className={proseClass}>
            I tested five existing scanners on the same 123 confirmed-malicious skill snapshots, comparing static checks with model-assisted analysis where available. Using shared inputs made it easier to inspect what each scanner noticed and what it missed.
          </p>
          <ResultsTable
            caption="Findings on 123 confirmed-malicious snapshots"
            headings={["Scanner", "Static mode", "LLM mode"]}
            rows={scannerResults.map((result) => [result.scanner, result.static, result.llm])}
          />
          <Note>
            Each scanner reports different kinds of findings and severity levels, so these counts are not equivalent detection rates. ClawScan’s LLM mode was not evaluated.
          </Note>
          <p className={proseClass}>
            <cite>How Your Credentials Are Leaked by LLM Agent Skills</cite> helped us separate credential access from an intent to steal or a completed transfer. <cite>MalSkillBench</cite> led us to test Sentry, while <cite>MalSkills</cite> motivated comparisons on a shared benchmark because of its larger published dataset.
          </p>
        </Chapter>

        <Chapter index={4}>
          <p className={proseClass}>
            We compared Cisco Skill Scanner, Caterpillar, the classification-only part of MASB, and MalSkills on the same 200 MalSkillsBench skills: 100 malicious and 100 benign. The comparisons used Luna, Qwen, and pipelines adapted to Typesafe AI’s early-release Jev model.
          </p>
          <Note>
            F1 combines precision and recall on a 0–1 scale. Read it alongside the number of cases scored: several configurations completed only part of the benchmark, so a high F1 on a smaller subset is not a complete-benchmark result.
          </Note>
          <div className="grid gap-4 sm:grid-cols-2">
            {benchmarks.map((benchmark) => <BenchmarkChart key={benchmark.title} benchmark={benchmark} />)}
          </div>
          <figure className="border border-border bg-white p-3 sm:p-5">
            <a href={chartPath} target="_blank" rel="noopener noreferrer" aria-label="Open the original four-panel MalSkillsBench chart at full resolution (opens in a new tab)" className="research-link block">
              <Image
                src={chartPath}
                width={4750}
                height={2717}
                sizes="(min-width: 768px) 656px, 100vw"
                alt="Original four-panel chart comparing F1 scores and scored-case coverage for Cisco Skill Scanner, Caterpillar, MASB classification-only, and MalSkills. All sixteen results and pipeline notes are transcribed above."
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3 font-label text-[0.75rem] leading-[1.6] text-muted">
              <span>Original benchmark figure from my research summary.</span>
              <a href={chartPath} target="_blank" rel="noopener noreferrer" className="research-link inline-flex items-center gap-1.5 text-fg underline decoration-border-strong underline-offset-4">
                View full resolution <ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
          <ResultsTable
            caption="Static scanner results on the same 200-skill benchmark"
            headings={["Scanner", "F1 score", "Cases scored"]}
            rows={staticBenchmarks.map((result) => [result.scanner, result.f1, result.scored])}
          />
          <p className={proseClass}>
            MalSkills showed how much the configuration mattered: Luna-low scored 0.2759 F1 over all 200 cases, while Luna-medium scored 0.9198 on 198. The Jev hybrid reached 0.9485 on 200/200 cases. Jev’s results also varied across the other scanners, especially the classification-only MASB pipeline.
          </p>
          <div className="border-l-2 border-border-strong pl-5 sm:pl-6">
            <h4 className={`${labelClass} mb-3 text-fg`}>Building a two-stage screening harness</h4>
            <p className={proseClass}>
              Alongside these comparisons, I built a Python harness that uses Typesafe Jev to screen file chunks, then sends uncertain cases to Qwen 3.8 through Ollama. On a separate 300-skill dataset containing 200 known-malicious skills, it identified up to 93% of the malicious skills.
            </p>
            <ol aria-label="Harness processing stages" className="mt-5 grid gap-3 font-label text-[0.8125rem] leading-[1.6] sm:grid-cols-3">
              {["01 · Screen file chunks with Jev", "02 · Route uncertain cases", "03 · Review with Qwen / Ollama"].map((stage) => <li key={stage} className="border-t border-border pt-3 text-fg-soft">{stage}</li>)}
            </ol>
            <p className="mt-4 font-label text-[0.75rem] leading-[1.6] text-muted">This earlier harness result uses a different dataset from the 200-skill benchmark above.</p>
          </div>
        </Chapter>

        <Chapter index={5}>
          <p className={proseClass}>
            I prepared a brute-force skill-fuzzing framework to test exfiltration behavior with fake secrets. The evasion run stopped after scoring 121 of 123 inputs. After a parallel experiment with my coworker&apos;s framework, we concluded that this fuzzing approach might not be viable.
          </p>
          <p className={proseClass}>
            <cite>Under the Hood of SKILL.md</cite>, <cite>Cloak and Detonate</cite>, <cite>Proteus</cite>, and <cite>SkillMutator</cite> helped frame the next question: if a skill is changed to evade a scanner, does the attack still work when an agent executes it?
          </p>
        </Chapter>

        <Chapter index={6}>
          <p className={proseClass}>
            The team’s newly scraped dataset contains {totalEntries.toLocaleString("en-US")} saved entries across skills, MCP records, and plugins. The current work focuses on exploratory data analysis and adjustments to the collection.
          </p>
          <figure className="border-y border-border py-6">
            <figcaption className="mb-5 font-label text-[0.875rem] font-medium text-fg">The collected agent-extension ecosystem</figcaption>
            <div aria-hidden="true" className="flex h-5 overflow-hidden">
              {researchDataset.map((item, index) => <span key={item.label} className="research-bar h-full" data-tone={["blue", "green", "orange"][index]} style={{ width: `${item.count / totalEntries * 100}%` }} />)}
            </div>
            <dl className="mt-5 grid gap-5 sm:grid-cols-3">
              {researchDataset.map((item) => (
                <div key={item.label}>
                  <dt className={`${labelClass} text-muted`}>{item.label}</dt>
                  <dd className="mt-1 font-serif text-[1.75rem] tabular-nums text-fg">{item.count.toLocaleString("en-US")}</dd>
                </div>
              ))}
            </dl>
          </figure>
          <Note>
            These entries have not been labeled or deduplicated, and some may not contain complete packages. Separately, MalSkillBench contains 7,944 records: 3,944 malicious and 4,000 benign.
          </Note>
          <h4 className="pt-2 font-serif text-[1.625rem] font-normal text-fg">What the work is pointing toward</h4>
          <p className={proseClass}>
            The recurring question is how a scanner’s verdict relates to what an agent actually does. In the GhostCommit trials, the tested Claude Code configurations resisted the attack more consistently than the tested Codex configurations. That observation is specific to these attacks, model settings, and runs; it does not establish a general security ranking between the products.
          </p>
          <p className={proseClass}>
            My proposed next direction is to explore whether Jev can make a defense harness more efficient and accurate, while also investigating the new attack surface such models may introduce. The goal is to connect detection, evasion, and execution so we can measure whether a defense prevents the harmful behavior.
          </p>
        </Chapter>
      </div>
    </article>
  );
}
