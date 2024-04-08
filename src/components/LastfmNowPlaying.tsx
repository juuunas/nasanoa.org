import { useEffect, useState } from "preact/hooks";

interface StateTypes {
  imageUrl: string;
  artist: string;
  song: string;
  cached: number;
}

interface LastfmResponse {
  recenttracks: {
    track: {
      artist: {
        "#text": string;
      };
      image: {
        "#text": string;
      }[];
      "@attr": {
        nowplaying: string;
      };
      name: string;
    }[];
  };
}

const initState: StateTypes = {
  imageUrl: "",
  artist: "",
  song: "",
  cached: 0,
};

export default function LastfmNowPlaying({ username }: { username: string }) {
  const [data, setData] = useState<StateTypes>(initState);

  useEffect(() => {
    const fetchLastFm = () => {
      const cached: StateTypes = JSON.parse(localStorage.getItem("np") || "{}");
      if (cached?.artist && new Date().getTime() - cached.cached < 30000) {
        setData(cached);
        return;
      }

      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=${username}&api_key=404bfb4dc499a18ebb78eea2e62988f1&format=json`
      )
        .then((res) => res.json())
        .then((data: LastfmResponse) => data.recenttracks.track[0])
        .then((data) => {
          let state = {
            imageUrl: data.image[3]["#text"],
            artist: data.artist["#text"],
            song: data.name,
            cached: new Date().getTime(),
          };
          if (data["@attr"]?.nowplaying) {
            setData(state);
            localStorage.setItem("np", JSON.stringify(state));
          } else {
            setData(initState);
            localStorage.removeItem("np");
          }
        });
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
