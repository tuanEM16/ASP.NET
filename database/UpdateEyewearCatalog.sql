-- Run with UTF-8 input:
-- sqlcmd -S localhost -d EmCMS_DB -E -C -b -f 65001 -i database\UpdateEyewearCatalog.sql
SET XACT_ABORT ON;
BEGIN TRANSACTION;

UPDATE CategoriesProducts
SET
    Name = CASE Id
        WHEN 5 THEN N'Kính râm nam'
        WHEN 6 THEN N'Kính râm nữ'
        WHEN 7 THEN N'Gọng kính cận'
        WHEN 8 THEN N'Kính trẻ em'
        WHEN 9 THEN N'Kính đổi màu'
        WHEN 13 THEN N'Kính thể thao'
        WHEN 17 THEN N'Kính thời trang unisex'
    END,
    Description = CASE Id
        WHEN 5 THEN N'Kính râm nam chống UV, thiết kế lịch lãm và dễ phối đồ.'
        WHEN 6 THEN N'Kính râm nữ hiện đại với nhiều kiểu dáng thanh lịch.'
        WHEN 7 THEN N'Gọng kính cận nhẹ, bền và phù hợp sử dụng hằng ngày.'
        WHEN 8 THEN N'Kính trẻ em dẻo nhẹ, ôm vừa khuôn mặt và an toàn khi vận động.'
        WHEN 9 THEN N'Kính đổi màu tự động theo cường độ ánh sáng.'
        WHEN 13 THEN N'Kính thể thao ôm mặt, hạn chế chói và chống tia UV.'
        WHEN 17 THEN N'Các mẫu kính thời trang dành cho mọi phong cách.'
    END
WHERE Id IN (5, 6, 7, 8, 9, 13, 17);

UPDATE Products
SET
    Name = CASE Id
        WHEN 4 THEN N'Aero Classic UV400'
        WHEN 5 THEN N'Luna Cat-Eye Black'
        WHEN 6 THEN N'Urban Clear Geometric'
        WHEN 7 THEN N'Classic Rimless Silver'
        WHEN 8 THEN N'Ruby Motion Red'
        WHEN 9 THEN N'Metro Photochromic Black'
        WHEN 10 THEN N'Ocean Blue Sport'
        WHEN 11 THEN N'Retro Tortoise Brown'
        WHEN 12 THEN N'Skyline Polarized Blue'
        WHEN 13 THEN N'Neon Tech Titanium'
    END,
    Description = CASE Id
        WHEN 4 THEN N'<p>Kính râm dáng cổ điển với tròng chống tia UV400, gọng nhẹ và đệm mũi êm.</p><ul><li>Tròng phân cực màu nâu</li><li>Phù hợp khuôn mặt oval và vuông</li><li>Kèm hộp và khăn lau kính</li></ul>'
        WHEN 5 THEN N'<p>Mẫu kính mắt mèo sắc nét dành cho phong cách thanh lịch và nổi bật.</p><ul><li>Gọng acetate đen bóng</li><li>Tròng chống UV400</li><li>Bản lề kim loại chắc chắn</li></ul>'
        WHEN 6 THEN N'<p>Gọng kính trong suốt hình học, nhẹ và dễ phối cùng trang phục công sở.</p><ul><li>Chất liệu acetate cao cấp</li><li>Có thể lắp tròng cận</li><li>Phù hợp nam và nữ</li></ul>'
        WHEN 7 THEN N'<p>Gọng không viền tối giản mang lại cảm giác nhẹ nhàng khi sử dụng cả ngày.</p><ul><li>Càng kính kim loại mảnh</li><li>Đệm mũi silicon</li><li>Phong cách chuyên nghiệp</li></ul>'
        WHEN 8 THEN N'<p>Kính trẻ em màu đỏ năng động, thiết kế bo tròn và gọng dẻo an toàn.</p><ul><li>Trọng lượng nhẹ</li><li>Ôm vừa khuôn mặt nhỏ</li><li>Tròng chống tia UV</li></ul>'
        WHEN 9 THEN N'<p>Tròng kính tự động chuyển màu khi ra nắng và trở lại trong suốt khi vào nhà.</p><ul><li>Chống tia UV400</li><li>Giảm chói ngoài trời</li><li>Gọng đen hiện đại</li></ul>'
        WHEN 10 THEN N'<p>Kính thể thao tròng xanh ôm sát khuôn mặt, phù hợp chạy bộ và đạp xe.</p><ul><li>Tròng phân cực</li><li>Gọng bám chắc, chống trượt</li><li>Chống tia UV400</li></ul>'
        WHEN 11 THEN N'<p>Kính vân đồi mồi mang cảm hứng cổ điển, phù hợp nhiều kiểu khuôn mặt.</p><ul><li>Tròng nâu chống chói</li><li>Gọng acetate bền màu</li><li>Phong cách unisex</li></ul>'
        WHEN 12 THEN N'<p>Kính râm tròng xanh hiện đại giúp giảm phản xạ khi lái xe và đi biển.</p><ul><li>Tròng polarized</li><li>Gọng kim loại nhẹ</li><li>Chống tia UV400</li></ul>'
        WHEN 13 THEN N'<p>Gọng titanium mảnh kết hợp thiết kế hiện đại cho người dùng yêu công nghệ.</p><ul><li>Nhẹ và chống ăn mòn</li><li>Có thể lắp tròng cận</li><li>Đệm mũi điều chỉnh linh hoạt</li></ul>'
    END,
    Price = CASE Id
        WHEN 4 THEN 1290000
        WHEN 5 THEN 1450000
        WHEN 6 THEN 890000
        WHEN 7 THEN 1150000
        WHEN 8 THEN 590000
        WHEN 9 THEN 1690000
        WHEN 10 THEN 1850000
        WHEN 11 THEN 1390000
        WHEN 12 THEN 1590000
        WHEN 13 THEN 2490000
    END,
    StockQuantity = CASE Id
        WHEN 4 THEN 24
        WHEN 5 THEN 18
        WHEN 6 THEN 32
        WHEN 7 THEN 20
        WHEN 8 THEN 35
        WHEN 9 THEN 16
        WHEN 10 THEN 14
        WHEN 11 THEN 22
        WHEN 12 THEN 17
        WHEN 13 THEN 12
    END,
    CategoryProductId = CASE Id
        WHEN 4 THEN 5
        WHEN 5 THEN 6
        WHEN 6 THEN 7
        WHEN 7 THEN 7
        WHEN 8 THEN 8
        WHEN 9 THEN 9
        WHEN 10 THEN 13
        WHEN 11 THEN 6
        WHEN 12 THEN 5
        WHEN 13 THEN 17
    END,
    ImageUrl = CASE Id
        WHEN 4 THEN N'/images/eyewear/aero-black.jpg'
        WHEN 5 THEN N'/images/eyewear/luna-cat-eye.jpg'
        WHEN 6 THEN N'/images/eyewear/urban-clear.jpg'
        WHEN 7 THEN N'/images/eyewear/classic-rimless.jpg'
        WHEN 8 THEN N'/images/eyewear/ruby-motion.jpg'
        WHEN 9 THEN N'/images/eyewear/metro-black.jpg'
        WHEN 10 THEN N'/images/eyewear/ocean-blue.jpg'
        WHEN 11 THEN N'/images/eyewear/retro-tortoise.jpg'
        WHEN 12 THEN N'/images/eyewear/skyline-blue.jpg'
        WHEN 13 THEN N'/images/eyewear/neon-tech.jpg'
    END
WHERE Id BETWEEN 4 AND 13;

SET IDENTITY_INSERT Products ON;

MERGE Products AS target
USING
(
    VALUES
        (14, N'Rose Gold Aviator', N'<p>Kính phi công màu vàng hồng mang vẻ thanh lịch và hiện đại.</p><ul><li>Tròng hồng nhạt chống UV400</li><li>Gọng kim loại nhẹ</li><li>Đệm mũi silicon êm</li></ul>', CAST(1750000 AS decimal(18,2)), 20, N'/images/eyewear/rose-aviator.jpg', 6),
        (15, N'Cocoa Square Polarized', N'<p>Kính vuông màu nâu dễ phối đồ, phù hợp sử dụng hằng ngày.</p><ul><li>Tròng polarized giảm chói</li><li>Gọng acetate chắc chắn</li><li>Phong cách nam tính</li></ul>', CAST(1290000 AS decimal(18,2)), 26, N'/images/eyewear/cocoa-square.jpg', 5),
        (16, N'Blush Round Crystal', N'<p>Gọng tròn trong suốt màu hồng nhẹ dành cho phong cách trẻ trung.</p><ul><li>Có thể lắp tròng cận</li><li>Gọng nhẹ, đeo thoải mái</li><li>Phù hợp khuôn mặt vuông</li></ul>', CAST(1190000 AS decimal(18,2)), 21, N'/images/eyewear/blush-round.jpg', 6),
        (17, N'Amber Classic Unisex', N'<p>Mẫu kính màu hổ phách cổ điển dành cho cả nam và nữ.</p><ul><li>Tròng nâu chống chói</li><li>Gọng bền màu</li><li>Kèm hộp bảo vệ</li></ul>', CAST(1350000 AS decimal(18,2)), 19, N'/images/eyewear/amber-classic.jpg', 17),
        (18, N'Noir Optical Essential', N'<p>Gọng kính đen tối giản phù hợp học tập, làm việc và sử dụng hằng ngày.</p><ul><li>Lắp được nhiều loại tròng cận</li><li>Bản lề chắc chắn</li><li>Thiết kế unisex</li></ul>', CAST(950000 AS decimal(18,2)), 30, N'/images/eyewear/noir-optical.jpg', 7),
        (19, N'Tortoise Luxe Edition', N'<p>Kính vân đồi mồi cao cấp với đường nét thanh lịch và sắc tròng ấm.</p><ul><li>Tròng chống UV400</li><li>Gọng acetate hoàn thiện bóng</li><li>Phong cách cổ điển</li></ul>', CAST(1690000 AS decimal(18,2)), 15, N'/images/eyewear/tortoise-luxe.jpg', 17),
        (20, N'Azure Pro Aviator', N'<p>Kính phi công tròng xanh dành cho hoạt động ngoài trời và lái xe.</p><ul><li>Tròng polarized</li><li>Giảm phản xạ bề mặt</li><li>Gọng kim loại chống gỉ</li></ul>', CAST(1990000 AS decimal(18,2)), 13, N'/images/eyewear/azure-aviator.jpg', 13),
        (21, N'Shadow Square UV400', N'<p>Kính râm vuông màu đen tạo phong cách mạnh mẽ và hiện đại.</p><ul><li>Chống tia UV400</li><li>Tròng tối màu dịu mắt</li><li>Gọng ôm vừa khuôn mặt</li></ul>', CAST(1490000 AS decimal(18,2)), 23, N'/images/eyewear/shadow-square.jpg', 5),
        (22, N'Edge Angular Fashion', N'<p>Kính góc cạnh thời trang tạo điểm nhấn cho trang phục hiện đại.</p><ul><li>Tròng chống UV</li><li>Gọng acetate nhẹ</li><li>Thiết kế cá tính</li></ul>', CAST(1590000 AS decimal(18,2)), 17, N'/images/eyewear/edge-angular.jpg', 6),
        (23, N'Scarlet Flex Junior', N'<p>Gọng kính đỏ dẻo nhẹ dành cho trẻ em học tập và vui chơi.</p><ul><li>Bo cạnh an toàn</li><li>Càng kính linh hoạt</li><li>Có thể lắp tròng cận</li></ul>', CAST(650000 AS decimal(18,2)), 28, N'/images/eyewear/scarlet-frame.jpg', 8)
) AS source (Id, Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId)
ON target.Id = source.Id
WHEN MATCHED THEN
    UPDATE SET
        Name = source.Name,
        Description = source.Description,
        Price = source.Price,
        StockQuantity = source.StockQuantity,
        ImageUrl = source.ImageUrl,
        CategoryProductId = source.CategoryProductId
WHEN NOT MATCHED THEN
    INSERT (Id, Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId)
    VALUES (source.Id, source.Name, source.Description, source.Price, source.StockQuantity, source.ImageUrl, source.CategoryProductId);

SET IDENTITY_INSERT Products OFF;

UPDATE Categories
SET
    Name = CASE Id
        WHEN 1 THEN N'Xu hướng kính mắt'
        WHEN 2 THEN N'Cẩm nang chọn kính'
        WHEN 3 THEN N'Chăm sóc mắt kính'
        WHEN 4 THEN N'Phong cách và phối đồ'
        WHEN 5 THEN N'Công nghệ tròng kính'
    END,
    Description = CASE Id
        WHEN 1 THEN N'Cập nhật mẫu kính, màu sắc và kiểu dáng đang được yêu thích.'
        WHEN 2 THEN N'Kinh nghiệm chọn kính theo khuôn mặt, nhu cầu và môi trường sử dụng.'
        WHEN 3 THEN N'Hướng dẫn vệ sinh, bảo quản kính và chăm sóc thị lực.'
        WHEN 4 THEN N'Gợi ý phối kính cùng trang phục cho nhiều phong cách.'
        WHEN 5 THEN N'Kiến thức về tròng phân cực, đổi màu, chống UV và lọc ánh sáng xanh.'
    END
WHERE Id BETWEEN 1 AND 5;

UPDATE Posts
SET
    Title = CASE Id
        WHEN 10 THEN N'5 kiểu gọng kính nổi bật năm 2026'
        WHEN 11 THEN N'Cách chọn kính râm chống UV400'
        WHEN 12 THEN N'Hướng dẫn vệ sinh kính đúng cách'
        WHEN 13 THEN N'Chọn kính phù hợp với từng khuôn mặt'
        WHEN 14 THEN N'Phối kính mắt cùng trang phục công sở'
        WHEN 16 THEN N'Tròng kính đổi màu hoạt động như thế nào?'
    END,
    Content = CASE Id
        WHEN 10 THEN N'<h2>Xu hướng gọng kính năm 2026</h2><p>Gọng trong suốt, mắt mèo, titanium mảnh, dáng vuông và phong cách retro đang được yêu thích.</p><p>Khi chọn kính, hãy ưu tiên tỷ lệ cân đối với khuôn mặt và cảm giác thoải mái khi đeo lâu.</p>'
        WHEN 11 THEN N'<h2>UV400 là gì?</h2><p>Kính đạt chuẩn UV400 có khả năng ngăn tia cực tím có bước sóng đến 400 nm.</p><p>Không nên chọn kính chỉ dựa vào màu tròng; hãy kiểm tra thông tin chống UV và độ phù hợp với nhu cầu lái xe, đi biển hoặc chơi thể thao.</p>'
        WHEN 12 THEN N'<h2>Ba bước làm sạch kính</h2><ol><li>Rửa bụi dưới vòi nước sạch.</li><li>Dùng dung dịch chuyên dụng và khăn microfiber.</li><li>Cất kính trong hộp khi không sử dụng.</li></ol><p>Tránh lau kính khô bằng áo vì bụi nhỏ có thể làm xước bề mặt tròng.</p>'
        WHEN 13 THEN N'<h2>Chọn kính theo khuôn mặt</h2><p>Khuôn mặt tròn hợp gọng vuông; khuôn mặt vuông có thể cân bằng bằng gọng tròn hoặc oval. Khuôn mặt trái xoan phù hợp với phần lớn kiểu kính.</p><p>Quan trọng nhất là cầu kính vừa vặn và mắt nằm gần trung tâm tròng.</p>'
        WHEN 14 THEN N'<h2>Kính mắt trong phong cách công sở</h2><p>Gọng kim loại mảnh tạo cảm giác chuyên nghiệp, trong khi gọng acetate trong suốt mang vẻ hiện đại.</p><p>Nên phối màu gọng với đồng hồ, thắt lưng hoặc tông màu chính của trang phục.</p>'
        WHEN 16 THEN N'<h2>Cơ chế đổi màu</h2><p>Tròng photochromic chứa phân tử nhạy sáng. Khi tiếp xúc tia UV, các phân tử thay đổi cấu trúc làm tròng tối màu; khi vào trong nhà, tròng dần trở lại trong suốt.</p><p>Thời gian chuyển màu phụ thuộc nhiệt độ và cường độ tia UV.</p>'
    END,
    ImageUrl = CASE Id
        WHEN 10 THEN N'/images/eyewear/silver-retro.jpg'
        WHEN 11 THEN N'/images/eyewear/aero-black.jpg'
        WHEN 12 THEN N'/images/eyewear/classic-rimless.jpg'
        WHEN 13 THEN N'/images/eyewear/luna-cat-eye.jpg'
        WHEN 14 THEN N'/images/eyewear/skyline-blue.jpg'
        WHEN 16 THEN N'/images/eyewear/neon-tech.jpg'
    END,
    CreatedDate = CASE Id
        WHEN 10 THEN '2026-06-20T09:00:00'
        WHEN 11 THEN '2026-06-22T09:00:00'
        WHEN 12 THEN '2026-06-24T09:00:00'
        WHEN 13 THEN '2026-06-26T09:00:00'
        WHEN 14 THEN '2026-06-28T09:00:00'
        WHEN 16 THEN '2026-06-30T09:00:00'
    END,
    CategoryId = CASE Id
        WHEN 10 THEN 1
        WHEN 11 THEN 2
        WHEN 12 THEN 3
        WHEN 13 THEN 2
        WHEN 14 THEN 4
        WHEN 16 THEN 5
    END
WHERE Id IN (10, 11, 12, 13, 14, 16);

COMMIT TRANSACTION;

-- Cập nhật bài viết mẫu chi tiết sau khi chuẩn hóa dữ liệu:
-- sqlcmd -S localhost -d EmCMS_DB -E -C -b -f 65001 -i database\UpdateFeaturedArticle.sql
