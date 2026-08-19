const CDP = "http://127.0.0.1:9333";
const t = await (await fetch(`${CDP}/json/list`)).json();
const page = t.find((x) => x.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
});
await new Promise((r) => ws.addEventListener("open", r));
const send = (m, p = {}) => new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method: m, params: p })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, returnByValue: true })).result?.value;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await send("Page.navigate", { url: "https://aupetit-soin.fr/connexion" });
await wait(7000);

// Attend que React ait hydraté avant de cliquer.
for (let i = 0; i < 20; i++) {
  const ok = await ev(`!!document.querySelector('[aria-label="Afficher le mot de passe"]')`);
  if (ok) break;
  await wait(500);
}

await ev(`
(() => {
  const set = (n, v) => {
    const el = document.querySelector('[name="' + n + '"]');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  set('email','contact@aupetit-soin.fr');
  set('password','AuxPetitsSoins2026!');
})()`);
await ev(`document.querySelector('form button[type="submit"]').click()`);

// Attend la redirection effective.
let landed = "";
for (let i = 0; i < 30; i++) {
  landed = await ev(`location.pathname`);
  if (landed.startsWith("/admin")) break;
  await wait(700);
}
console.log("après connexion :", landed);

await send("Page.navigate", { url: "https://aupetit-soin.fr/admin/apparence" });
await wait(7000);

console.log(await ev(`
JSON.stringify({
  url: location.pathname,
  h1: document.querySelector('h1')?.innerText,
  h2: document.querySelector('h2')?.innerText,
  boutons: [...document.querySelectorAll('button')].map(b=>b.innerText.trim()).filter(Boolean),
  champFichier: !!document.querySelector('input[type=file]'),
  formats: document.querySelector('input[type=file]')?.getAttribute('accept'),
  menu: [...document.querySelectorAll('nav a')].map(a=>a.innerText.trim())
}, null, 1)
`));
ws.close();
