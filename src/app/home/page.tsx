import Link from "next/link";
import fetchComic, { fetchComics } from "@/api/api";
import DayComic from "@/components/Home/DayComic";
import MonthComics from "@/components/Home/MonthComics";
import Newsletter from "@/components/Newsletter";
import Button from "@/components/reusable/button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const comicIds = [4292, 400, 602, 608, 5225, 960, 5849];
  const today = new Date();
  const randomComicId = comicIds[today.getDay()];

  const randomComic = await fetchComic(String(randomComicId));

  const [lastMonthComics, _] = await fetchComics({ date: "thisMonth" });

  return (
    <section className="flex flex-col justify-center items-center w-full relative">
      <div className="bg-bg bottom-[24rem] top-0 w-full absolute -z-10"></div>
      <div className="min-h-[calc(100vh-220px)] flex flex-col md:flex-row justify-around w-full">
        <div className="flex flex-col w-full md:w-2/3 mb-10 md:mb-0 items-start min-h-full pt-20 p-8 md:p-20 bg-overlay rounded-br-xl">
          
          {/* New: Welcome Section */}
          <div className="comic bg-transparent mb-10 p-4 bg-light rounded-xl shadow-md">
            <h1 className="text-3xl font-semibold text-center md:text-left text-dark">
              Welcome to the World of Comics!
            </h1>
            <p className="text-md text-center md:text-left mt-4 text-muted">
              Whether you're a long-time fan or just starting your comic journey,
              you're in the right place. Explore our vast library of comics, 
              discover hidden gems, and find your next favorite story!
            </p>
          </div>
          
          {/* Main content section */}
          <div className="comic p-4 bg-tertiary rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-10 text-center md:text-left text-primary">
              Explore Our Comic Collection
            </h2>
            <p className="text-lg mb-20 text-center md:text-left text-muted">
              Dive into a world of adventure, mystery, and excitement with our
              extensive collection of comics. From timeless classics to the
              latest releases, there&apos;s something for every comic
              enthusiast.
            </p>
            <Link href="/store" passHref>
              <Button className="w-fit text-xl self-end mr-4 bg-primary hover:bg-secondary">
                Let&apos;s go!
              </Button>
            </Link>
          </div>

        </div>

        {/* Featured Comic of the Day */}
        <div className="h-full w-full md:w-1/3 flex-1 flex justify-center items-center">
          {randomComic && <DayComic comic={randomComic} />}
        </div>
      </div>

      {/* Month's Best Comics */}
      <div className="w-full mt-10">
        <MonthComics comics={lastMonthComics.slice(0, 20)} />
      </div>

      {/* Newsletter Signup Section */}
      <div className="w-full mt-10">
        <Newsletter />
      </div>
    </section>
  );
}
