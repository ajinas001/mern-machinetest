import { useEffect, useState } from "react";
import { fetchUsers, uploadfiles } from "../Util/user";
import { saveDistributionData } from "../Util/distribute";

export default function UploadContent() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [agent, setAgent] = useState(0);
  const [distributedData, setDistributedData] = useState([]);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const result = await fetchUsers();
        if (result.success) {
          setAgent(result.data.data);
        } else {
          alert("Failed to fetch users");
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchAgentData();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => handleFiles(e.target.files);

  const handleFiles = (files) => {
    if (files?.[0]) {
      const file = files[0];
      const fileType = file.type;
      if (fileType === "text/csv" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileType === "application/vnd.ms-excel") {
        setFile(file);
        setUploadStatus(null);
      } else {
        setUploadStatus({ type: "error", message: "Please upload a CSV, XLSX, or XLS file" });
      }
    }
  };
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);
    setCsvData([]);
    setDistributedData([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadfiles(formData);
      if (result.success) {
        setUploadStatus({ type: "success", message: result.message });
        setCsvData(result.data || []);
      } else {
        setUploadStatus({ type: "error", message: result.message || "Upload failed" });
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus({ type: "error", message: "Something went wrong" });
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  const handleDistribute = async () => {
    if (csvData.length === 0 || agent.length === 0) return;

    const distributed = agent.map((agent) => ({ agent, data: [] }));
    csvData.forEach((row, index) => {
      distributed[index % agent.length].data.push(row);
    });

    setDistributedData(distributed);

    const result = await saveDistributionData(distributed);
    if (result.success) {
      alert(result.success.message || "Data distributed successfully!");
    } else {
      alert("Failed to Distribute data!");
    }
  };

  
  

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload CSV</h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Upload your CSV file containing agent data
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input type="file" accept=".csv" onChange={handleFileInput} className="hidden" id="file-upload" />

        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {file ? (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Selected file: <span className="font-medium">{file.name}</span>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <label htmlFor="file-upload" className="relative cursor-pointer text-blue-600 hover:text-blue-700">
                <span>Click to upload</span>
              </label>{" "}
              or drag and drop
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV files only</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Button */}
      {file && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      )}

      {/* Status Message */}
      {uploadStatus && (
        <div className={`mt-4 p-4 rounded-lg ${uploadStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {uploadStatus.message}
        </div>
      )}

      {/* Distribute Button */}
      {csvData.length > 0 && (
        <div className="flex justify-center mt-4">
          <button onClick={handleDistribute} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Distribute Data
          </button>
        </div>
      )}

      {/* Distributed Data Table */}
      {distributedData.length > 0 && (
  <div className="mt-6">
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Distributed Data</h3>
    {distributedData.map((item, index) => (
      <div key={index} className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
        <h4 className="text-lg font-medium">Agent {index + 1}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Name:</strong> {item.agent.name} | <strong>Email:</strong> {item.agent.email} | <strong>Mobile:</strong> {item.agent.mobile}
        </p>
        <table className="min-w-full border border-gray-300 dark:border-gray-700 mt-2">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              {Object.keys(csvData[0]).map((header, idx) => (
                <th key={idx} className="py-3 px-6 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="py-3 px-6 text-sm text-gray-700 dark:text-gray-300 border-b">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
