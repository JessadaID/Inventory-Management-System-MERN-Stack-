import React, { useState } from 'react';
import { Package, ArrowDownCircle, ArrowUpCircle, AlertTriangle, Search, X, Filter } from 'lucide-react';

const StaffInventory = () => {
  const [activeTab, setActiveTab] = useState('inbound');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data - ในการใช้งานจริงจะดึงจาก API
  const [products] = useState([
    { id: 1, name: 'MacBook Pro 16"', sku: 'MBP-001', category: 'Electronics', stock: 15, minStock: 5, price: 89900 },
    { id: 2, name: 'iPhone 15 Pro', sku: 'IPH-015', category: 'Electronics', stock: 3, minStock: 10, price: 42900 },
    { id: 3, name: 'Magic Mouse', sku: 'MMS-003', category: 'Accessories', stock: 45, minStock: 20, price: 2990 },
    { id: 4, name: 'AirPods Pro', sku: 'APP-002', category: 'Audio', stock: 8, minStock: 15, price: 8990 },
    { id: 5, name: 'iPad Air', sku: 'IPA-005', category: 'Electronics', stock: 22, minStock: 10, price: 24900 },
    { id: 6, name: 'USB-C Cable', sku: 'USB-010', category: 'Accessories', stock: 120, minStock: 50, price: 490 },
    { id: 7, name: 'Keyboard', sku: 'KEY-007', category: 'Accessories', stock: 35, minStock: 15, price: 3990 },
    { id: 8, name: 'Monitor 27"', sku: 'MON-027', category: 'Electronics', stock: 12, minStock: 8, price: 15900 },
  ]);

  const [categories] = useState([
    { id: 1, name: 'Electronics', description: 'อุปกรณ์อิเล็กทรอนิกส์' },
    { id: 2, name: 'Accessories', description: 'อุปกรณ์เสริม' },
    { id: 3, name: 'Audio', description: 'อุปกรณ์เสียง' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'in', product: 'MacBook Pro 16"', sku: 'MBP-001', qty: 10, date: '2024-11-02 10:30', note: 'รับจากซัพพลายเออร์' },
    { id: 2, type: 'out', product: 'iPhone 15 Pro', sku: 'IPH-015', qty: 5, date: '2024-11-02 09:15', note: 'ขายให้ลูกค้า' },
    { id: 3, type: 'in', product: 'AirPods Pro', sku: 'APP-002', qty: 15, date: '2024-11-01 16:45', note: 'รับจากซัพพลายเออร์' },
    { id: 4, type: 'out', product: 'Magic Mouse', sku: 'MMS-003', qty: 8, date: '2024-11-01 14:20', note: 'ขายให้ลูกค้า' },
  ]);

  const user = { name: 'Staff User', role: 'staff' };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle transaction
  const handleTransaction = () => {
    if (!selectedProduct || !formData.quantity) {
      alert('กรุณาเลือกสินค้าและระบุจำนวน');
      return;
    }

    const qty = parseInt(formData.quantity);
    const newTransaction = {
      id: transactions.length + 1,
      type: activeTab === 'inbound' ? 'in' : 'out',
      product: selectedProduct.name,
      sku: selectedProduct.sku,
      qty,
      date: new Date().toLocaleString('th-TH'),
      note: formData.note || '-'
    };

    setTransactions([newTransaction, ...transactions]);
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({});
    
    alert(`${activeTab === 'inbound' ? 'รับเข้า' : 'เบิกออก'}สินค้าสำเร็จ`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">ระบบเบิกจ่ายสินค้า</h1>
              <p className="text-sm text-gray-500">สวัสดี {user.name} (Staff)</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Main Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('inbound')}
                className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'inbound'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                รับเข้าสินค้า
              </button>
              <button
                onClick={() => setActiveTab('outbound')}
                className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'outbound'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                เบิกออกสินค้า
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                ประวัติ ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex-shrink-0 px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === 'categories'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                หมวดหมู่
              </button>
            </div>
          </div>

          {/* Inbound Tab */}
          {activeTab === 'inbound' && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">รับเข้าสินค้า</h2>
                  <p className="text-sm text-gray-600">เลือกสินค้าที่ต้องการรับเข้าคลัง</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                >
                  <ArrowDownCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">บันทึก</span>รับเข้า
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">ทุกหมวดหมู่</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.sku}</p>
                      </div>
                      <span className={`flex-shrink-0 ml-2 px-2 py-1 rounded text-xs font-medium ${
                        product.stock < product.minStock
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{product.category}</span>
                      <span className="font-medium text-gray-800">฿{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outbound Tab */}
          {activeTab === 'outbound' && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">เบิกออกสินค้า</h2>
                  <p className="text-sm text-gray-600">เลือกสินค้าที่ต้องการเบิกออก</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
                >
                  <ArrowUpCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">บันทึก</span>เบิกออก
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">ทุกหมวดหมู่</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      if (product.stock > 0) {
                        setSelectedProduct(product);
                        setShowModal(true);
                      } else {
                        alert('สินค้าหมดสต็อก ไม่สามารถเบิกออกได้');
                      }
                    }}
                    className={`border border-gray-200 rounded-lg p-4 transition-colors ${
                      product.stock > 0
                        ? 'hover:border-red-500 hover:bg-red-50 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.sku}</p>
                      </div>
                      <span className={`flex-shrink-0 ml-2 px-2 py-1 rounded text-xs font-medium ${
                        product.stock === 0
                          ? 'bg-gray-100 text-gray-700'
                          : product.stock < product.minStock
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{product.category}</span>
                      <span className="font-medium text-gray-800">฿{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">ประวัติการเบิกจ่าย</h2>
              
              <div className="space-y-3">
                {transactions.map(trans => (
                  <div key={trans.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        trans.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {trans.type === 'in' ? (
                          <ArrowDownCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800">
                              {trans.type === 'in' ? 'รับเข้า' : 'เบิกออก'}: {trans.product}
                            </p>
                            <p className="text-sm text-gray-600">SKU: {trans.sku}</p>
                            <p className="text-sm text-gray-500">หมายเหตุ: {trans.note}</p>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <p className={`text-lg font-semibold ${
                              trans.type === 'in' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {trans.type === 'in' ? '+' : '-'}{trans.qty}
                            </p>
                            <p className="text-xs text-gray-500">{trans.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Tab (Read Only) */}
          {activeTab === 'categories' && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">หมวดหมู่สินค้า</h2>
              <p className="text-sm text-gray-600 mb-6">ดูรายการหมวดหมู่ทั้งหมด</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => {
                  const categoryProducts = products.filter(p => p.category === category.name);
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                          <p className="text-sm text-gray-500 mt-2">{categoryProducts.length} สินค้า</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {activeTab === 'inbound' ? 'รับเข้าสินค้า' : 'เบิกออกสินค้า'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                  setFormData({});
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-800 mb-1">{selectedProduct.name}</h4>
              <p className="text-sm text-gray-600">SKU: {selectedProduct.sku}</p>
              <p className="text-sm text-gray-600">หมวดหมู่: {selectedProduct.category}</p>
              <p className="text-sm font-medium text-gray-800 mt-2">
                สต็อกปัจจุบัน: {selectedProduct.stock} ชิ้น
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  จำนวน <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max={activeTab === 'outbound' ? selectedProduct.stock : undefined}
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ระบุจำนวน"
                />
                {activeTab === 'outbound' && (
                  <p className="text-xs text-gray-500 mt-1">
                    สามารถเบิกได้สูงสุด {selectedProduct.stock} ชิ้น
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุ
                </label>
                <textarea
                  value={formData.note || ''}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ระบุหมายเหตุ (ถ้ามี)"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProduct(null);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleTransaction}
                  className={`flex-1 px-4 py-2 text-white rounded-lg ${
                    activeTab === 'inbound'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffInventory;