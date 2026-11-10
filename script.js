const CHAPS = [
  {
    t: "1. A Garagem",
    d: "Lance seu primeiro jogo.",
    g: "Lançar 1 jogo",
    ok: (s) => s.rel.length >= 1,
    rM: 3500,
    rRP: 15
  },
  {
    t: "2. Primeiro Viral",
    d: "Conquiste fãs e pesquise.",
    g: "500 fãs e 2 pesquisas",
    ok: (s) => s.fans >= 500 && s.res.length >= 2,
    rM: 7000,
    rRP: 25
  },
  {
    t: "3. Nova Engine",
    d: "Compre uma engine melhor.",
    g: "Ter 2 Engines",
    ok: (s) => s.engs.length >= 2,
    rM: 15000,
    rRP: 35
  },
  {
    t: "4. Além-Fronteira",
    d: "Abra uma sede internacional.",
    g: "2 Sedes",
    ok: (s) => s.hqs.length >= 2,
    rM: 30000,
    rRP: 50
  },
  {
    t: "5. Legado Indie",
    d: "Torne-se lenda mundial!",
    g: "5.000 fãs",
    ok: (s) => s.fans >= 5000,
    rM: 150000,
    rRP: 100
  }
];
const ENGINES = [
  {
    id: "gdev",
    n: "G-Developo 2D/3D",
    real: "GDevelop",
    mult: 1.0,
    c: 0,
    d: "Leve e visual."
  },
  {
    id: "godot",
    n: "Godotô OpenEngine",
    real: "Godot",
    mult: 1.35,
    c: 3000,
    d: "Código aberto indie."
  },
  {
    id: "unity",
    n: "Unidade 3D Pro",
    real: "Unity",
    mult: 1.85,
    c: 8500,
    d: "Versátil multiplataforma."
  },
  {
    id: "unreal",
    n: "Irreal Engine 5",
    real: "Unreal",
    mult: 2.6,
    c: 22000,
    d: "Gráficos realistas."
  },
  {
    id: "source",
    n: "Fonte Valvular 2",
    real: "Source",
    mult: 3.2,
    c: 45000,
    d: "Física avançada."
  }
];
const RESEARCHES = [
  {
    id: "g_rpg",
    n: "Gênero: RPG Mundo Aberto",
    rp: 15,
    type: "genre",
    val: "RPG Mundo Aberto",
    d: "Libera RPGs."
  },
  {
    id: "g_sim",
    n: "Gênero: Simulação / Tycoon",
    rp: 15,
    type: "genre",
    val: "Simulação / Tycoon",
    d: "Libera Tycoons."
  },
  {
    id: "t_3d",
    n: "Iluminação Ray-Tracing",
    rp: 25,
    type: "bonus",
    q: 0.25,
    d: "+25% qualidade."
  },
  {
    id: "t_ai",
    n: "IA de NPCs",
    rp: 35,
    type: "bonus",
    q: 0.35,
    d: "+35% gameplay."
  },
  {
    id: "t_mp",
    n: "Multiplayer Online",
    rp: 45,
    type: "bonus",
    q: 0.5,
    d: "+50% receita."
  }
];
const ITEMS = [
  {
    id: "pc",
    n: "PC Workstation",
    d: "+15% qualidade",
    c: 2500,
    q: 0.15,
    sl: 0
  },
  {
    id: "sl",
    n: "Nova Equipe Dev",
    d: "+1 jogo simultâneo",
    c: 4500,
    q: 0.05,
    sl: 1
  },
  {
    id: "au",
    n: "Estúdio de Áudio",
    d: "+25% qualidade",
    c: 6000,
    q: 0.25,
    sl: 0
  }
];
const HQS = [
  { id: "br", n: "Garagem (Brasil)", b: "Base", mult: 1.0, c: 0 },
  { id: "jp", n: "Tóquio (Japão)", b: "+35% vendas", mult: 1.35, c: 15000 },
  {
    id: "us",
    n: "Vale do Silício (EUA)",
    b: "+60% vendas",
    mult: 1.6,
    c: 40000
  }
];
const EVS = [
  {
    t: "🐛 Bug Viralizou!",
    d: "Virou meme positivo!",
    c1: [
      "Deixar (+300 fãs, +10 RP)",
      (s) => {
        s.fans += 300;
        s.rp += 10;
      }
    ],
    c2: [
      "Corrigir (+15 RP, +10% Moral)",
      (s) => {
        s.rp += 15;
        s.hype = Math.min(100, s.hype + 10);
      }
    ]
  },
  {
    t: "🎥 Streamer Jogou!",
    d: "Influenciador adorou!",
    c1: [
      "Chaves VIP (+400 fãs, +1💎)",
      (s) => {
        s.fans += 400;
        s.gems += 1;
      }
    ],
    c2: [
      "Agradecer (+200 fãs, +R$ 1.500)",
      (s) => {
        s.fans += 200;
        s.money += 1500;
      }
    ]
  }
];

let st = {
  money: 5000,
  rp: 20,
  gems: 5,
  hype: 70,
  fans: 100,
  day: 1,
  chap: 1,
  slots: 1,
  qM: 1,
  hqM: 1,
  curHQ: "Garagem (Brasil)",
  hqs: ["br"],
  engs: ["gdev"],
  genres: ["Aventura Espacial", "Ação / Plataforma"],
  res: new Array(),
  proj: new Array(),
  rel: new Array()
};
let paused = false;
const $ = (id) => document.getElementById(id);
const toast = (m) => {
  const t = $("msg");
  t.textContent = m;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2600);
};
function render() {
  $("h-hq").textContent = st.curHQ;
  $("h-money").textContent = st.money.toLocaleString("pt-BR");
  $("h-rp").textContent = st.rp;
  $("r-rp").textContent = st.rp;
  $("h-gems").textContent = st.gems;
  $("h-hype").textContent = st.hype;
  $("h-fans").textContent = st.fans.toLocaleString("pt-BR");
  $("h-day").textContent = st.day;
  $("h-slots").textContent = st.proj.length + "/" + st.slots;

  const gSel = $("in-genre"),
    oldG = gSel.value;
  gSel.innerHTML = st.genres
    .map((g) => `<option value="${g}">${g}</option>`)
    .join("");
  if (oldG && st.genres.includes(oldG)) gSel.value = oldG;

  const eSel = $("in-engine"),
    oldE = eSel.value;
  eSel.innerHTML = st.engs
    .map((id) => {
      const e = ENGINES.find((x) => x.id === id);
      return `<option value="${e.id}">${e.n} (${e.mult}x)</option>`;
    })
    .join("");
  if (oldE && st.engs.includes(oldE)) eSel.value = oldE;

  $("list-proj").innerHTML =
    st.proj
      .map(
        (p) =>
          `<div class="card"><span class="badge">${p.g} • ${p.eName}</span><h4>${p.n}</h4><div class="progress-bg"><div class="progress-fill" style="width:${p.pr}%"></div></div><small>${p.pr}%</small></div>`
      )
      .join("") || "<p style='color:var(--muted)'>Nenhum projeto.</p>";
  $("list-rel").innerHTML =
    st.rel
      .map(
        (g, i) =>
          `<div class="card"><span class="badge green">Nota ${
            g.sc
          }/10</span><h4>${g.n}</h4><small>${g.g} • ${
            g.eName
          }</small><strong style="color:var(--gold)">${
            i < 5 ? "+R$ " + g.inc + "/dia" : "Clássico"
          }</strong></div>`
      )
      .join("") || "<p style='color:var(--muted)'>Nenhum lançado.</p>";
  $("list-res").innerHTML = RESEARCHES.map((r) => {
    const ok = st.res.includes(r.id);
    return `<div class="card"><div><span class="badge">${r.rp} RP</span><h4>${
      r.n
    }</h4><p style="font-size:0.85rem;color:var(--muted)">${
      r.d
    }</p></div><button class="btn-primary" ${
      ok ? "disabled" : ""
    } onclick="buyRes('${r.id}')">${
      ok ? "Pesquisado ✅" : r.rp + " RP"
    }</button></div>`;
  }).join("");
  $("list-eng").innerHTML = ENGINES.map((e) => {
    const ok = st.engs.includes(e.id);
    return `<div class="card"><div><span class="badge gold">${e.mult}x • ${
      e.real
    }</span><h4>${e.n}</h4><p style="font-size:0.85rem;color:var(--muted)">${
      e.d
    }</p></div><button class="btn-primary" ${
      ok ? "disabled" : ""
    } onclick="buyEng('${e.id}')">${
      ok ? "Ativa ✅" : "R$ " + e.c.toLocaleString("pt-BR")
    }</button></div>`;
  }).join("");
  $("list-shop").innerHTML = ITEMS.map(
    (it) =>
      `<div class="card"><div><h4>${
        it.n
      }</h4><p style="font-size:0.85rem;color:var(--muted)">${
        it.d
      }</p></div><button class="btn-primary" onclick="buyIt('${
        it.id
      }')">R$ ${it.c.toLocaleString("pt-BR")}</button></div>`
  ).join("");
  $("list-hq").innerHTML = HQS.map((h) => {
    const ok = st.hqs.includes(h.id);
    return `<div class="card"><div><span class="badge">${h.b}</span><h4>${
      h.n
    }</h4></div><button class="btn-primary" onclick="buyHQ('${h.id}')">${
      ok
        ? st.curHQ === h.n
          ? "Atual 📍"
          : "Ativar"
        : "R$ " + h.c.toLocaleString("pt-BR")
    }</button></div>`;
  }).join("");

  const ch = CHAPS[st.chap - 1];
  $("c-badge").textContent = "Capítulo " + st.chap + "/" + CHAPS.length;
  $("c-title").textContent = ch.t;
  $("c-text").textContent = ch.d;
  $("c-goal").textContent = ch.g + " (+R$ " + ch.rM + " e +" + ch.rRP + " RP)";
  $("btn-chap-ok").disabled = !ch.ok(st);
}

window.buyRes = (id) => {
  const r = RESEARCHES.find((x) => x.id === id);
  if (st.rp < r.rp) return toast("⚠️ RP insuficientes!");
  st.rp -= r.rp;
  st.res.push(id);
  if (r.type === "genre") st.genres.push(r.val);
  else st.qM += r.q;
  toast("🔬 " + r.n);
  render();
};
window.buyEng = (id) => {
  const e = ENGINES.find((x) => x.id === id);
  if (st.money < e.c) return toast("⚠️ Saldo insuficiente!");
  st.money -= e.c;
  st.engs.push(id);
  toast("⚙️ " + e.n);
  render();
};
window.buyIt = (id) => {
  const it = ITEMS.find((x) => x.id === id);
  if (st.money < it.c) return toast("⚠️ Saldo insuficiente!");
  st.money -= it.c;
  st.qM += it.q;
  st.slots += it.sl;
  toast("✅ " + it.n);
  render();
};
window.buyHQ = (id) => {
  const h = HQS.find((x) => x.id === id);
  if (st.hqs.includes(id)) {
    st.curHQ = h.n;
    return render();
  }
  if (st.money < h.c) return toast("⚠️ Saldo insuficiente!");
  st.money -= h.c;
  st.hqs.push(id);
  st.hqM = Math.max(st.hqM, h.mult);
  st.curHQ = h.n;
  toast("🌍 " + h.n);
  render();
};

$("btn-start").onclick = () => {
  $("intro").classList.add("hidden");
  render();
};
$("btn-create").onclick = () => {
  if (st.proj.length >= st.slots) return toast("⚠️ Sem equipes livres!");
  const sc = Number($("in-scope").value),
    cost = sc === 1 ? 1000 : sc === 2 ? 3500 : 10000;
  if (st.money < cost) return toast("⚠️ Precisa de R$ " + cost);
  const n =
    $("in-name").value.trim() ||
    "Jogo #" + (st.rel.length + st.proj.length + 1);
  const eng =
    ENGINES.find((x) => x.id === $("in-engine").value) || ENGINES.at(0);
  st.money -= cost;
  st.proj.push({
    n,
    g: $("in-genre").value,
    eName: eng.n,
    eMult: eng.mult,
    scope: sc,
    pr: 0
  });
  $("in-name").value = "";
  toast("🚀 Iniciado: " + n);
  render();
};
$("btn-chap-ok").onclick = () => {
  const ch = CHAPS[st.chap - 1];
  if (!ch.ok(st)) return;
  st.money += ch.rM;
  st.rp += ch.rRP;
  if (st.chap < CHAPS.length) st.chap++;
  toast("🏆 Capítulo concluído!");
  render();
};

document.querySelectorAll(".tab").forEach(
  (b) =>
    (b.onclick = () => {
      document
        .querySelectorAll(".tab")
        .forEach((x) => x.classList.remove("active"));
      document
        .querySelectorAll(".sec")
        .forEach((s) => s.classList.add("hidden"));
      b.classList.add("active");
      $("t-" + b.dataset.t).classList.remove("hidden");
      render();
    })
);

setInterval(() => {
  if (!$("intro").classList.contains("hidden") || paused) return;
  st.day++;
  st.rp += 2;
  if (st.day % 3 === 0) st.gems++;
  for (let i = st.proj.length - 1; i >= 0; i--) {
    st.proj[i].pr += 25;
    if (st.proj[i].pr >= 100) {
      const p = st.proj.splice(i, 1).at(0);
      const sc = Math.min(
        10,
        Math.max(1, (5 + Math.random() * 4) * st.qM * p.eMult * (st.hype / 75))
      ).toFixed(1);
      const inc = Math.round(sc * 180 * p.scope * st.hqM);
      st.rel.unshift({ n: p.n, g: p.g, eName: p.eName, sc, inc });
      st.fans += Math.round(sc * 50 * p.scope);
      st.money += inc * 2;
      st.rp += 5;
      toast("🎉 " + p.n + " lançado! Nota " + sc + "/10");
    }
  }
  st.rel.slice(0, 5).forEach((g) => (st.money += g.inc));
  if (st.day % 10 === 0) {
    paused = true;
    const ev = EVS.at(Math.floor(Math.random() * EVS.length));
    $("ev-title").textContent = ev.t;
    $("ev-desc").textContent = ev.d;
    $("ev-btns").innerHTML = "";
    [ev.c1, ev.c2].forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "btn-primary";
      btn.textContent = c.at(0);
      btn.onclick = () => {
        c.at(1)(st);
        $("ev-modal").classList.add("hidden");
        paused = false;
        render();
      };
      $("ev-btns").appendChild(btn);
    });
    $("ev-modal").classList.remove("hidden");
  }
  render();
}, 1500);

render();
