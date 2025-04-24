import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

const HomePage: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    if (!user) return <p>Loading user...</p>;

    const hasPermission = (permId: number) => user.permissions.includes(permId);
    const isFlagged = () => user.sanctionFlag;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-100">
            <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>

            {isFlagged() && (
                <p className="text-red-600 font-bold mt-4">
                    Your account has been flagged for sanctions. Please upload a photo.
                </p>
            )}

            <button
                onClick={() => navigate('/fileviewer')}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                View Files
            </button>

            {hasPermission(1) && (
                <button
                    onClick={() => navigate('/approve')}
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                >
                    Approve Files
                </button>
            )}
        </div>
    );
};

export default HomePage;
