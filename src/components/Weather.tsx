import { useEffect, useState } from "preact/hooks";

type WeatherData = {
  temperature: number;
  symbolCode: string;
  precipitation: number;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=60.996010&lon=24.464230",
          {
            headers: {
              "User-Agent": "astro-weather-widget/1.0 you@example.com",
            },
          }
        );
        const data = await res.json();
        const now = data.properties.timeseries[0];
        const instant = now.data.instant.details;
        const symbolCode =
          now.data.next_1_hours?.summary?.symbol_code ?? "clearsky_day";
        const precipitation =
          now.data.next_1_hours?.details?.precipitation_amount ?? 0;

        setWeather({
          temperature: instant.air_temperature,
          symbolCode,
          precipitation,
        });
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return (
      <div className="text-sm text-gray-500 border border-gray-200 rounded-xl p-6 h-fit bg-white shadow-sm w-fit">
        Loading weather…
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl bg-white shadow-sm p-6 w-fit h-fit text-sm text-gray-800">
      <div>
        <div className="font-semibold text-gray-900">Hämeenlinna</div>
        <div className="text-gray-600">
          {weather.temperature.toFixed(1)}°C &middot; {weather.precipitation} mm
        </div>
      </div>
      <img
        src={`https://api.met.no/images/weathericons/svg/${weather.symbolCode}.svg`}
        alt={weather.symbolCode}
        className="w-10 h-10"
      />
    </div>
  );
};

export default WeatherWidget;
