import Link from "next/link";
import Image from "next/image";

const Examples = () => {
  const images = ["1.png", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.png"];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col  p-6">
      <Link href={"/"} className="text-blue-700 text-4xl">
        {"< Back"}
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Download sample images for testing:
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((imagename, i) => (
          <div key={`image-${i}`} style={{ margin: "20px" }}>
            <Image
              src={`/examples/${imagename}`}
              height={300}
              width={300}
              alt="sample"
            />
            <a
              className="text-blue-700"
              href={`/examples/${imagename}`}
              download
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
