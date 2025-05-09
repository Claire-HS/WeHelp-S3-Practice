export default function Footer({ text }: { text: string }) {
  return (
    <>
      <div className="w-full h-[80px] mt-[40px] bg-sky-950 text-[18px] text-white font-bold flex justify-center items-center">
        {text}
      </div>
    </>
  );
}
