# EyeStyle.Store - Website Phan Phoi Kinh Mat Thoi Trang

Solution gom 3 tang:

- `CMS.Data`: Entity, DbContext va migration Entity Framework Core.
- `CMS.Backend`: ASP.NET Core MVC Admin, Web API, Swagger, upload anh.
- `cms.frontend`: ReactJS website ban/phan phoi kinh mat thoi trang.

## Chay Backend

1. Mo `EmCMS_Solution.sln` bang Visual Studio.
2. Chon project startup la `CMS.Backend`.
3. Kiem tra connection string trong `CMS.Backend/appsettings.json`.
4. Bam `F5` de chay Backend, MVC Admin va Swagger.
5. Swagger mac dinh: `https://localhost:7098/swagger`.

Co the chay bang terminal:

```powershell
dotnet run --project CMS.Backend
```

Neu database chua co cac cot dat lai mat khau, chay trong Package Manager Console:

```powershell
Update-Database -Project CMS.Data -StartupProject CMS.Backend
```

## Chay Frontend

```powershell
cd cms.frontend
npm install
npm start
```

React mac dinh chay tai `http://localhost:3000`.

File `cms.frontend/.env` dang cau hinh:

```env
REACT_APP_API_URL=https://localhost:7098/api
REACT_APP_IMAGE_BASE_URL=https://localhost:7098
```

## Git Ignore

File `.gitignore` da loai bo cac thu muc va file rac khi commit:

- `.vs/`
- `bin/`
- `obj/`
- `node_modules/`
- `cms.frontend/build/`
- `*.log`

## Minh Chung Tieu Chi 37-46

### 37. San pham Hot / Ban chay

- API: `GET /api/ProductApi/hot?take=3`.
- Backend tinh tong `OrderDetails.Quantity` theo tung san pham va lay 3 san pham cao nhat.
- React component: `cms.frontend/src/components/public/home/HotProducts.jsx`.

### 38. Danh muc co anh dai dien

- API `GET /api/CategoryProductApi` tra them `imageUrl` va `productCount`.
- Component: `cms.frontend/src/components/public/home/CategoryGrid.jsx`.
- Anh dai dien lay tu san pham moi nhat trong tung danh muc.

### 39. Loc theo khoang gia

- API: `GET /api/ProductApi/filter?minPrice=250000&maxPrice=15000000`.
- Giao dien: hai o `Don gia Min` va `Don gia Max` tai trang San pham.
- React tu dong goi lai API sau khi nguoi dung ngung nhap 400 ms.

### 40. Tim kiem tren Header

- API: `GET /api/ProductApi/search?keyword=kinh`.
- Go tu khoa trong Header de tu dong chuyen sang trang ket qua.

### 41-43. Gio hang, ton kho va ket qua rong

- Badge do tren Header lay tu `cart.totalQuantity` va cap nhat theo Hook.
- `useCart.js` chan khi so luong mua vuot `StockQuantity`.
- Khi loc/tim kiem rong, `ProductGrid.jsx` hien anh va thong bao dung yeu cau.

### 44-45. HTML CKEditor va cau hinh moi truong

- `PostDetail.jsx` dung `dangerouslySetInnerHTML`.
- Anh trong HTML duoc chuyen sang domain Backend boi `utils/images.js`.
- API URL va Image URL lay tu `cms.frontend/.env`, khong viet cung trong component.

### 46. Forgot Password

- API gui yeu cau: `POST /api/CustomerApi/forgot-password`.
- API dat lai: `POST /api/CustomerApi/reset-password`.
- Token ngau nhien co han 30 phut; SQL chi luu SHA-256 cua token.
- Mat khau moi duoc bam PBKDF2 truoc khi luu.
- Khi chua cau hinh SMTP, mo email demo trong
  `CMS.Backend/wwwroot/password-reset-emails/`.

## Chuan Bi Tieu Chi 47-50

- `47 - Git Discipline`: dung `git log --oneline --all` de trinh bay lich su commit;
  commit theo tung nhom chuc nang, khong commit `bin`, `obj`, `node_modules`.
- `48 - Teamwork`: trinh bay Issues/Tasks, nguoi phu trach va commit cua tung thanh vien.
  Neu lam ca nhan, giai thich cach tu phan ra Backend, Frontend, Database va Testing.
- `49 - Presentation`: demo theo thu tu Swagger, Admin, trang chu, loc/tim kiem,
  gio hang/dat hang, email, quen mat khau va SQL Server.
- `50 - Problem Solving`: trinh bay cac loi da xu ly nhu CORS, duong dan anh CKEditor,
  tru ton kho, bam mat khau va token reset co thoi han.
