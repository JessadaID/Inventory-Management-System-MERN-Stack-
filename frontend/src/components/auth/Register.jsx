import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('สมัครสมาชิกสำเร็จ!');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full mb-6">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-gray-500">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="สมชาย ใจดี"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>
            </div>

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
              <p className="mt-2 text-xs text-gray-500">ต้องมีอย่างน้อย 8 ตัวอักษร</p>
            </div>

            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900 mt-0.5 mr-2"
              />
              <label className="text-sm text-gray-600">
                ฉันยอมรับ{' '}
                <button className="text-gray-900 hover:underline">
                  เงื่อนไขการใช้งาน
                </button>{' '}
                และ{' '}
                <button className="text-gray-900 hover:underline">
                  นโยบายความเป็นส่วนตัว
                </button>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?{' '}
            <Link to="/Login" className="text-gray-900 hover:underline font-medium">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          ข้อมูลของคุณจะได้รับการปกป้องและเข้ารหัสอย่างปลอดภัย
        </p>
      </div>
    </div>
  );
}

export default Register;