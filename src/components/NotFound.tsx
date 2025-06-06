export default function NotFound({
  error,
  msg,
}: {
  error?: string;
  msg?: string;
}) {
  return (
    <div className="flex relative items-center justify-center h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-xl text-red-100 md:text-[4rem] backdrop-blur-md">
        <h1 className="uppercase">{msg}</h1>
        <h2 className="text-red-700 text-xl">{error} </h2>
      </div>

      <img
        src="/homepage/notfound.webp"
        alt=""
        className="w-[50%]  object-cover "
      />
    </div>
  );
}
