# Vercel deployment สำหรับ NextPlot Real Estate

## วิธีการ Deploy บน Vercel

### 1. เตรียมโปรเจค

ไฟล์ที่สำคัญสำหรับ Vercel deployment ได้ถูกสร้างแล้ว:

- `vercel.json` - การตั้งค่า Vercel
- `DEPLOY.md` - คู่มือการ deploy แบบละเอียด  
- `.vercelignore` - ไฟล์ที่ไม่ต้องการ upload
- `vite.config.ts` - อัปเดตสำหรับ production build

### 2. วิธี Deploy

#### วิธีที่ 1: Vercel CLI (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy โปรเจค
vercel
```

#### วิธีที่ 2: GitHub Integration

1. Push โค้ดขึ้น GitHub
2. เข้า [vercel.com](https://vercel.com)
3. คลิก "New Project"
4. เลือก repository ของคุณ
5. Vercel จะ deploy อัตโนมัติ

### 3. การตั้งค่าที่เพิ่มเข้ามา

**vercel.json:**
- ตั้งค่า SPA routing
- Security headers
- Asset caching
- Build configuration

**vite.config.ts:**
- Optimized build settings
- Code splitting
- Static asset handling

**package.json:**
- เพิ่ม `vercel-build` script

### 4. URL ที่จะได้รับ

หลัง deploy สำเร็จจะได้:
- Production URL: `https://your-project.vercel.app`
- Preview URLs สำหรับแต่ละ branch
- Analytics และ monitoring

### 5. Performance Optimization

โปรเจคได้รับการปรับแต่งแล้วสำหรับ:
- ✅ Fast loading
- ✅ SEO friendly
- ✅ Mobile responsive  
- ✅ PWA ready
- ✅ CDN optimized

### 6. คุณสมบัติที่ใช้งานได้

- 🏠 Property listings with search/filter
- 🌐 Multi-language (Thai/English/Chinese)
- 📱 Mobile-first responsive design
- 🎨 Dark/Light theme switching
- 💬 Contact forms with PDPA compliance
- 📤 Social media sharing
- ♿ Accessibility support

### 7. Domain Setup

หากต้องการใช้ domain ของตัวเอง:
1. ไปที่ Vercel dashboard
2. เลือก project
3. ไปที่ Settings > Domains
4. เพิ่ม domain และทำตาม DNS instructions

NextPlot Real Estate Platform พร้อม deploy บน Vercel แล้ว! 🚀