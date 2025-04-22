import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserFile {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
}

const FileViewer: React.FC = () => {
  const [userFiles, setUserFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const userId = import.meta.env.VITE_USER_ID;
        const response = await axios.get<UserFile[]>(
          `https://localhost:7066/Image?userId=${userId}`
        );
        setUserFiles(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFiles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">User Files</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">File Name</th>
              <th className="py-3 px-4 border-b">File URL</th>
              <th className="py-3 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {userFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{file.id}</td>
                <td className="py-3 px-4 border-b">{file.userId}</td>
                <td className="py-3 px-4 border-b">{file.fileName}</td>
                <td className="py-3 px-4 border-b">
                  {/* <a
                    href={file.fileUrl}
                    className="text-blue-600 hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.fileUrl}
                  </a> */}
                  <img src={file.fileUrl} />
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(file.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileViewer;
