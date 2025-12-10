"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchEvents, triggerFetch } from "@/services/api";

import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import SearchBar from "@/components/SearchBar";
import FetchButton from "@/components/FetchButton";
import EventGrid from "@/components/EventGrid";
import Pagination from "@/components/Pagination";
import PriorityControls from "@/components/PriorityControls";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("hackathon");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [sortByPriority, setSortByPriority] = useState(true);
  const [highPriorityOnly, setHighPriorityOnly] = useState(false);

  const PER_PAGE = 9;

  async function loadData() {
    const data = await fetchEvents();
    setEvents(data);
  }

  async function handleFetch() {
    setLoading(true);
    await triggerFetch();
    await loadData();
    setLoading(false);
    setPage(1);
  }

  useEffect(() => {
    loadData();
  }, []);

  // ✅ FULL FILTER + SORT PIPELINE (BEFORE PAGINATION)
  const processedData = useMemo(() => {
    let result = events.filter(e => e.type === tab);

    // ✅ SEARCH FILTER
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        e =>
          e.title?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q)
      );
    }

    // ✅ HIGH PRIORITY ONLY FILTER
    if (highPriorityOnly) {
      result = result.filter(e => e.priority >= 70);
    }

    // ✅ SORT BY PRIORITY (HIGH → LOW)
    if (sortByPriority) {
      result = [...result].sort((a, b) => b.priority - a.priority);
    }

    return result;
  }, [events, tab, search, highPriorityOnly, sortByPriority]);

  // ✅ PAGINATION (APPLIED TO processedData)
  const total = processedData.length;
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const paginatedData = processedData.slice(start, end);

  // ✅ RESET PAGE ON FILTER CHANGE
  useEffect(() => {
    setPage(1);
  }, [tab, search, highPriorityOnly, sortByPriority]);

  return (
    <main className="min-h-screen bg-gradient-via-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <Tabs active={tab} setActive={setTab} />

          <div className="flex gap-3 w-full md:w-auto">
            <SearchBar value={search} onChange={setSearch} />
            <FetchButton onClick={handleFetch} loading={loading} />
          </div>

          <PriorityControls
            sortByPriority={sortByPriority}
            setSortByPriority={setSortByPriority}
            highPriorityOnly={highPriorityOnly}
            setHighPriorityOnly={setHighPriorityOnly}
          />
        </div>

        <EventGrid data={paginatedData} loading={loading} />

        <Pagination
          total={total}
          page={page}
          setPage={setPage}
          perPage={PER_PAGE}
        />
      </div>
    </main>
  );
}
