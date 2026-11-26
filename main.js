/*
  phanidhar.dev
  Everything that moves on the page. No libraries.
*/

(() => {
  "use strict";

  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  /* Call back once, the first time an element is properly on screen. */
  function onFirstSight(element, callback, threshold = 0.5) {
    const watcher = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      watcher.disconnect();
      callback();
    }, { threshold });
    watcher.observe(element);
  }

  /* How long the marker takes to cross a phrase. A hand moves at a steady
     speed, so longer phrases take longer. */
  const sweepTime = (element) => clamp(element.textContent.length * 13, 200, 700);

  /* Put a number into a .num element, one cell per digit. */
  function setNumber(element, value) {
    const text = String(value);
    if (element.dataset.shown === text) return;
    element.dataset.shown = text;
    element.replaceChildren(...[...text].map((character) => {
      if (character < "0" || character > "9") return character;
      const cell = document.createElement("span");
      cell.textContent = character;
      return cell;
    }));
  }

  /* Which side of an element a pointer event happened on. */
  function sideOf(element, event) {
    const box = element.getBoundingClientRect();
    return event.clientX < box.left + box.width / 2 ? "left" : "right";
  }

  /* When the pressed button in a group changes, let the fill leave the old
     one toward the new one, and enter the new one from the old one's side. */
  function slide(from, to) {
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const sameLine = Math.abs(a.top - b.top) < 4;
    const movingRight = b.left > a.left;
    from.style.setProperty("--from", sameLine && movingRight ? "right" : "left");
    to.style.setProperty("--from", sameLine && !movingRight ? "right" : "left");
  }


  /* The marker -------------------------------------------------------------
     There is one marker, so phrases are highlighted one at a time and in
     reading order, as each comes into view. */

  function marker() {
    const PAUSE = 90;
    let busyUntil = 0;

    const watcher = new IntersectionObserver((entries) => {
      const arrived = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

      const now = performance.now();

      for (const mark of arrived) {
        watcher.unobserve(mark);
        const duration = sweepTime(mark);
        // Queue behind the previous phrase, but never keep a fast scroller waiting long.
        const start = Math.min(Math.max(now, busyUntil), now + 450);
        mark.style.setProperty("--dur", `${duration}ms`);
        mark.style.setProperty("--delay", `${Math.round(start - now)}ms`);
        mark.classList.add("is-drawn");
        busyUntil = start + duration + PAUSE;
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 1 });

    for (const mark of $$("mark")) watcher.observe(mark);
  }


  /* Hover fills arrive from the side the pointer came in on and leave by
     the side it went out. */

  function pointerSides() {
    const FILL = 340;
    const enteredAt = new WeakMap();
    const target = (event) => event.target.closest?.("a, .btn");

    document.addEventListener("pointerover", (event) => {
      const element = target(event);
      if (!element || element.contains(event.relatedTarget)) return;
      if (element.getAttribute("aria-pressed") === "true") return;
      element.style.setProperty("--from", sideOf(element, event));
      enteredAt.set(element, performance.now());
    });

    document.addEventListener("pointerout", (event) => {
      const element = target(event);
      if (!element || element.contains(event.relatedTarget)) return;
      if (element.getAttribute("aria-pressed") === "true") return;
      // Only swap sides once the fill has finished, otherwise it would jump.
      if (performance.now() - (enteredAt.get(element) ?? 0) < FILL) return;
      element.style.setProperty("--from", sideOf(element, event));
    });
  }


  /* Lumi: ask the notes ------------------------------------------------- */

  function ask(figure) {
    const questions = $$("button[data-answer]", figure);
    const live = $("[data-ask-live]", figure);
    let asked = null;
    let touched = false;

    const answerTo = (question) => document.getElementById(question.dataset.answer);

    function choose(question) {
      const previous = asked;
      asked = question === previous ? null : question;

      if (previous) {
        const old = answerTo(previous);
        old.style.setProperty("--dur", "200ms");
        old.classList.remove("is-on");
        previous.setAttribute("aria-pressed", "false");
      }

      if (asked) {
        if (previous) slide(previous, asked);

        const answer = answerTo(asked);
        answer.style.setProperty("--dur", `${sweepTime(answer)}ms`);
        answer.classList.add("is-on");
        asked.setAttribute("aria-pressed", "true");
        live.textContent = `From the notes: ${answer.textContent}.`;
      } else {
        live.textContent = "";
      }
    }

    for (const question of questions) {
      question.addEventListener("click", () => {
        touched = true;
        choose(question);
      });
    }

    // Answer the first question unprompted, so the idea lands without a click.
    onFirstSight(figure, () => {
      setTimeout(() => {
        if (!touched) choose(questions[0]);
      }, calm ? 0 : 700);
    }, 0.6);
  }


  /* SimForge: the race -----------------------------------------------------
     Both lines are drawn at the same speed, one second for every ten hours
     of compute. The old run takes fourteen seconds to cross. The new one is
     done before you have read its label. */

  function race(figure) {
    const MS_PER_HOUR = 100;

    const lanes = $$(".race__row", figure).map((row) => ({
      hours: Number(row.dataset.hours),
      line: $(".race__line", row),
      readout: $("[data-num]", row),
      run: null,
    }));

    let frame = 0;

    function read() {
      let running = false;
      for (const lane of lanes) {
        const elapsed = Number(lane.run.currentTime) || 0;
        setNumber(lane.readout, Math.min(elapsed / MS_PER_HOUR, lane.hours).toFixed(1));
        if (lane.run.playState === "running") running = true;
      }
      frame = running ? requestAnimationFrame(read) : 0;
    }

    function start() {
      cancelAnimationFrame(frame);
      for (const lane of lanes) {
        lane.run?.cancel();
        lane.run = lane.line.animate(
          { transform: ["scaleX(0)", "scaleX(1)"] },
          { duration: lane.hours * MS_PER_HOUR, easing: "linear", fill: "both" },
        );
      }
      read();
    }

    $("[data-race-run]", figure).addEventListener("click", start);

    for (const lane of lanes) setNumber(lane.readout, lane.hours.toFixed(1));

    if (calm) return; // leave the finished picture in place

    for (const lane of lanes) {
      lane.line.style.transform = "scaleX(0)";
      setNumber(lane.readout, "0.0");
    }

    let started = false;

    // Start when it is in view, and hold the clock while it is not.
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        setTimeout(start, 350);
        return;
      }
      for (const lane of lanes) {
        if (!lane.run) continue;
        if (entry.isIntersecting && lane.run.playState === "paused") lane.run.play();
        if (!entry.isIntersecting && lane.run.playState === "running") lane.run.pause();
      }
      if (entry.isIntersecting && !frame && lanes.some((lane) => lane.run)) read();
    }, { threshold: 0.55 }).observe(figure);
  }


  /* Cityscape: the grid ----------------------------------------------------
     A hundred squares, one per cent of the homes in the model each.
     30 sat on a real building before the fix, 94 after. */

  function city(figure) {
    const COLUMNS = 20;
    const HOMES = 100;
    const REAL_BEFORE = 30;
    const REAL_AFTER = 94;

    const grid = $(".city__grid", figure);
    const readout = $("[data-num]", figure);
    const live = $("[data-city-live]", figure);
    const buttons = $$("button[data-city]", figure);

    // A fixed shuffle, so the picture is the same on every visit.
    let seed = 94;
    const random = () => (seed = (seed * 48271) % 2147483647) / 2147483647;

    const order = Array.from({ length: HOMES }, (_, index) => index);
    for (let i = HOMES - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const cells = Array.from({ length: HOMES }, () => document.createElement("i"));
    const fixed = [];

    order.forEach((position, rank) => {
      if (rank < REAL_BEFORE) cells[position].className = "was-real";
      else if (rank < REAL_AFTER) {
        cells[position].className = "got-fixed";
        fixed.push({ cell: cells[position], column: position % COLUMNS, jitter: random() });
      }
    });

    grid.append(...cells);

    let shown = REAL_AFTER;
    let frame = 0;

    function count(to, duration) {
      cancelAnimationFrame(frame);
      const from = shown;
      const began = performance.now();
      const step = (now) => {
        const progress = duration ? clamp((now - began) / duration, 0, 1) : 1;
        shown = Math.round(from + (to - from) * progress);
        setNumber(readout, shown);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      step(began);
    }

    function show(state, instantly = calm) {
      const after = state === "after";

      // The fix sweeps across left to right. Undoing it wipes back the other way.
      let longest = 0;
      for (const { cell, column, jitter } of fixed) {
        const delay = instantly ? 0 : Math.round(
          after ? column * 36 + jitter * 150 : (COLUMNS - 1 - column) * 16 + jitter * 70,
        );
        cell.style.setProperty("--d", `${delay}ms`);
        longest = Math.max(longest, delay);
      }

      for (const button of buttons) {
        // Facing sides, so the yellow slides from one button to the other.
        button.style.setProperty("--from", button.dataset.city === "before" ? "right" : "left");
        button.setAttribute("aria-pressed", String(button.dataset.city === state));
      }

      figure.dataset.state = state;
      count(after ? REAL_AFTER : REAL_BEFORE, instantly ? 0 : longest + 140);
      live.textContent = after
        ? `After the fix, ${REAL_AFTER} of ${HOMES} homes sit on a real building.`
        : `Before the fix, ${REAL_BEFORE} of ${HOMES} homes sat on a real building.`;
    }

    for (const button of buttons) {
      button.addEventListener("click", () => show(button.dataset.city));
    }

    if (calm) {
      show("after", true);
      return;
    }

    // Open on the broken version, then apply the fix once you are looking.
    show("before", true);
    let touched = false;
    for (const button of buttons) button.addEventListener("click", () => { touched = true; }, { once: true });
    onFirstSight(figure, () => {
      setTimeout(() => {
        if (!touched) show("after");
      }, 650);
    }, 0.6);
  }


  /* Experience: one time scale ------------------------------------------------
     Every bar is placed by month on a scale that starts in January 2020 and
     ends this December. "now" is read off the clock, so the current job
     keeps growing without anyone editing the page. */

  function timeline(figure) {
    const START = 2020;
    const today = new Date();
    const thisMonth = (today.getFullYear() - START) * 12 + today.getMonth();
    const years = today.getFullYear() - START + 1;
    const months = years * 12;

    // "2025-10" becomes the number of months since January of the start year.
    const monthOf = (text) => {
      if (text === "now") return thisMonth;
      const [year, month] = text.split("-").map(Number);
      return (year - START) * 12 + month - 1;
    };

    const lengthOf = (count) => {
      const y = Math.floor(count / 12);
      const m = count % 12;
      if (!y) return `${m} ${m === 1 ? "month" : "months"}`;
      if (!m) return `${y} ${y === 1 ? "year" : "years"}`;
      return `${y} yr ${m} mo`;
    };

    figure.style.setProperty("--months", months);
    figure.style.setProperty("--years", years);

    const scale = $("[data-years]", figure);
    scale.replaceChildren(...Array.from({ length: years }, (_, i) => {
      const label = document.createElement("span");
      label.textContent = START + i;
      label.dataset.short = `’${String(START + i).slice(2)}`;
      return label;
    }));

    // When there is not room for four digits under every year (a narrow
    // phone, or a few more years on the scale), the labels drop the century.
    const first = scale.firstElementChild;
    let wide = 0;
    const fit = () => {
      if (!scale.classList.contains("is-tight")) {
        const range = document.createRange();
        range.selectNodeContents(first);
        wide = range.getBoundingClientRect().width || wide;
      }
      scale.classList.toggle("is-tight", wide > 0 && scale.clientWidth / years < wide + 8);
    };
    fit();
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(scale);
    document.fonts?.ready.then(fit);

    for (const list of $$(".rows", figure)) {
      let earliest = months;

      for (const row of $$(".row", list)) {
        const from = monthOf(row.dataset.from);
        const until = monthOf(row.dataset.to) + 1; // data-to is the last month, inclusive
        earliest = Math.min(earliest, from);
        row.style.setProperty("--a", from);
        row.style.setProperty("--b", until);
        $("[data-length]", row).textContent = lengthOf(until - from);
        $(".row__span", row).classList.toggle("is-flipped", until / months > 0.7);
      }

      // Each list starts its clock at its own first bar, so nothing waits on empty years.
      list.style.setProperty("--a0", earliest);
      if (calm) list.classList.add("is-live");
      else onFirstSight(list, () => list.classList.add("is-live"), 0.3);
    }
  }


  /* Skills: pick a job, see what was used there ---------------------------------
     The same move as the Lumi demo: ask, and the answer lights up in the text. */

  function used(figure) {
    const jobs = $$("button[data-job]", figure);
    const list = $(".used__list", figure);
    const skills = $$("[data-in]", figure);
    const live = $("[data-used-live]", figure);
    let picked = null;
    let touched = false;
    let timer = 0;

    function pick(job) {
      const previous = picked;
      picked = job === previous ? null : job;
      clearTimeout(timer);

      if (previous && picked) slide(previous, picked);
      for (const button of jobs) button.setAttribute("aria-pressed", String(button === picked));

      // Lift the old color off first.
      for (const skill of skills) {
        skill.style.setProperty("--dur", "150ms");
        skill.style.setProperty("--delay", "0ms");
        skill.classList.remove("is-on");
      }

      if (!picked) {
        live.textContent = "";
        return;
      }

      // Then lay the new one down, one skill after another.
      timer = setTimeout(() => {
        const color = [...picked.classList].find((name) => name.startsWith("c-")) ?? "";
        list.className = `rows used__list ${color}`.trim();

        const mine = skills.filter((skill) => skill.dataset.in.split(" ").includes(picked.dataset.job));
        mine.forEach((skill, order) => {
          skill.style.setProperty("--dur", `${sweepTime(skill)}ms`);
          skill.style.setProperty("--delay", `${order * 45}ms`);
          skill.classList.add("is-on");
        });

        live.textContent = `${picked.textContent}: ${mine.map((skill) => skill.textContent).join(", ")}.`;
      }, previous && !calm ? 170 : 0);
    }

    for (const job of jobs) {
      job.addEventListener("click", () => {
        touched = true;
        pick(job);
      });
    }

    onFirstSight(figure, () => {
      setTimeout(() => {
        if (!touched) pick(jobs[0]);
      }, calm ? 0 : 600);
    }, 0.5);
  }


  /* Contact: the last highlight is the whole block ---------------------------- */

  function band(block) {
    if (calm) block.classList.add("is-drawn");
    else onFirstSight(block, () => block.classList.add("is-drawn"), 0.3);
  }


  /* Copy the address -------------------------------------------------------
     The button says "Copied" the instant you press it. It only goes back on
     its word if the browser refuses. */

  function copyAddress(button) {
    const label = $("[data-copy-label]", button);
    const address = $("[data-email]");
    const resting = label.textContent;
    let timer = 0;

    async function copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // No async clipboard here, or it said no. Try the old way.
      }
      const field = Object.assign(document.createElement("textarea"), { value: text });
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;opacity:0";
      document.body.append(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      if (!ok) throw new Error("copy refused");
    }

    function settle(text, delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = text;
        address.classList.remove("is-copied");
      }, delay);
    }

    button.addEventListener("click", () => {
      // Hold the button at its current width so the shorter word doesn't shrink it.
      button.style.minWidth = `${button.offsetWidth}px`;
      label.textContent = "Copied";
      address.classList.add("is-copied");
      settle(resting, 1900);

      copy(button.dataset.copy).catch(() => {
        // No clipboard. Select the address instead, so copying by hand is one keystroke.
        label.textContent = "Couldn’t copy";
        address.classList.remove("is-copied");
        getSelection()?.selectAllChildren(address);
        settle(resting, 4000);
      });
    });
  }


  /* Small things ------------------------------------------------------------ */

  function topBar() {
    const bar = $(".top");
    const update = () => bar.classList.toggle("is-stuck", scrollY > 4);
    addEventListener("scroll", update, { passive: true });
    update();

    // The bar's links are a spare set. Bring them out only while no other
    // copy (the opening's, the contact block's) is on screen.
    const elsewhere = new Set();
    const watcher = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) elsewhere.add(entry.target);
        else elsewhere.delete(entry.target);
      }
      bar.classList.toggle("has-links", elsewhere.size === 0);
    }, { rootMargin: `-${bar.offsetHeight}px 0px 0px 0px` });

    for (const links of $$(".actions")) watcher.observe(links);
  }

  /* Where you are ------------------------------------------------------------
     Two things in the top bar follow your reading position:
     the link for the part of the page you are in gets the highlight, and
     while you are inside a project a line in its color runs under the bar. */

  function whereYouAre() {
    const bar = $(".top");
    const linkTo = new Map($$(".top__places a").map((link) => [link.dataset.to, link]));

    const under = document.createElement("i");
    const over = document.createElement("i");
    under.className = over.className = "top__mark";
    bar.append(under, over);

    const colorOf = (scene) => [...(scene?.classList ?? [])].find((name) => name.startsWith("c-")) ?? "";
    const timing = { duration: calm ? 0 : 520, easing: "cubic-bezier(0.3, 0.7, 0.2, 1)", fill: "forwards" };

    // Every section heading is a stop: which link it belongs to, if any, and
    // which project color, if any. They are in page order.
    // The contact block is the last thing on the page and can never rise as
    // far as the middle, so it counts from its top edge and a lower line.
    const stops = $$("main h2, .band h2").map((heading) => {
      const block = heading.closest(".band");
      return {
        edge: block ?? heading,
        line: block ? 0.7 : 0.45,
        link: linkTo.get(heading.closest("[data-place]")?.dataset.place) ?? null,
        color: colorOf(heading.closest(".scene")),
      };
    });

    let here = null; // the link that is highlighted
    let color = ""; // the project color in use, as a .c- class

    function point(link) {
      if (link === here) return;
      if (here && link) slide(here, link);
      here?.removeAttribute("aria-current");
      link?.setAttribute("aria-current", "location");
      here = link;
    }

    function paint(next) {
      if (next === color) return;
      for (const animation of over.getAnimations()) animation.cancel();

      if (next) {
        // The color you are leaving stays underneath while the new one sweeps over it.
        under.className = `top__mark ${color}`;
        under.style.transform = color ? "none" : "";
        over.className = `top__mark ${next}`;
        over.style.transformOrigin = "left center";
        over.animate({ transform: ["scaleX(0)", "scaleX(1)"] }, timing);
      } else {
        under.style.transform = "";
        over.style.transformOrigin = "right center";
        over.animate({ transform: ["scaleX(1)", "scaleX(0)"] }, timing);
      }

      // Everything in the bar picks up the same highlighter.
      if (color) bar.classList.remove(color);
      if (next) bar.classList.add(next);

      // If the highlighted link stays put (project to project), draw it again in the new color.
      if (here && !calm) {
        here.style.transition = "none";
        here.removeAttribute("aria-current");
        void here.offsetWidth;
        here.style.transition = "";
        here.setAttribute("aria-current", "location");
      }

      color = next;
    }

    // You are in whichever section's heading most recently rose past the
    // middle of the window. That is the moment a section becomes the main
    // thing on screen: not when its top margin first appears, and not as late
    // as when its heading reaches the top. Once the page can't scroll any
    // further, you are in the last one.
    function look() {
      const atTheEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

      let stop = null;
      if (atTheEnd) stop = stops.at(-1);
      else {
        for (const candidate of stops) {
          if (candidate.edge.getBoundingClientRect().top > innerHeight * candidate.line) break;
          stop = candidate;
        }
      }

      paint(stop?.color ?? "");
      point(stop?.link ?? null);
    }

    let waiting = false;
    const soon = () => {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(() => {
        waiting = false;
        look();
      });
    };

    addEventListener("scroll", soon, { passive: true });
    addEventListener("resize", soon);
    look();
  }

  function portrait() {
    const image = $(".me img");
    if (!image) return;
    const reveal = () => image.classList.add("is-in");
    if (image.complete) reveal();
    else {
      image.addEventListener("load", reveal, { once: true });
      image.addEventListener("error", reveal, { once: true });
    }
  }


  /* The year in the footer follows the calendar. */
  function thisYear() {
    for (const year of $$("[data-year]")) year.textContent = new Date().getFullYear();
  }

  /* Section links glide only after the page has loaded and the browser has
     finished any jump of its own (see "is-settled" in the stylesheet). */
  function glideLater() {
    const settle = () => setTimeout(() => document.documentElement.classList.add("is-settled"), 300);
    if (document.readyState === "complete") settle();
    else addEventListener("load", settle, { once: true });
  }

  /* The page always opens at the top (see the head of index.html). Two things
     here keep it that way.

     Leaving or refreshing: jump back to the top first, in one step, so a
     browser that remembers positions anyway has only the top to come back to.

     Section links: clicking one scrolls to the section and leaves the address
     alone. With no "#section" ever in the address, a refresh is always a
     refresh of the plain page. Focus moves to the section too, so the keyboard
     and screen readers carry on from where the page went. */
  function alwaysFromTheTop() {
    addEventListener("pagehide", () => {
      try {
        scrollTo({ top: 0, left: 0, behavior: "instant" });
      } catch {
        scrollTo(0, 0);
      }
    });

    document.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;

      let name = link.getAttribute("href").slice(1);
      try {
        name = decodeURIComponent(name);
      } catch {
        // leave it as it is
      }

      const toTop = name === "top" || name === "";
      const section = toTop ? null : document.getElementById(name);
      if (!toTop && !section) return; // nothing by that name: let the browser deal with it

      event.preventDefault();

      if (section) section.scrollIntoView();
      else scrollTo(0, 0);

      const landing = section ?? $(".top__name");
      if (!landing) return;
      if (landing.tabIndex < 0 && !landing.hasAttribute("tabindex")) landing.setAttribute("tabindex", "-1");
      landing.focus({ preventScroll: true });
    });
  }


  /* Go ----------------------------------------------------------------------
     Each part starts on its own, so one failing cannot stop the rest. If any
     part does fail, the page drops back to how it reads without scripting:
     every highlight drawn, the photo and the yellow block showing, nothing
     left waiting for a script that will not come. */

  const figures = { ask, race, city, timeline, used, band };
  let failed = false;

  const safely = (what, start) => {
    try {
      start();
    } catch (error) {
      failed = true;
      console.error(`${what} did not start:`, error);
    }
  };

  safely("top bar", topBar);
  safely("reading position", whereYouAre);
  safely("portrait", portrait);
  safely("hover sides", pointerSides);
  safely("footer year", thisYear);
  safely("smooth section links", glideLater);
  safely("always from the top", alwaysFromTheTop);

  for (const figure of $$("[data-figure]")) {
    safely(figure.dataset.figure, () => figures[figure.dataset.figure]?.(figure));
  }
  for (const button of $$("[data-copy]")) safely("copy button", () => copyAddress(button));

  // Wait for the real typeface before drawing, so no mark is measured on the
  // stand-in, and for the page to have nearly finished arriving (see "Arriving"
  // in the stylesheet), so the highlighter starts on a page that has settled.
  const fonts = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fonts, new Promise((resolve) => setTimeout(resolve, 900))])
    .then(() => setTimeout(() => safely("highlighter", marker), calm ? 0 : 480))
    .finally(() => {
      if (failed) document.documentElement.classList.remove("js");
    });

  if (failed) document.documentElement.classList.remove("js");
})();
