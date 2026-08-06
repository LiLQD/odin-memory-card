const apiKey = import.meta.env.VITE_HOLODEX_API_KEY;
console.log(apiKey);
const channels = await fetch(
  "https://holodex.net/api/v2/channels?org=Hololive&type=vtuber&limit=100",
  { headers: { "X-APIKEY": apiKey } },
).then((res) => res.json());
const excludedNames = ["hololive Dreams", "UNIT B", "HOLOEARTH"];
console.log("Fetched data: ", channels);
const shuffled = channels
  .filter(
    (channel) =>
      !channel.inactive &&
      channel.group !== "Official" &&
      !excludedNames.some((name) => channel.name.startsWith(name)),
  )
  .map(({ english_name, photo }) => ({
    english_name,
    photo,
  }));

for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

export const cardList = shuffled.slice(0, 12);
