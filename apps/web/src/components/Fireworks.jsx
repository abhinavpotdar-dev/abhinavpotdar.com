import React from 'react';
const bursts = [
  { x: '14%', y: '22%', delay: '1s', scale: '.8' },
  { x: '84%', y: '18%', delay: '2.8s', scale: '1' },
  { x: '74%', y: '48%', delay: '4.2s', scale: '.65' },
  { x: '25%', y: '52%', delay: '5.5s', scale: '.55' },
];

export default function Fireworks() {
  return <div className="fireworks" aria-hidden="true">{bursts.map((burst, i) =>
    <div className="firework" key={i} style={{ '--x': burst.x, '--y': burst.y, '--delay': burst.delay, '--scale': burst.scale }}>
      {Array.from({ length: 12 }, (_, j) => <i key={j} style={{ '--ray': j }} />)}
    </div>
  )}</div>;
}