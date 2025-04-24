import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/userContext';
import "../styles/Images.css";

interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    permissions: number[];
    sanctionFlag: boolean;
}

interface File {
    id: number;
    userId: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
  }

const SanctionedUsersList: React.FC = () => {

    const { user } = useUserContext();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSanctionedUsers = async () => {
            try {
                const response = await axios.get<User[]>(`https://localhost:7066/User/sanctioned-users?userId=${user?.id}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching sanctioned users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSanctionedUsers();
    }, []);

    const handleViewFiles = async (targetUser: User) => {
        try {
            const response = await axios.get<File[]>(`https://localhost:7066/Image?userId=${targetUser.id}`);
            setFiles(response.data);
            setSelectedUser(targetUser);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching user files', error);
        }
    };

    const handleApprove = async () => {
        try {
            const requestData = {
                actioningId: user?.id,
                targetId: selectedUser?.id
            }
            const response = await axios.patch(`https://localhost:7066/User/sanctioned-users`, requestData);
            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(u => u.id !== selectedUser?.id));
                setSelectedUser(null);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error fetching user files', error);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setFiles([]);
    };


    if (loading) return <p>Loading sanctioned users...</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Username</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                            <td className="px-6 py-4 border-b text-sm">{user.username}</td>
                            <td className="px-6 py-4 border-b text-sm">{user.email}</td>
                            <td className="px-6 py-4 border-b text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 border-b text-sm">
                                <button
                                    onClick={() => handleViewFiles(user)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    View Files
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full overflow-y-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Files for {selectedUser?.username}</h3>
                            <button onClick={closeModal} className="text-red-500 hover:underline">Close</button>
                            <button onClick={handleApprove} className="text-red-500 hover:underline">Approve</button>
                        </div>
                        {files.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 m-2">
                                {files.map((file, index) => (
                                    <img key={index} src={file.fileUrl} alt={`file-${index}`} className="thumbnail" />
                                ))}
                            </div>
                        ) : (
                            <p>No files found for this user.</p>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default SanctionedUsersList;
