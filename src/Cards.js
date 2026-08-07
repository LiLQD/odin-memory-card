const apiKey = import.meta.env.VITE_HOLODEX_API_KEY;
console.log(apiKey);
const channels = await fetch(
  "https://holodex.net/api/v2/channels?org=Hololive&type=vtuber&limit=100",
  { headers: { "X-APIKEY": apiKey } },
).then((res) => res.json());
const excludedNames = [
  "hololive Dreams",
  "UNIT B",
  "HOLOEARTH",
  "ACHRORA",
  "Midnight Grand Orchestra",
  "hololive OFFICIAL CARD GAME",
  "Octavio",
];
const isSubChannel = (channel) => {
  const name = (channel.english_name || channel.name || "").toLowerCase();
  return name.includes("sub") || name.includes("subch");
};
const shuffled = channels
  .filter(
    (channel) =>
      !channel.inactive &&
      !isSubChannel(channel) &&
      channel.group !== "Official" &&
      !excludedNames.some((name) =>
        (channel.english_name || channel.name || "")
          .toLowerCase()
          .includes(name.toLowerCase()),
      ),
  )
  .map(({ english_name, photo }) => ({
    english_name,
    photo,
  }));
console.log("Filtered data: ", shuffled);
export function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
fisherYatesShuffle(shuffled);
export const cardList = shuffled.slice(0, 12);
