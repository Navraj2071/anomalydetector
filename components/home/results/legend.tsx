const Legend = () => {
  const colors = Array.from({ length: 10 }, (_, i) => ((i + 1) * 255) / 10);

  return (
    <div>
      <h3 className="text-6 mb-2 text-gray-800">Legend:</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {colors.map((col, i) => (
          <div
            key={`legend-${i}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `rgb(${col}, ${255 - col}, 0)`,
              }}
            />
            <p className="text-xs">{i + 1}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xs text-gray-800">
        1 - Least anomalous, 10 - Most anomalous
      </h3>
      <br />
    </div>
  );
};

export default Legend;
