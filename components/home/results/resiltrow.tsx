import Image from "next/image";

type Datapoint = {
  url: string;
  result: {
    anomaly_score: number;
    image_index: number;
    reasoning: string;
  };
};

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
      <div style={{ width: "200px", height: "200px", position: "relative" }}>
        <Image fill src={datapoint?.url} alt="uploaded image" />
      </div>
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

export default ResultRow;
