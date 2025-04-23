import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';
import FileViewerUploader from './pages/fileViewerUploader';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/fileviewer" element={<FileViewerUploader />} />
      </Routes>
    </Router>
  );
};

export default App;
