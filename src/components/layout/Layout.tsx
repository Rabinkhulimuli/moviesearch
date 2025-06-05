import { Suspense } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Loading from "../Loading";

export default function Layout() {
  return (
    <div className="bg-black text-white h-full">
      <div className="fixed z-15 inset-0 top-0 bg-white/20 h-fit md:px-4 lg:px-8">
        <Header />
      </div>
      <Suspense fallback={<Loading />}>
        <div className="h-full px-4 md:px-10 pt-20">
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}
