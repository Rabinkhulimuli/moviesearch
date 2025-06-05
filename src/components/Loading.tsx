import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-white animate-spin w-14 h-14" />
    </div>
  );
}
