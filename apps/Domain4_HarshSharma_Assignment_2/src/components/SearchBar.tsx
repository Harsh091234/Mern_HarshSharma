import React, { useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';



interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => {
  const [query, setQuery] = useState("");
 

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return; 
    onSearch(query);
    setQuery(""); 
  };

  return (
    <form
      className="flex max-sm:flex-col w-full max-w-lg items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="outline" className=' max-sm:w-full   cursor-pointer'>
        Search
      </Button>
    </form>
  );
}

export default SearchBar
