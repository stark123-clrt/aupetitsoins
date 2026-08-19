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
await wait(8000);
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
console.log("valeurs saisies :", await ev(`document.querySelector('[name="email"]').value + ' / ' + document.querySelector('[name="password"]').value.length + ' caracteres'`));
await ev(`document.querySelector('form button[type="submit"]').click()`);
await wait(9000);
console.log("chemin :", await ev(`location.pathname`));
console.log("message :", await ev(`document.body.innerText.match(/Identifiants[^\n]*|Erreur[^\n]*/)?.[0] || 'aucun message'`));
ws.close();
