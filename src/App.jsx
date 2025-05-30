import React, { useEffect, useState } from 'react';

const App = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'card_inventory.json')
      .then(res => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const filtered = cards.filter(card =>
    card["Card Name"]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tinker & Tap Card Browser</h1>
      <input
        className="p-2 border w-full mb-4 rounded"
        type="text"
        placeholder="Search cards..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((card, i) => (
          <div key={i} className="border rounded shadow p-2 bg-white">
            <img
              src={card["Image URL"]}
              alt={card["Card Name"]}
              className="mb-2 w-full h-64 object-cover"
            />
            <div className="font-semibold">{card["Card Name"]}</div>
            <div className="text-sm text-gray-500">Price: ${card["TCG Market"]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
