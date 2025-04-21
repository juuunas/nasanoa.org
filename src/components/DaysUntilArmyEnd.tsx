import { useEffect, useState } from "preact/hooks";

function getDaysUntilJune19Finland(): number {
  const today = new Date(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Helsinki",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date())
  );

  const year = today.getFullYear();
  const target = new Date(`${year}-06-19`);

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInDays = Math.round(
    (target.getTime() - today.getTime()) / msPerDay
  );

  return diffInDays;
}

export default function DaysUntilArmyEnd() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    setDaysLeft(getDaysUntilJune19Finland());
  }, []);

  return (
    <div
      className="group relative h-full text-green-100 rounded-2xl shadow hover:scale-105 transition-all duration-300 p-6 max-w-72 mx-auto text-center font-mono tracking-wide overflow-hidden"
      style={{
        backgroundImage:
          "url('https://www.antikvariaatti.net/tuotekuvat/isot/2210306.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Tänään jäljellä{" "}
          <span class="hidden text-white/25 group-hover:block">
            (1/25, 165)
          </span>
        </h2>
        {daysLeft !== null ? (
          daysLeft <= 0 ? (
            <p className="text-4xl md:text-5xl font-extrabold text-yellow-300">
              Ohi on!
            </p>
          ) : (
            <>
              <p className="text-4xl md:text-5xl font-extrabold text-yellow-200">
                {daysLeft}
              </p>
            </>
          )
        ) : (
          <p className="relative z-10">Lasketaan...</p>
        )}
      </div>
    </div>
  );
}
