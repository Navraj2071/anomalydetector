import Link from "next/link";
import Image from "next/image";
import Downloader from "./downloader";
import { ArrowLeft, Download } from "lucide-react";

const Examples = () => {
  const images = ["1.png", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.png"];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  p-6">
      <Link
        href={"/"}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <br />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Download sample images for testing
      </h1>
      <Downloader />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((imagename, i) => (
          <div key={`image-${i}`} style={{ margin: "20px" }}>
            <div
              style={{ width: "300px", height: "300px", position: "relative" }}
            >
              <Image
                src={`/examples/${imagename}`}
                fill
                alt="sample"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <a
              className="text-blue-700 inline-flex items-center gap-1"
              href={`/examples/${imagename}`}
              download
              id={`download-image-${i}`}
            >
              Download <Download className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
