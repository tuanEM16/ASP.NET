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
