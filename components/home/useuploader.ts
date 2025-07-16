import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
const uploadurl = "/api/v1/upload/gemini";
import toast from "react-hot-toast";

const useUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [analysisResult, setAnalysisResult] = useState([
    {
      anomaly_score: 6,
      image_index: 0,
      reasoning:
        "The field in the lower center of the image shows a significant amount of browning, potentially indicating drought stress or nutrient deficiency. The other fields appear healthy.",
    },
    {
      anomaly_score: 6,
      image_index: 0,
      reasoning:
        "The field in the lower center of the image shows a significant amount of browning, potentially indicating drought stress or nutrient deficiency. The other fields appear healthy.",
    },
    {
      anomaly_score: 6,
      image_index: 0,
      reasoning:
        "The field in the lower center of the image shows a significant amount of browning, potentially indicating drought stress or nutrient deficiency. The other fields appear healthy.",
    },
    {
      anomaly_score: 6,
      image_index: 0,
      reasoning:
        "The field in the lower center of the image shows a significant amount of browning, potentially indicating drought stress or nutrient deficiency. The other fields appear healthy.",
    },
  ]);

  const uploadFiles = async (files: File[]) => {
    setFiles(files);
    return;

    setIsLoading(true);
    setStatus("Uploading files...");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(uploadurl, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Anomaly Detection Successfull.");
        setAnalysisResult(result);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    setIsLoading(false);
    setStatus("");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 5 || acceptedFiles.length === 0) {
      toast.error("Please select upto 5 images.");
      return;
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    const imageFiles = acceptedFiles.filter((file) =>
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    );

    if (imageFiles.length < acceptedFiles.length) {
      toast.error("Please upload valid image files i.e. jpg or png");
      return;
    }
    uploadFiles(imageFiles);
    setFiles(imageFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 5,
  });

  return {
    isLoading,
    status,
    files,
    analysisResult,
    getRootProps,
    getInputProps,
    isDragActive,
  };
};

export default useUploader;
