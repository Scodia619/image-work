import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';
import FileViewerUploader from './pages/fileViewerUploader';
import HomePage from './pages/homePage';
import ApprovedFilesPage from './pages/approveFiles';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/fileviewer" element={<FileViewerUploader />} />
        <Route path="/approve" element={<ApprovedFilesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
