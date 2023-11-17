import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "../(site)/components/SearchInput";

import SearchContent from "./components/SearchContent";

import Header from "../(site)/components/Header";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className="
        bg-neutral-900 
        
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search Sound Effect
          </h1>
          <SearchInput />
        </div>
      </Header>

      <h3 className="text-white text-3xl mb-4 font-semibold text-center">
        Suggestions
      </h3>

      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
