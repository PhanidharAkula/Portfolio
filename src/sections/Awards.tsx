import { motion } from "framer-motion";
import { awards, certifications, press } from "../data/awards";
import { Reveal } from "../components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function Awards() {
  return (
    <section className="relative border-b border-line">
      <div className="px-5 md:px-10 pt-8 md:pt-10 pb-10">
        <span className="mono-mini text-plasma block mb-3">/ Recognition</span>
        <h2 className="display text-bone leading-[1.02] text-[clamp(40px,7vw,104px)] tracking-tightest">
          Honors, papers
          <span className="display-italic text-bone/55"> and the occasional press.</span>
        </h2>
      </div>

      <div className="px-5 md:px-10 pb-12 md:pb-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <ul className="flex flex-col">
              {awards.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="grid grid-cols-12 items-baseline gap-3 border-t border-line py-5 group last:border-b"
                >
                  <span className="col-span-2 md:col-span-1 mono-mini text-plasma">{a.year}</span>
                  <span className="col-span-10 md:col-span-8 display text-bone text-lg md:text-2xl leading-tight group-hover:text-plasma transition-colors">
                    {a.href ? (
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2"
                        data-cursor="link"
                        data-cursor-label="Open"
                      >
                        {a.title}
                        <ArrowUpRight size={16} className="mt-1.5 shrink-0 text-bone/45 group-hover:text-plasma transition-colors" />
                      </a>
                    ) : (
                      a.title
                    )}
                  </span>
                  <span className="col-span-12 md:col-span-3 mono-mini text-bone/55 md:text-right">
                    {a.org}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <div className="border border-line p-6 flex flex-col gap-4">
                <span className="mono-mini text-bone/55">/ Publications</span>
                <ul className="flex flex-col">
                  {press.map((p) =>
                    p.href ? (
                      <li key={p.title} className="border-t border-line py-4 group">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-4"
                          data-cursor="link"
                        >
                          <div className="flex flex-col">
                            <span className="mono-mini text-plasma">{p.source}</span>
                            <span className="text-bone group-hover:text-plasma transition-colors">
                              {p.title}
                            </span>
                          </div>
                          <ArrowUpRight
                            size={16}
                            className="text-bone/55 group-hover:text-plasma group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                          />
                        </a>
                      </li>
                    ) : (
                      <li key={p.title} className="border-t border-line py-4">
                        <div className="flex flex-col">
                          <span className="mono-mini text-plasma">{p.source}</span>
                          <span className="text-bone">{p.title}</span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-line p-6 flex flex-col gap-4">
                <span className="mono-mini text-bone/55">/ Certifications</span>
                <ul className="flex flex-col">
                  {certifications.map((c) => {
                    const body = (
                      <>
                        <div className="flex flex-col">
                          <span className="mono-mini text-plasma">
                            {c.issuer} · {c.year}
                          </span>
                          <span className="text-bone group-hover:text-plasma transition-colors">
                            {c.name}
                          </span>
                        </div>
                        {c.href && (
                          <ArrowUpRight
                            size={16}
                            className="text-bone/55 group-hover:text-plasma group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                          />
                        )}
                      </>
                    );

                    return (
                      <li key={c.name} className="border-t border-line py-4 group">
                        {c.href ? (
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-4"
                            data-cursor="link"
                            data-cursor-label="Verify"
                          >
                            {body}
                          </a>
                        ) : (
                          <div className="flex items-start justify-between gap-4">{body}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
