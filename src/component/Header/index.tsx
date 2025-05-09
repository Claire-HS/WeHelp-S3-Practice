"use client";
import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="w-full bg-sky-950 shadow-md">
      <div className="max-w-screen-xl h-[80px] mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="text-[30px] font-bold text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
