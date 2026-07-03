# DOI CHIEU KET QUA CHAM 30 TIEU CHI DAU

Sinh vien: Luu Cong Tuan Em  
Ma sinh vien: 2123110139  
De tai: Website Phan Phoi Kinh Mat Thoi Trang

## 1. Ket qua trong bang diem

- Diem 30 tieu chi dau: **40.5/60**
- Ty le phan da cham: **67.5%**
- Diem chua dat/toi da co the bo sung: **19.5 diem**
- Cac tieu chi 31-50 chua cham nen khong dung `40.5/100` de danh gia rieng
  tien do 30 tieu chi dau.

## 2. Cac muc bi tru diem va trang thai hien tai

| Tieu chi | Diem cu | Toi da | Trang thai phien ban hien tai | Minh chung |
|---:|---:|---:|---|---|
| 3 | 1.25 | 2 | Da bo sung huong dan Backend, Frontend, Migration, `.env` va `.gitignore` | `README.md`, `.gitignore` |
| 4 | 0 | 2 | Bao cao da co muc luc va thong tin sinh vien; **can them trang bia thu cong theo mau truong** | `docs/ASP-LuuCongTuanEm-2123110139-CCQ2311D.docx` |
| 5 | 0 | 2 | Da co day du 6 chuong | Bao cao, cac heading `CHUONG 1` den `CHUONG 6` |
| 6 | 0 | 2 | Da co so do quan he 8 thuc the | Bao cao, muc 2.4 va Hinh 2.2 |
| 7 | 0 | 2 | Da mo ta cac man hinh Frontend ReactJS | Bao cao, Chuong 4 |
| 8 | 0 | 2 | Da liet ke endpoint va cau truc JSON mau | Bao cao, muc 2.6 va 3.4 |
| 9 | 0 | 2 | Da co anh Swagger; **can chen them anh Postman that vao bao cao** | Bao cao, Hinh 3.2 va Chuong 5 |
| 14 | 1.25 | 2 | Product va Post deu co `Skip`, `Take`, so trang va thanh phan trang | `ProductController.cs`, `PostController.cs`, hai view `Index.cshtml` |
| 15 | 1.5 | 2 | CKEditor co thanh cong cu va upload anh cho Post/Product | `Views/Post`, `Views/Product` |
| 20 | 1.5 | 2 | Da co API GET cho Product, Post, Category, Customer, User, Order va OrderDetail | `CMS.Backend/Controllers/api` |
| 21 | 1.5 | 2 | Da co POST dang ky, dat hang, quen/dat lai mat khau | `CustomerApiController.cs`, `OrderApiController.cs` |
| 26 | 0 | 2 | HeroBanner lay Product/Post va tu chuyen slide moi 4.5 giay | `cms.frontend/src/components/public/home/HeroBanner.jsx` |
| 29 | 1.5 | 2 | Checkout bat buoc FullName, Phone, Address o ca React va Backend | `cms.frontend/src/pages/cart/page.jsx`, `OrderApiController.cs` |
| 30 | 0 | 2 | POST tao Customer/Order/OrderDetail, tinh gia tu DB va tru kho trong transaction | `OrderApiController.cs` |

Tong phan bi tru: `0.75 + 12 + 0.75 + 0.5 + 0.5 + 0.5 + 2 + 0.5 + 2 = 19.5`.

## 3. Cach demo nhanh de duoc cham lai

1. Chay Backend bang `F5` o cau hinh `Release`, mo
   `https://localhost:7098/swagger`.
2. Chay Frontend bang `npm start`, mo `http://localhost:3000`.
3. Tai trang chu, cho HeroBanner tu chuyen slide va bam cac nut tren slide.
4. Mo Admin Product/Post, tao du lieu co CKEditor, chen anh truc tiep va kiem
   tra HTML da duoc luu.
5. Mo danh sach Product/Post, tao du lieu vuot qua mot trang va bam chuyen trang.
6. Tai Frontend, them san pham vao gio, nhap du FullName, Phone, Address, Email
   va bam Dat hang.
7. Trong Swagger/SQL Server, kiem tra ban ghi moi o `Orders`, `OrderDetails` va
   `Products.StockQuantity` da giam.
8. Chup mot lan goi `POST /api/OrderApi` thanh cong bang Postman, chen anh vao
   Chuong 5 cua bao cao.
9. Them trang bia dung mau truong vao dau file bao cao truoc khi nop.

## 4. Ket luan doi chieu

Ma nguon hien tai da co du co so ky thuat de trinh bay lai cac tieu chi 3, 5-8,
14-15, 20-21, 26, 29-30. Diem chinh thuc van do giang vien cham lai. Hai dau
viec chua the tu dong hoa la trang bia theo mau va anh chup Postman tren may
trinh bay.
