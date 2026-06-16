# เว็บไซต์ประเมิน สมศ. รอบ 5 โรงเรียนบ้านน้ำพร

เว็บนี้ปรับเป็น React + Vite เพื่อรองรับฟังก์ชันเต็มรูปแบบ เช่น routing หน้าย่อย, Scroll Reel Hero, timeline แบบ scroll-spy, popup, search overlay, accessibility drawer และ deploy ขึ้น Vercel ได้

## ไฟล์หลัก

- `src/main.jsx` โค้ด React ทั้งหมดของเว็บไซต์
- `styles.css` รูปแบบหน้าเว็บและ responsive layout
- `index.html` จุด mount ของ React app
- `vercel.json` rewrite route ให้เปิด `/early-childhood` และ `/basic-education` ได้โดยตรงบน Vercel
- `assets/np-logo.png` โลโก้โรงเรียนสำหรับเว็บ
- `assets/onesqa-logo.png` โลโก้ สมศ. สำหรับเว็บ

## คำสั่งใช้งาน

```bash
npm install
npm run dev
npm run build
```

## หน้าหลัก

- `/` หน้าแรก
- `/early-childhood` มาตรฐานระดับการศึกษาปฐมวัย
- `/basic-education` มาตรฐานระดับการศึกษาขั้นพื้นฐาน

## Deploy ด้วย Vercel

1. อัปโหลด repository นี้ขึ้น GitHub
2. Import เข้า Vercel
3. Framework Preset เลือก Vite
4. Build Command ใช้ `npm run build`
5. Output Directory ใช้ `dist`

ข้อมูลมาตรฐานและตัวชี้วัดอ้างอิงจากเอกสาร สมศ. กรอบแนวทางการประกันคุณภาพภายนอกสถานศึกษา พ.ศ. 2567-2571 ฉบับปรับปรุงเพิ่มเติม
