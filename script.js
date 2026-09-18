/* =========================================================
FOR ANU ♥ — FINAL SCRIPT
========================================================= */


/* =========================================================
LOADER
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {
      loader.classList.add("hide");
    }

  }, 900);

});


/* =========================================================
SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================================
FLOWER / HEART RAIN — FIXED
========================================================= */

function rain(symbols, amount) {

  const layer =
    document.createElement("div");

  layer.id = "flowerRainLayer";

  layer.style.position = "fixed";
  layer.style.left = "0";
  layer.style.top = "0";
  layer.style.width = "100vw";
  layer.style.height = "100vh";
  layer.style.overflow = "hidden";
  layer.style.pointerEvents = "none";
  layer.style.zIndex = "999999999";

  document.documentElement.appendChild(layer);

  const flowers = [];

  for (let i = 0; i < amount; i++) {

    const flower =
      document.createElement("span");

    flower.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    flower.style.position = "absolute";

    flower.style.left = "0";
    flower.style.top = "0";

    flower.style.fontSize =
      (18 + Math.random() * 25) + "px";

    flower.style.lineHeight = "1";

    flower.style.pointerEvents = "none";

    flower.style.userSelect = "none";

    flower.style.willChange =
      "transform, opacity";

    layer.appendChild(flower);

    flowers.push({

      element: flower,

      x:
        Math.random() *
        window.innerWidth,

      y:
        -70 -
        Math.random() * 300,

      speed:
        2.5 +
        Math.random() * 3,

      drift:
        (Math.random() - 0.5) * 1.5,

      rotation:
        Math.random() * 360,

      rotationSpeed:
        (Math.random() - 0.5) * 8

    });

  }


  const startTime =
    performance.now();


  function animate(currentTime) {

    const elapsed =
      currentTime - startTime;


    flowers.forEach(flower => {

      flower.y += flower.speed;

      flower.x += flower.drift;

      flower.rotation +=
        flower.rotationSpeed;


      flower.element.style.transform =
        `translate3d(
          ${flower.x}px,
          ${flower.y}px,
          0
        )
        rotate(${flower.rotation}deg)`;


      if (
        flower.y >
        window.innerHeight + 100
      ) {

        flower.element.style.opacity =
          "0";

      }

    });


    if (elapsed < 6000) {

      requestAnimationFrame(animate);

    } else {

      layer.remove();

    }

  }


  requestAnimationFrame(animate);

}


/* =========================================================
PROPOSAL ELEMENTS
========================================================= */

const proposal =
  document.getElementById("proposal");

const proposal2 =
  document.getElementById("proposal2");


/* =========================================================
FIRST YES
"Anu, did you like this?"
========================================================= */

const likeYesBtn =
  document.getElementById("likeYesBtn");

if (likeYesBtn) {

  likeYesBtn.addEventListener(
    "click",
    () => {

      /* 🌸 FLOWER RAIN */

      rain(
        [
          "🌸",
          "🌷",
          "🌹",
          "🌺",
          "✿"
        ],
        70
      );


      /* Move to second question */

      setTimeout(() => {

        if (proposal) {

          proposal.hidden =
            true;

        }


        if (proposal2) {

          proposal2.hidden =
            false;

          proposal2.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }, 1500);

    }
  );

}


/* =========================================================
FIRST NO
========================================================= */

const likeNoBtn =
  document.getElementById("likeNoBtn");

if (likeNoBtn) {

  likeNoBtn.addEventListener(
    "click",
    () => {

      const answer =
        document.getElementById(
          "likeAnswer"
        );

      if (answer) {

        answer.textContent =
          "That's okay. 🤍";

      }

    }
  );

}


/* =========================================================
SECOND YES
"Will you be mine?"
========================================================= */

const mineYesBtn =
  document.getElementById("mineYesBtn");

if (mineYesBtn) {

  mineYesBtn.addEventListener(
    "click",
    () => {

      /* ❤️ HEARTS + FLOWERS */

      rain(
        [
          "❤️",
          "💗",
          "💕",
          "💖",
          "🌸",
          "🌷",
          "🌹",
          "🌺",
          "✿"
        ],
        100
      );


      setTimeout(() => {

        if (proposal2) {

          proposal2.hidden =
            true;

        }


        if (proposal) {

          proposal.hidden =
            false;

          proposal.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }, 2500);

    }
  );

}


/* =========================================================
SECOND NO / LET ME THINK
========================================================= */

const mineNoBtn =
  document.getElementById("mineNoBtn");

if (mineNoBtn) {

  mineNoBtn.addEventListener(
    "click",
    () => {

      const answer =
        document.getElementById(
          "mineAnswer"
        );

      if (answer) {

        answer.textContent =
          "Take your time. 🤍";

      }

    }
  );

}


/* =========================================================
RUN-AWAY NO BUTTON
Safe transform-based movement
========================================================= */

function makeButtonRunAway(button) {

  if (!button) return;


  let moving = false;


  const MAX_MOVE =
    95;

  const TRIGGER_DISTANCE =
    125;


  function moveAway(x, y) {

    if (moving) return;


    const rect =
      button.getBoundingClientRect();


    const centerX =
      rect.left +
      rect.width / 2;


    const centerY =
      rect.top +
      rect.height / 2;


    const dx =
      centerX - x;


    const dy =
      centerY - y;


    const distance =
      Math.hypot(dx, dy);


    if (
      distance >
      TRIGGER_DISTANCE
    ) {

      return;

    }


    moving = true;


    let angle;


    if (distance < 8) {

      angle =
        Math.random() *
        Math.PI *
        2;

    } else {

      angle =
        Math.atan2(dy, dx);

    }


    let targetX =
      Math.cos(angle) *
      MAX_MOVE;


    let targetY =
      Math.sin(angle) *
      MAX_MOVE;


    if (
      Math.abs(targetX) <
      35
    ) {

      targetX =
        targetX < 0
          ? -45
          : 45;

    }


    if (
      Math.abs(targetY) <
      25
    ) {

      targetY =
        targetY < 0
          ? -30
          : 30;

    }


    targetX =
      Math.max(
        -MAX_MOVE,
        Math.min(
          MAX_MOVE,
          targetX
        )
      );


    targetY =
      Math.max(
        -MAX_MOVE,
        Math.min(
          MAX_MOVE,
          targetY
        )
      );


    button.style.transform =
      `translate(
        ${targetX}px,
        ${targetY}px
      )`;


    setTimeout(() => {

      moving = false;

    }, 140);

  }


  /* Mouse / Trackpad */

  document.addEventListener(
    "pointermove",
    event => {

      moveAway(
        event.clientX,
        event.clientY
      );

    }
  );


  /* Touch */

  document.addEventListener(
    "touchstart",
    event => {

      const touch =
        event.touches[0];

      if (!touch) return;


      moveAway(
        touch.clientX,
        touch.clientY
      );

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "touchmove",
    event => {

      const touch =
        event.touches[0];

      if (!touch) return;


      moveAway(
        touch.clientX,
        touch.clientY
      );

    },
    {
      passive: true
    }
  );

}


/* =========================================================
ACTIVATE RUN-AWAY BUTTONS
========================================================= */

makeButtonRunAway(
  document.getElementById(
    "likeNoBtn"
  )
);


makeButtonRunAway(
  document.getElementById(
    "mineNoBtn"
  )
);


/* =========================================================
BACK TO TOP
========================================================= */

const backToTop =
  document.getElementById(
    "backToTop"
  );

if (backToTop) {

  window.addEventListener(
    "scroll",
    () => {

      if (
        window.scrollY >
        500
      ) {

        backToTop.classList.add(
          "show"
        );

      } else {

        backToTop.classList.remove(
          "show"
        );

      }

    }
  );


  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


/* =========================================================
YES BUTTON EXTRA HEART BURST
========================================================= */

document
  .querySelectorAll(".yes-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const rect =
          button.getBoundingClientRect();


        for (
          let i = 0;
          i < 12;
          i++
        ) {

          const heart =
            document.createElement(
              "span"
            );


          heart.className =
            "click-heart";


          heart.textContent =
            [
              "♥",
              "♡",
              "✦"
            ][
              Math.floor(
                Math.random() * 3
              )
            ];


          heart.style.left =
            rect.left +
            rect.width / 2 +
            "px";


          heart.style.top =
            rect.top +
            rect.height / 2 +
            "px";


          heart.style.setProperty(
            "--x",
            `${
              (Math.random() - 0.5) *
              160
            }px`
          );


          heart.style.setProperty(
            "--y",
            `${
              -40 -
              Math.random() * 100
            }px`
          );


          document.body.appendChild(
            heart
          );


          setTimeout(() => {

            heart.remove();

          }, 1200);

        }

      }
    );

  });


/* =========================================================
SAFETY — HIDDEN PROPOSAL 2
========================================================= */

if (proposal2) {

  proposal2.hidden =
    true;

}
/* =========================================================
   PART 1 — INTERACTIVE LETTER
========================================================= */

const letterEnvelope =
  document.getElementById("letterEnvelope");

const openLetterBtn =
  document.getElementById("openLetterBtn");

if (letterEnvelope && openLetterBtn) {

  openLetterBtn.addEventListener(
    "click",
    () => {

      letterEnvelope.classList.toggle("open");

      if (letterEnvelope.classList.contains("open")) {

        openLetterBtn.textContent =
          "Letter opened ♥";

      } else {

        openLetterBtn.textContent =
          "Open the letter ♥";

      }

    }
  );

}

/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

if (bgMusic && musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicToggle.textContent = "🔊";
        musicToggle.setAttribute("aria-label", "Pause music");
        musicToggle.title = "Pause music";
        musicToggle.classList.add("playing");
      }).catch(() => {
        musicToggle.textContent = "🎵";
      });
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🎵";
      musicToggle.setAttribute("aria-label", "Play music");
      musicToggle.title = "Play music";
      musicToggle.classList.remove("playing");
    }
  });

  bgMusic.addEventListener("ended", () => {
    musicToggle.textContent = "🎵";
    musicToggle.classList.remove("playing");
  });
}


/* FINAL SURPRISE */
const surpriseBtn=document.getElementById("surpriseBtn"),surpriseMessage=document.getElementById("surpriseMessage");if(surpriseBtn&&surpriseMessage){surpriseBtn.addEventListener("click",()=>{surpriseMessage.hidden=false;surpriseBtn.textContent="✨ Surprise Opened";surpriseBtn.disabled=true;if(typeof rain==="function")rain(["♥","✦","✧"],35);surpriseMessage.scrollIntoView({behavior:"smooth",block:"center"})})}

/* MAGIC CURSOR TRAIL */
if(!window.__anuCursorTrailAdded){window.__anuCursorTrailAdded=true;let lastSparkTime=0;document.addEventListener("pointermove",e=>{const now=Date.now();if(now-lastSparkTime<80)return;lastSparkTime=now;const spark=document.createElement("span");spark.className="cursor-spark";spark.textContent=["♥","✦","✧","♡"][Math.floor(Math.random()*4)];spark.style.left=e.clientX+"px";spark.style.top=e.clientY+"px";document.body.appendChild(spark);setTimeout(()=>spark.remove(),850)})}

/* PREMIUM NIGHT MODE */
const themeToggle=document.getElementById("themeToggle");if(themeToggle){themeToggle.addEventListener("click",()=>{document.body.classList.toggle("night-mode");const n=document.body.classList.contains("night-mode");themeToggle.textContent=n?"☀️":"🌙";themeToggle.title=n?"Day mode":"Night mode";try{localStorage.setItem("anuNightMode",n?"1":"0")}catch(_){} });try{if(localStorage.getItem("anuNightMode")==="1"){document.body.classList.add("night-mode");themeToggle.textContent="☀️";themeToggle.title="Day mode"}}catch(_){} }



/* =========================================================
   ULTIMATE EXPERIENCE JS — additive, defensive, no overwrite
========================================================= */
(() => {
  if (window.__anuUltimateExperience) return;
  window.__anuUltimateExperience = true;

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const toast = (msg) => {
    const el = $("#uxToast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(window.__uxToastTimer);
    window.__uxToastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  };
  const unlock = (name) => {
    const el = document.querySelector(`[data-ach="${name}"]`);
    if (el) el.classList.add("unlocked");
  };

  // FINAL BEGIN ENTRY FIX:
  // Every page open starts on the cinematic BEGIN screen.
  // No scrolling is required, and the page is unlocked only after BEGIN.
  const intro = $("#uxIntro");
  const begin = $("#uxBegin");
  const typing = $("#uxIntroTyping");
  const introText = "A few memories, a few little secrets, and something made just for you.";
  let ti = 0;

  const lockEntry = () => {
    document.documentElement.classList.add("anu-entry-lock");
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const unlockEntry = () => {
    document.documentElement.classList.remove("anu-entry-lock");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const typeIntro = () => {
    if (!typing || ti > introText.length) return;
    typing.textContent = introText.slice(0, ti++);
    setTimeout(typeIntro, 34);
  };

  if (intro && !intro.classList.contains("hidden")) {
    lockEntry();
  }

  typeIntro();

  if (begin) begin.addEventListener("click", () => {
    // Remove focus first so the browser cannot scroll to the button.
    begin.blur();
    if (intro) intro.classList.add("hidden");
    unlockEntry();
    unlock("begin");
    toast("The journey begins ✨");
  });

  // Progress indicator
  const progress = $("#uxProgress");
  const fill = $("#uxProgressFill");
  const progressText = $("#uxProgressText");
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    const pct = h > 0 ? Math.min(100, Math.round((scrollY / h) * 100)) : 0;
    if (fill) fill.style.width = pct + "%";
    if (progressText) progressText.textContent = pct + "%";
    if (progress) progress.classList.toggle("visible", scrollY > 180);
  };
  addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  // Floating explore button jumps to the new journey.
  const explore = $("#uxExplore");
  if (explore) explore.addEventListener("click", () => {
    $("#uxJourney")?.scrollIntoView({behavior:"smooth", block:"start"});
  });

  // Memory reveals
  const memoryMessages = {
    "01":"04 August — Metro → Coaching. The kind of small beginning that becomes a bigger memory later.",
    "02":"Those conversations. The ordinary chats that somehow started feeling a little less ordinary.",
    "03":"Qutub Minar. One more place, one more memory, one more page in the story.",
    "04":"Somewhere along the way, you became more than just a name on a screen — you became Anu."
  };
  $$(".ux-node").forEach(node => node.addEventListener("click", () => {
    const key = node.dataset.uxMemory;
    const reveal = $("#uxMemoryReveal");
    if (!reveal) return;
    reveal.hidden = false;
    reveal.innerHTML = `<strong>${memoryMessages[key] || "A little memory worth keeping."}</strong>`;
    unlock("memory");
    toast("Memory unlocked ♥");
  }));

  // Thought cards
  const thoughts = [
    "Sometimes the smallest conversations become the ones you remember longest.",
    "There are moments you don't plan, but you're still glad they happened.",
    "I made this because some things are easier to create than to say.",
    "A tiny note: I'm genuinely glad our paths crossed."
  ];
  $$(".ux-thought").forEach((card, i) => card.addEventListener("click", () => {
    if (card.classList.contains("revealed")) return;
    card.classList.add("revealed");
    card.innerHTML = `<span>♥</span><b>${thoughts[i]}</b><em>— a little thought from Aman</em>`;
    unlock("thought");
    toast("Little thought revealed ✨");
  }));

  // Mystery boxes
  const boxMessages = [
    "You found a tiny reminder: ordinary moments can become beautiful memories.",
    "A secret for you: you didn't need to choose the 'right' box. Exploring was the point.",
    "✨ You found the special one. Consider this a tiny hidden smile, just for you."
  ];
  $$(".ux-box").forEach(box => box.addEventListener("click", () => {
    const reveal = $("#uxBoxMessage");
    if (!reveal) return;
    const n = Number(box.dataset.box) || 0;
    reveal.hidden = false;
    reveal.textContent = boxMessages[n];
    box.querySelector("span").textContent = n === 2 ? "💖" : "✨";
    unlock("mystery");
    toast("Mystery opened 🎁");
  }));

  // Constellation
  const starWrap = $("#uxConstellationStars");
  const starPositions = [[12,25],[31,63],[49,22],[68,55],[84,29]];
  const starTexts = [
    "A tiny beginning.",
    "A memory worth keeping.",
    "A conversation that stayed.",
    "A little piece of the journey.",
    "You found the last star ✨"
  ];
  let found = 0;
  if (starWrap) {
    starPositions.forEach((pos, i) => {
      const s = document.createElement("button");
      s.type = "button";
      s.className = "ux-star";
      s.style.left = pos[0] + "%";
      s.style.top = pos[1] + "%";
      s.setAttribute("aria-label", `Constellation star ${i+1}`);
      s.addEventListener("click", () => {
        if (s.classList.contains("found")) return;
        s.classList.add("found");
        found++;
        $("#uxStarCount").textContent = found;
        const reveal = $("#uxConstellationMessage");
        if (reveal) {
          reveal.hidden = false;
          reveal.textContent = starTexts[i];
        }
        if (found === 5) {
          unlock("stars");
          toast("Constellation complete 🌌");
        }
      });
      starWrap.appendChild(s);
    });
  }

  // Time capsule
  const capsuleBtn = $("#uxCapsuleBtn");
  const capsule = $("#uxCapsuleMessage");
  if (capsuleBtn && capsule) capsuleBtn.addEventListener("click", () => {
    capsule.hidden = false;
    capsuleBtn.disabled = true;
    capsuleBtn.textContent = "Time capsule opened ✨";
    toast("A note from today 💌");
  });

  // Final reveal
  const finalBtn = $("#uxFinalBtn");
  const finalReveal = $("#uxFinalReveal");
  if (finalBtn && finalReveal) finalBtn.addEventListener("click", () => {
    finalReveal.hidden = false;
    finalBtn.disabled = true;
    finalBtn.textContent = "✨ Opened";
    if (typeof window.rain === "function") {
      try { window.rain(["♥","✦","✧","♡"], 45); } catch (_) {}
    }
    finalReveal.scrollIntoView({behavior:"smooth", block:"center"});
    toast("One last little moment ♥");
  });

  // Secret keyboard easter egg: ANU
  let sequence = "";
  addEventListener("keydown", (e) => {
    if (!e.key || e.key.length !== 1) return;
    sequence = (sequence + e.key.toLowerCase()).slice(-3);
    if (sequence === "anu") {
      const hint = $("#uxSecretHint");
      if (hint) {
        hint.hidden = false;
        setTimeout(() => hint.hidden = true, 2600);
      }
      toast("Secret found ✨");
      sequence = "";
    }
  });

  // Click sparkles without touching the existing cursor implementation.
  let last = 0;
  addEventListener("pointerdown", e => {
    const now = Date.now();
    if (now - last < 120) return;
    last = now;
    const s = document.createElement("span");
    s.textContent = ["✦","✧","♡"][Math.floor(Math.random()*3)];
    s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;z-index:100002;pointer-events:none;color:#d95778;font-size:13px;transform:translate(-50%,-50%);transition:all .75s cubic-bezier(.22,1,.36,1);`;
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.opacity = "0";
      s.style.transform = "translate(-50%,-65px) scale(.35)";
    });
    setTimeout(() => s.remove(), 800);
  }, {passive:true});

  // Small-screen friendly: don't run the intro repeatedly during the same tab session.
})();



/* ============================================================
   CLEAN PUBLIC ENTRY — one guard, no scroll-jump hacks
   ============================================================ */
(function(){
  if(window.__anuCleanEntryGuard) return;
  window.__anuCleanEntryGuard = true;

  try { history.scrollRestoration = 'manual'; } catch (_) {}

  function top(){
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  // Only reset on a fresh navigation/reload. Back/forward navigation is
  // allowed to keep its natural browser position.
  const nav = performance.getEntriesByType('navigation')[0];
  const type = nav ? nav.type : 'navigate';
  if(type !== 'back_forward') {
    top();
    addEventListener('load', top, {once:true, passive:true});
    addEventListener('pageshow', function(e){
      if(!e.persisted) top();
    }, {passive:true});
  }
})();


/* FINAL CLEAN END — clamp accidental blank tail */
(function () {
  let endTimer = null;

  function clampEnd() {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (window.scrollY > max + 2) {
      window.scrollTo(0, max);
    }
  }

  window.addEventListener("resize", clampEnd, { passive: true });
  window.addEventListener("scroll", function () {
    clearTimeout(endTimer);
    endTimer = setTimeout(clampEnd, 80);
  }, { passive: true });
})();
