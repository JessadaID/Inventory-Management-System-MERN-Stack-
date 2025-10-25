# 📦 Inventory Management System (MERN Stack)

ระบบจัดการสินค้าคงคลังที่พัฒนาด้วย MERN Stack (MongoDB, Express.js, React, Node.js) เพื่อฝึกฝนทักษะการสร้าง Full-Stack Web Application

## 🌟 Features / คุณสมบัติหลัก

- **Authentication (JWT):** ระบบเข้าสู่ระบบและลงทะเบียนผู้ใช้ (Secured by JSON Web Tokens).
- **Product CRUD:** การจัดการสินค้า (เพิ่ม, ดู, แก้ไข, ลบ) อย่างเต็มรูปแบบ.
- **Search & Filter:** ค้นหาสินค้าตามชื่อ, รหัส, และกรองตามหมวดหมู่.
- **Stock Update:** บันทึกการรับเข้า (Inbound) และเบิกออก (Outbound) ของสินค้าเพื่ออัปเดตสต็อก.
- **Low Stock Alert:** แจ้งเตือนสินค้าที่มีจำนวนคงคลังต่ำกว่าเกณฑ์ที่กำหนด.

## 🛠️ Technology Stack / เทคโนโลยีที่ใช้

| Area         | Technology                                  | Description                         |
| :----------- | :------------------------------------------ | :---------------------------------- |
| **Frontend** | **React**                                   | User Interface (UI) Development     |
| **Backend**  | **Express.js**                              | RESTful API Development             |
| **Database** | **MongoDB**                                 | NoSQL Database                      |
| **Language** | **JavaScript (ES6+)**                       | Programming Language                |
| **Styling**  | **(Optional: เช่น Tailwind CSS/Bootstrap)** | UI Styling and Responsiveness       |
| **Auth**     | **JWT, Bcrypt**                             | Authentication and Password Hashing |

## 🚀 Getting Started / การเริ่มต้นใช้งาน

### Prerequisites / สิ่งที่ต้องมี

คุณต้องติดตั้งซอฟต์แวร์เหล่านี้บนเครื่องของคุณ:

- [Node.js](https://nodejs.org/) (เวอร์ชันแนะนำ: 14+)
- [MongoDB](https://www.mongodb.com/try/download/community) (ติดตั้ง Local หรือใช้บริการ Cloud เช่น MongoDB Atlas)

## 🌐 API Endpoints / เส้นทาง API

1. User & Authentication Endpoints (/api/users)

ใช้สำหรับจัดการผู้ใช้, การลงทะเบียน, และการเข้าสู่ระบบ

| Method | Endpoint            | Description                    | JWT Required     |
| ------ | ------------------- | ------------------------------ | ---------------- |
| POST   | /api/users/register | ลงทะเบียนผู้ใช้ใหม่            | ❌ No            |
| POST   | /api/users/login    | เข้าสู่ระบบ, คืนค่า JWT Token  | ❌ No            |
| GET    | /api/users/profile  | ดึงข้อมูลโปรไฟล์ผู้ใช้ปัจจุบัน | ✅ Yes (protect) |
| PUT    | /api/users/profile  | อัปเดตข้อมูลโปรไฟล์ผู้ใช้      | ✅ Yes (protect) |
| POST   | /api/users/logout   | ออกจากระบบ                     | ❌ No            |

2. Product Endpoints (/api/products)

ใช้สำหรับจัดการสินค้า (CRUD Operations)

| Method | Endpoint          | Description                                                                 | Request Body Example                                    |
| ------ | ----------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| POST   | /api/products     | เพิ่ม สินค้าใหม่                                                            | { name, sku, category, stockCount, price, description } |
| GET    | /api/products     | ดึง สินค้าทั้งหมด (รองรับ Query Params เช่น ?search=... หรือ ?category=...) | N/A                                                     |
| GET    | /api/products/:id | ดึง สินค้าตาม ID                                                            | N/A                                                     |
| PUT    | /api/products/:id | แก้ไข ข้อมูลสินค้าตาม ID                                                    | { name, price, description } (บางส่วน)                  |
| DELETE | /api/products/:id | ลบ สินค้าตาม ID                                                             | N/A                                                     |

3. Inventory & Stock Endpoints (/api/inventory)

ใช้สำหรับจัดการการเคลื่อนไหวของสต็อกสินค้า

| Method | Endpoint                     | Description                                 | Request Body Example                             |
| ------ | ---------------------------- | ------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| GET    | /api/inventory/low-stock     | ดึงรายการสินค้าที่สต็อกต่ำกว่าเกณฑ์         | N/A                                              |
| POST   | /api/inventory/inbound       |                                             | บันทึกการรับเข้า (Stock In)                      | { productId, quantity: 10, note: "รับสินค้าจาก Supplier A" } |
| POST   | /api/inventory/outbound      | บันทึกการเบิกออก (Stock Out)                | { productId, quantity: 5, note: "เบิกไปสาขา B" } |
| GET    | /api/inventory/movements/:id | ดึงประวัติการเคลื่อนไหวสต็อกของสินค้านั้น ๆ | N/A                                              |
