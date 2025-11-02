// pages/Unauthorized.jsx
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
        <p className="text-gray-600 mb-8">
          คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบ
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          กลับไปหน้าแรก
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;