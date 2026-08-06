const apiKey = import.meta.env.VITE_HOLODEX_API_KEY;
console.log(apiKey);
const res = await fetch(
  "https://holodex.net/api/v2/channels?org=Hololive&type=vtuber&limit=80",
  { headers: { "X-APIKEY": apiKey } },
);
const all = await res.json();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const twelve = shuffle(all).slice(0, 12);
export const cardList = twelve.map((v) => ({
  name: v.english_name || v.name,
  photo: v.photo,
}));
