import { CloudUpload } from "lucide-react";
import useUploader from "./useuploader";
import Loader from "./loader";
import toast, { Toaster } from "react-hot-toast";
import Resultviewer from "./results/resultviewer";
import RefLinks from "./reflinks";

export default function UploadPage() {
  const uploader = useUploader();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Anomaly Detection
      </h1>
      <h2 className="text-l text-gray-500">
        The application checks for anomalies in satellite images of crop fields.
      </h2>
      <h3 className="text-gray-700 ">
        *Authentication isn't used for easy access.
      </h3>
      <h3 className="text-gray-700">* File size limit isn't enabled yet.</h3>
      <br />
      <div
        {...uploader.getRootProps()}
        className={`w-full max-w-xl p-8 border-4 border-dashed rounded-2xl shadow-md transition-all duration-300 ${
          uploader?.isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        } flex flex-col items-center justify-center cursor-pointer`}
      >
        <input {...uploader.getInputProps()} />
        <CloudUpload className="w-12 h-12 text-blue-500 mb-4" />
        <p className="text-lg text-gray-600">
          {uploader?.isDragActive
            ? "Drop the files here..."
            : "Drag & drop images here, or click to select"}
        </p>
        <p className="text-lg text-gray-800">Select Upto 5 images</p>
      </div>
      {uploader?.isLoading && <Loader message={uploader?.status} />}
      <Toaster position="bottom-right" reverseOrder={false} />
      {uploader?.files?.length > 0 && uploader?.analysisResult?.length > 0 && (
        <Resultviewer
          images={uploader.files}
          results={uploader.analysisResult}
        />
      )}
      <br />
      <RefLinks />
    </div>
  );
}
