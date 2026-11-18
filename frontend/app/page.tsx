"use client";

import { useEffect, useState } from "react";

interface Faction {
  id: number;
  name: string;
  unitCount: number;
}

export default function Home() {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchFactions = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/factions`);
      if (!res.ok) throw new Error("Failed to fetch factions");
      const data = await res.json();
      setFactions(data);
    } catch (err) {
      setError("Could not connect to backend API.");
    }
  };

  useEffect(() => {
    fetchFactions();
  }, []);

  const handleAddFaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch(`${apiUrl}/api/factions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName("");
      fetchFactions();
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">40th Millenium Tabletop Companion</h1>

      <form onSubmit={handleAddFaction} className="flex gap-3 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter faction name (e.g., T'au Empire)"
          className="flex-1 px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-amber-600 hover:bg-amber-500 rounded font-semibold"
        >
          Add Faction
        </button>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <ul className="space-y-3">
        {factions.map((faction) => (
          <li
            key={faction.id}
            className="p-4 rounded bg-zinc-900 border border-zinc-800 flex justify-between items-center"
          >
            <span className="font-medium">{faction.name}</span>
            <span className="text-sm text-zinc-400">{faction.unitCount} units</span>
          </li>
        ))}
      </ul>
    </main>
  );
}