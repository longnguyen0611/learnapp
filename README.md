🎓 LinguaLearn – Nền tảng học tiếng Anh & tiếng Đức hiện đại
Created by StephenSouth13 – Long Quách
Website chính thức: vsm.org.vn

✨ Tính năng nổi bật
🌐 Trang chủ hiện đại, thiết kế chuẩn responsive

🔐 Đăng ký/Đăng nhập bằng Firebase Auth

📊 Dashboard theo dõi tiến độ học

📝 Tô đậm văn bản để dịch và phát âm

📘 Sổ từ vựng cá nhân, đồng bộ lưu trữ

🎴 Luyện tập Flashcard kèm ảnh minh họa

🔐 Định tuyến an toàn cho người dùng đăng nhập

🎧 Nhúng nhạc học ngôn ngữ (Spotify hoặc tải lên)

⏱ Ghi nhận thời gian học → quy đổi token thưởng

🧾 Giao diện theo kiểu CRM chuyên nghiệp

🧰 Công nghệ sử dụng
Next.js 14 (App Router)

Tailwind CSS

Firebase Authentication

Google Translate API & Web Speech API

LocalStorage / Firestore

Spotify Embed / Audio Upload

Chart.js (biểu đồ học tập)

🚀 Bắt đầu sử dụng
1. Yêu cầu hệ thống
Node.js v18.17 hoặc mới hơn

npm hoặc yarn

Tài khoản Firebase

2. Cài đặt dự án
bash
Copy
Edit
git clone https://github.com/StephenSouth13/lingua-learn.git
cd lingua-learn
npm install
3. Thiết lập biến môi trường .env.local
env
Copy
Edit
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
4. Chạy server local
bash
Copy
Edit
npm run dev
Truy cập tại: http://localhost:3000

☁️ Triển khai lên Vercel
Tự động bằng GitHub
Push code lên GitHub

Vào vercel.com, đăng nhập

Chọn New Project → Import repo GitHub

Thiết lập:

Preset: Next.js

Root dir: ./

Build: next build

Output: .next

Environment Variables: copy từ .env.local

Nhấn Deploy

Thủ công bằng Vercel CLI
bash
Copy
Edit
npm install -g vercel
vercel login
vercel --prod
📁 Cấu trúc thư mục
csharp
Copy
Edit
lingua-learn/
├── app/
│   ├── dashboard/           # Trang chính cá nhân
│   ├── login/               # Đăng nhập
│   ├── register/            # Đăng ký
│   ├── translate/           # Tính năng dịch
│   ├── practice/            # Flashcard và luyện tập
│   ├── reward/              # Đổi token lấy thưởng
│   └── layout.tsx           # Giao diện layout chính
├── components/
│   ├── auth/                # Giao diện đăng nhập
│   ├── ui/                  # Nút, modal, loader
│   └── vocabulary/          # Thành phần từ vựng
├── lib/
│   ├── firebase/            # Kết nối Firebase
│   └── vocabulary.ts        # Quản lý từ
├── public/                  # Hình ảnh và media
└── README.md                # Tài liệu hướng dẫn
🔮 Mở rộng trong tương lai
Tích hợp AI luyện nói (ChatGPT)

Store VSM: đổi token lấy voucher mua hàng

Khung avatar, chủ đề học tập, nhạc nâng cao

Xếp hạng học viên và phòng học nhóm

📜 License
Dự án theo giấy phép MIT License

🧑‍💼 Chủ dự án
Tên GitHub: StephenSouth13

Tên thật: Long Quách
Cộng sự: longnguyen0611 - Nguyên Thành Long - https://github.com/longnguyen0611
Website: vsm.org.vn

Logo: Để trống bên trái header để bạn thêm vào
