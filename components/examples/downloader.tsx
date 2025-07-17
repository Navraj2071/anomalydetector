"use client";
import { Download } from "lucide-react";

const Downloader = () => {
  const downloadAll = () => {
    try {
      new Array(6).fill(0).map((_, i) => {
        let atag = document.getElementById(`download-image-${i}`);
        if (atag) {
          atag.click();
        }
      });
    } catch {}
  };
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 w-fit"
        onClick={downloadAll}
      >
        Download all <Download className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Downloader;
