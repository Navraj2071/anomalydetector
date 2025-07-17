import Image from "next/image";
import { useEffect, useState } from "react";

type ViewerProps = {
  images: File[];
  results: { anomaly_score: number; image_index: number; reasoning: string }[];
};

type Datapoint = {
  url: string;
  result: {
    anomaly_score: number;
    image_index: number;
    reasoning: string;
  };
};

const Resultviewer = ({ images, results }: ViewerProps) => {
  const [data, setData] = useState<Datapoint[]>([]);

  useEffect(() => {
    const dataFiles = [];

    for (let i = 0; i <= images.length - 1; i++) {
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
    <div className="flex flex-col gap-2.5 w-full max-w-[760px] bg-blue-900/10 p-5 m-5 text-black">
      <h1 className="text-xl font-bold mb-6 text-gray-800">
        Analysis Results:
      </h1>
      {data.map((datapoint, i) => (
        <ResultRow key={i} datapoint={datapoint} />
      ))}
    </div>
  );
};

export default Resultviewer;

type ResultRowProps = {
  datapoint: Datapoint;
};

const ResultRow = ({ datapoint }: ResultRowProps) => {
  const redColor = (datapoint?.result?.anomaly_score * 255) / 10;

  const greenColor = 255 - redColor;

  const color = `rgba(${redColor}, ${greenColor}, 0)`;

  return (
    <div className="flex flex-wrap gap-2.5">
      <div
        style={{
          width: "20px",
          background: color,
        }}
      />
      <Image
        height={300}
        width={200}
        src={datapoint?.url}
        alt="uploaded image"
      />
      <div className="flex flex-col justify-between p-2.5">
        <div className="font-bold">
          Anomaly Score: {datapoint?.result?.anomaly_score}
        </div>

        <div className="max-w-[300px] text-xs">
          {datapoint?.result?.reasoning}
        </div>
      </div>
    </div>
  );
};
