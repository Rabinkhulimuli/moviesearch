import React, { useState } from "react";
import { MovieContext } from "./MovieContext";

interface movieContextProviderProps {
  children: React.ReactNode;
}
export default function MovieContextProvider({
  children,
}: movieContextProviderProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  console.log("is favourite", isFavourite);

  return (
    <MovieContext.Provider value={{ isFavourite, setIsFavourite }}>
      {children}
    </MovieContext.Provider>
  );
}
