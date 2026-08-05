import { useEffect, useState } from "react";
import useReveal from "../../hooks/useReveal";
import { stats } from "../../data";

function Counter({ target }) {
  const [current, setCurrent] = useState(0);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (!visible) return;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <h2 ref={ref}>{current}+</h2>;
}

export default function Stats() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      className={`stats reveal ${visible ? "in-view" : ""}`}
    >
      {stats.map((stat, i) =>
        stat.value !== null ? (
          <div key={i}>
            <Counter target={stat.value} />
            <p>{stat.label}</p>
          </div>
        ) : (
          <div key={i}>
            <h2>{stat.display}</h2>
            <p>{stat.label}</p>
          </div>
        )
      )}
    </section>
  );
}
