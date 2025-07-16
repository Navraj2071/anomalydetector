import Image from "next/image";
import { useEffect, useState } from "react";

type ViewerProps = {
  images: File[];
  results: Object[];
};

const Resultviewer = ({ images, results }: ViewerProps) => {
  const [data, setData] = useState<Object[]>([]);

  useEffect(() => {
    const dataFiles = [];

    for (let i = 0; i <= images.length; i++) {
      try {
        dataFiles.push({
          url: URL.createObjectURL(images[i]),
          result: results[i],
        });
      } catch {}
    }
    setData(dataFiles);
  }, [images, results]);

  if (data.length === 0) return null;
  return (
    <div>
      {data.map((datapoint, i) => (
        <div key={i}>
          <Image
            height={100}
            width={100}
            src={datapoint?.url}
            alt="uploaded image"
          />
        </div>
      ))}
    </div>
  );
};

export default Resultviewer;
