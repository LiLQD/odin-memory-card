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
export function channelFilter(channels) {
  return channels
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
    .map(({ english_name, photo, id }) => ({
      english_name,
      photo,
      id,
    }));
}
export function fisherYatesShuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
