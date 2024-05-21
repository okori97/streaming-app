"use client";
import type { Film } from "types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useAppContext } from "./Context/state";
import { useEffect } from "react";
import { getEvery } from "~/server/queries";

import SignInPage from "./sign-in/[[...sign-in]]/page";
import Search from "./_components/Search";
import CarouselSection from "./_components/CarouselSection";
import Grid4x4 from "./_components/Grid4x4";

export default function HomePage() {
  const { setMedia, media, setPage } = useAppContext();
  const currentPage = "Home";

  useEffect(() => {
    const fetchMedia = async () => {
      const media: Film[] = await getEvery();
      setMedia(media);
    };
    fetchMedia().catch((err) => console.log(err));
    setPage(currentPage);
  }, []);

  const trending = media.filter((film) => film.isTrending);

  return (
    <div className="max-w-screen m-0 flex h-screen w-lvw  flex-col items-start justify-start overflow-x-hidden p-8">
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <Search />
        <CarouselSection media={trending} heading="Trending" />
        <Grid4x4 media={media} heading="Recomended for you" />
      </SignedIn>
      ;
    </div>
  );
}
