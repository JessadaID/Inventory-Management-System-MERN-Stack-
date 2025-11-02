import React, { useState, useEffect, useContext } from "react";
import {
  Package,
  Users,
  AlertCircle,
  TrendingUp,
  Plus,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import moneyFormat from "../../utils/moneyformat";
import logout from "../auth/Logout";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [Movement, setMovement] = useState([]);
  const [Products, setProducts] = useState({ products: [], total: 0 });

  useEffect(() => {
    async function fetchMovements() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/inventory/movements?limit=5"
        );
        const data = await response.json();
        setMovement(data.movements);
      } catch (error) {
        console.error("Error fetching movements:", error);
      }
    }
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/products?limit=5"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
    fetchMovements();
  }, []);

  async function handleLogout() {
    const result = await logout();
    if (result.success) {
      setUser(null);
      navigate("/");
    } else {
      alert("เกิดข้อผิดพลาดในการออกจากระบบ");
    }
  }

  // Mock data
  const stats = [
    {
      title: "สินค้าทั้งหมด",
      value: Products.total,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
      trend: "+12%",
    },
    {
      title: "สต็อกต่ำ",
      value: Products.lowStockcount || 0,
      icon: AlertCircle,
      color: "bg-red-50 text-red-600",
      trend: "-5%",
    },
    {
      title: "ผู้ใช้งาน",
      value: "45",
      icon: Users,
      color: "bg-green-50 text-green-600",
      trend: "+3%",
    },
    {
      title: "มูลค่ารวม",
      value: moneyFormat(Products.totalPrice || 0),
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
      trend: "+18%",
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: TrendingUp, active: true },
    { name: "จัดการสินค้า", icon: Package, active: false },
    { name: "จัดการผู้ใช้", icon: Users, active: false },
    { name: "แจ้งเตือน", icon: Bell, active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } relative bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">StockFlow</h1>
              <p className="text-xs text-gray-500">ระบบจัดการสต็อก</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.name?.substring(0, 2).toUpperCase() || "AD"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "admin@stockflow.com"}
                </p>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-600 hover:text-gray-800"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Dashboard
                </h2>
                <p className="text-sm text-gray-500">ภาพรวมระบบสต็อกสินค้า</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-3xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              การดำเนินการด่วน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">
                  เพิ่มสินค้าใหม่
                </span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">รับเข้าสินค้า</span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors group">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200">
                  <Package className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium text-gray-700">เบิกออกสินค้า</span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-700">จัดการผู้ใช้</span>
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Products */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    สินค้าล่าสุด
                  </h3>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    ดูทั้งหมด <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        สินค้า
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        SKU
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        หมวดหมู่
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        สต็อก
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Products.products &&
                      Products.products.map((product) => (
                        <tr
                          key={product._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-6">
                            <p className="font-medium text-gray-800">
                              {product.name}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {product.sku}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {product.category.name}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-800">
                            {product.stockCount}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                product.stockLevel === "High"
                                  ? "bg-green-50 text-green-700"
                                  : product.stockLevel === "Normal"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              {product.stockLevel === "High"
                                ? "ปกติ"
                                : product.stockLevel === "Normal"
                                ? "ต่ำ"
                                : "วิกฤต"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  กิจกรรมล่าสุด
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {Movement.map((activity) => (
                  <div key={activity._id} className="flex gap-4">
                    <div
                      className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                        activity.type === "INBOUND"
                          ? "bg-green-500"
                          : activity.type === "OUTBOUND"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.type === "INBOUND"
                          ? "รับเข้าสินค้า"
                          : activity.type === "OUTBOUND"
                          ? "เบิกออก"
                          : "เพิ่มสินค้าใหม่"}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {activity.product.name}
                      </p>
                      {activity.quantity > 0 && (
                        <p className="text-xs text-gray-500">
                          จำนวน: {activity.quantity} ชิ้น
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.updatedAt
                          .toLocaleString()
                          .replace("T", " ")
                          .slice(0, 19)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
