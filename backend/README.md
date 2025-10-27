1. การอัปเดตสต็อก: เมื่อผู้ใช้เรียกใช้ API POST /api/inventory/inbound หรือ /outbound Backend (Express Controller) จะต้องทำ 2 ขั้นตอน:

    - Step 1: อัปเดตฟิลด์ stockCount ใน Product Schema.
    - Step 2: สร้างเอกสารใหม่ใน InventoryMovement Schema เพื่อบันทึกประวัติ.

2. Low Stock Alert: เมื่อดึงรายการสินค้า ให้ใช้ Query ใน MongoDB เพื่อหา Products ที่มีเงื่อนไข { stockCount: { $lte: minStockLevel } }

3. Data Relationship (Mongoose populate): เวลาแสดงรายการสินค้าใน Frontend คุณสามารถใช้ฟังก์ชัน populate ของ Mongoose เพื่อดึงชื่อหมวดหมู่ (Category.name) และชื่อผู้ที่อัปเดตล่าสุด (User.name) มาแสดงผลได้ทันทีโดยไม่ต้องทำ API Call เพิ่มเติม.