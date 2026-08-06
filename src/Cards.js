const apiKey = import.meta.env.VITE_HOLODEX_API_KEY;
console.log(apiKey);
const channels = await fetch(
  "https://holodex.net/api/v2/channels?org=Hololive&limit=12",
  { headers: { "X-APIKEY": apiKey } },
).then((res) => res.json());
export const cardList = channels.map((channel) => ({
  name: channel.english_name || channel.name,
  photo: channel.photo,
}));
