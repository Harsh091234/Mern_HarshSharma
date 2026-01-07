import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onFilterChange: (filters: {
    genre: string;
    year: string;
    sortBy: string;
  }) => void;
}

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Romance",
  "Sci-Fi",
];
const years = Array.from({ length: 30 }, (_, i) => `${2026 - i}`); // last 30 years
const sortOptions = ["Popularity", "Release Date", "Rating"];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [genre, setGenre] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

const handleApplyFilters = () => {
  onFilterChange({
    genre: genre || "",
    year: year || "",
    sortBy: sortBy || "",
  });
};
  return (
    <div className="flex flex-row items-center justify-center gap-4 bg-white p-4 rounded-lg  mb-6">
      {/* Genre */}
      <Select value={genre} onValueChange={(val: string) => setGenre(val)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year */}
      <Select value={year} onValueChange={(val: string) => setYear(val)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select value={sortBy} onValueChange={(val: string) => setSortBy(val)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Apply Button */}
      <Button onClick={handleApplyFilters} className="cursor-pointer mt-2 md:mt-0">
        Apply
      </Button>
    </div>
  );
};

export default FilterBar;
