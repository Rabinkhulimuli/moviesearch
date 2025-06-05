import { createContext } from "react";

export interface moviePropTypes {
  isFavourite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
}
export const MovieContext = createContext<moviePropTypes>({
  isFavourite: false,
  setIsFavourite: () => {},
});
