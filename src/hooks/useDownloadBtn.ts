"use client";
import Reac, { useState } from "react";

export function useDownloadBtn({
  myCustomFUnc,
}: {
  myCustomFUnc: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    await myCustomFUnc();

    // 模擬下載延遲（實際可換成 fetch 等）
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 下載完成後關閉 loader
    setIsLoading(false);

    // 這裡可以放觸發檔案下載的邏輯
    console.log("下載完成");
  };

  return { isLoading, handleDownload };
}
