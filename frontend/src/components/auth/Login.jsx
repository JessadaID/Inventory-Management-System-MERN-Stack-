import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('เข้าสู่ระบบสำเร็จ!');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full mb-6">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับ</h1>
          <p className="text-gray-500">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900 mr-2"
                />
                จดจำฉันไว้
              </label>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                ลืมรหัสผ่าน?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            ยังไม่มีบัญชี?{' '}
            <Link to="/Register" className="text-gray-900 hover:underline font-medium">
              สมัครสมาชิก
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          การเข้าสู่ระบบแสดงว่าคุณยอมรับ{' '}
          <button className="hover:text-gray-600 transition-colors">
            เงื่อนไขการใช้งาน
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;