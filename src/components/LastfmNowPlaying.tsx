import { useEffect, useState } from "preact/hooks";

export default function LastfmNowPlaying({ username }: { username: string }) {
  const [data, setData] = useState<{
    imageUrl: string;
    artist: string;
    song: string;
  }>({ imageUrl: "", artist: "", song: "" });

  useEffect(() => {
    const fetchLastFm = async () => {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=404bfb4dc499a18ebb78eea2e62988f1&format=json`
      )
        .then((res) => res.json())
        .then((data) => data.recenttracks.track[0])
        .then((data) =>
          data["@attr"].nowplaying
            ? setData({
                imageUrl: data.image[3]["#text"],
                artist: data.artist["#text"],
                song: data.name,
              })
            : false
        );
    };
    fetchLastFm();
    setInterval(() => fetchLastFm(), 60000);
  }, []);

  return data.song ? (
    <a
      class="not-prose"
      href="https://www.last.fm/user/jjthtrthrrge4te"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        class="shadow-lg border text-white p-4 rounded-lg bg-blend-darken bg-neutral-500 hover:bg-neutral-400 transition"
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p class="tracking-tighter text-lg">
          I'm currently listening to <strong>{data.song}</strong> by{" "}
          <em>
            <i>{data.artist}</i>
          </em>
        </p>
      </div>
    </a>
  ) : (
    ""
  );
}
