import React from 'react';
import SanctionedUsersList from '../components/sanctionedUsersList';

const ApprovedFilesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Approved Files</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <SanctionedUsersList />
      </div>
    </div>
  );
};

export default ApprovedFilesPage;
