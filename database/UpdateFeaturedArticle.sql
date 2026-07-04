-- Run with UTF-8 input:
-- sqlcmd -S localhost -d EmCMS_DB -E -C -b -f 65001 -i database\UpdateFeaturedArticle.sql
SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRANSACTION;

UPDATE Posts
SET
    Title = N'Kính râm UV400: Cẩm nang chọn đúng để bảo vệ mắt và hoàn thiện phong cách',
    ImageUrl = N'/images/eyewear/aero-black.jpg',
    CreatedDate = '2026-07-04T09:00:00',
    CategoryId = 2,
    Content = N'
<p class="article-lead"><strong>Một chiếc kính râm tốt không chỉ làm trang phục nổi bật hơn.</strong> Kính còn cần bảo vệ mắt trước tia cực tím, cho hình ảnh dễ chịu và vừa vặn khi đeo lâu. Cẩm nang này giúp bạn hiểu đúng nhãn UV400, phân biệt các loại tròng và chọn kính phù hợp với nhu cầu thực tế.</p>

<blockquote>
<p><strong>Ghi nhớ nhanh:</strong> Hãy ưu tiên nhãn UV400 hoặc 100% UV protection. Màu tròng đậm không đồng nghĩa với khả năng chống tia UV tốt hơn.</p>
</blockquote>

<h2>1. Vì sao mắt cần được bảo vệ khỏi tia UV?</h2>
<p>Tia cực tím (UV) là một phần của bức xạ mặt trời. Trong đó, UVA có bước sóng từ 315 đến 400 nm và UVB từ 280 đến 315 nm. Việc tiếp xúc với tia UV trong thời gian dài có thể góp phần gây tổn thương mắt, vì vậy kính râm đạt chuẩn là một lớp bảo vệ cần thiết khi hoạt động ngoài trời.</p>
<p>Nhãn <strong>UV400</strong> cho biết tròng kính được thiết kế để chặn tia cực tím có bước sóng đến 400 nm, bao phủ dải UVA và UVB. Khi mua kính, thông tin này quan trọng hơn màu sắc hoặc độ tối của tròng.</p>

<figure>
<img src="/images/eyewear/aero-black.jpg" alt="Kính râm gọng đen tròng chống UV phong cách hiện đại">
<figcaption>Kính có bản tròng đủ rộng giúp tăng vùng che phủ quanh mắt.</figcaption>
</figure>

<h2>2. UV400, phân cực và màu tròng khác nhau thế nào?</h2>
<p>Ba khái niệm này thường xuất hiện cùng nhau nhưng không thể thay thế cho nhau. Chống UV liên quan đến khả năng bảo vệ mắt; phân cực giúp giảm ánh sáng chói phản xạ; còn màu tròng ảnh hưởng đến cảm nhận màu sắc và độ sáng.</p>

<table>
<thead>
<tr>
<th>Loại tròng</th>
<th>Ưu điểm chính</th>
<th>Phù hợp với</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>UV400</strong></td>
<td>Chặn tia UV có bước sóng đến 400 nm</td>
<td>Sử dụng ngoài trời hằng ngày</td>
</tr>
<tr>
<td><strong>Phân cực</strong></td>
<td>Giảm chói từ mặt đường, mặt nước và bề mặt phản xạ</td>
<td>Lái xe, đi biển, câu cá</td>
</tr>
<tr>
<td><strong>Đổi màu</strong></td>
<td>Tự điều chỉnh độ tối theo điều kiện ánh sáng và tia UV</td>
<td>Di chuyển thường xuyên giữa trong nhà và ngoài trời</td>
</tr>
<tr>
<td><strong>Gradient</strong></td>
<td>Phần trên tối, phần dưới sáng, dễ quan sát gần</td>
<td>Đi phố, thời trang, lái xe ban ngày</td>
</tr>
</tbody>
</table>

<h2>3. Năm tiêu chí chọn một chiếc kính râm tốt</h2>
<h3>Kiểm tra thông tin chống UV</h3>
<p>Tìm nhãn UV400 hoặc 100% UV protection trên sản phẩm và bao bì. Với sản phẩm không có thông tin rõ ràng, bạn nên yêu cầu cửa hàng kiểm tra bằng thiết bị đo khả năng truyền tia UV.</p>

<h3>Quan sát chất lượng quang học</h3>
<p>Cầm kính cách mắt khoảng 30 cm, nhìn qua tròng vào một đường thẳng rồi di chuyển kính chậm sang hai bên. Nếu đường thẳng bị uốn cong, rung hoặc méo bất thường, tròng có thể không đạt chất lượng quang học tốt.</p>

<h3>Ưu tiên độ che phủ</h3>
<p>Tròng lớn hoặc thiết kế ôm nhẹ theo khuôn mặt giúp hạn chế ánh sáng đi vào từ phía trên và hai bên. Cầu kính cần nằm ổn định trên sống mũi, càng kính không ép thái dương và kính không trượt khi cúi đầu.</p>

<h3>Chọn tròng theo môi trường sử dụng</h3>
<ul>
<li><strong>Lái xe:</strong> ưu tiên tròng xám, nâu hoặc phân cực để giảm chói và giữ màu sắc tự nhiên.</li>
<li><strong>Đi biển:</strong> chọn tròng phân cực, độ che phủ rộng và gọng bám tốt.</li>
<li><strong>Chơi thể thao:</strong> cần gọng nhẹ, ôm mặt, vật liệu bền va đập và đệm mũi chắc chắn.</li>
<li><strong>Đi phố:</strong> có thể chọn màu tròng và kiểu gọng theo phong cách, nhưng vẫn phải bảo đảm chống UV.</li>
</ul>

<h3>Chọn vật liệu phù hợp</h3>
<p>Gọng acetate tạo màu sắc đẹp và cảm giác chắc chắn; gọng kim loại mảnh mang vẻ thanh lịch; titanium nhẹ và bền; còn gọng nhựa thể thao linh hoạt, phù hợp vận động. Hãy thử kính ít nhất vài phút để kiểm tra điểm tì ở mũi và sau tai.</p>

<h2>4. Chọn kiểu kính theo khuôn mặt</h2>
<ul>
<li><strong>Mặt tròn:</strong> gọng vuông hoặc chữ nhật tạo cảm giác khuôn mặt cân đối và sắc nét hơn.</li>
<li><strong>Mặt vuông:</strong> gọng tròn, oval hoặc mắt mèo mềm giúp cân bằng đường nét góc cạnh.</li>
<li><strong>Mặt trái xoan:</strong> phù hợp với phần lớn kiểu gọng; nên giữ chiều rộng gọng gần bằng phần rộng nhất của khuôn mặt.</li>
<li><strong>Mặt trái tim:</strong> gọng mảnh, oval hoặc dáng phi công giúp cân bằng phần trán và cằm.</li>
</ul>
<p>Đây là gợi ý về tỷ lệ, không phải quy tắc bắt buộc. Chiếc kính phù hợp nhất vẫn là chiếc kính khiến bạn thấy thoải mái và tự tin.</p>

<figure>
<img src="/images/eyewear/luna-cat-eye.jpg" alt="Kính mắt mèo màu nâu dùng để phối trang phục">
<figcaption>Dáng mắt mèo tạo điểm nhấn rõ nét nhưng vẫn dễ phối cùng trang phục hằng ngày.</figcaption>
</figure>

<h2>5. Checklist thử kính tại cửa hàng</h2>
<ol>
<li>Xác nhận nhãn UV400 hoặc 100% UV protection.</li>
<li>Kiểm tra bề mặt tròng không trầy xước, không gây méo hình.</li>
<li>Cúi đầu và xoay nhẹ để chắc chắn kính không trượt.</li>
<li>Kiểm tra mi mắt không chạm tròng và gọng không ép thái dương.</li>
<li>Thử kính dưới ánh sáng tự nhiên để đánh giá màu tròng.</li>
<li>Hỏi rõ chính sách bảo hành, đổi trả và phụ kiện đi kèm.</li>
</ol>

<h2>6. Bảo quản kính để dùng bền hơn</h2>
<p>Rửa bụi bằng nước sạch trước khi lau, dùng dung dịch chuyên dụng và khăn microfiber. Không lau tròng bằng áo hoặc khăn giấy khô vì hạt bụi nhỏ có thể làm xước lớp phủ. Khi không sử dụng, hãy đặt kính trong hộp cứng và tránh để kính trên bảng điều khiển ô tô dưới nhiệt độ cao.</p>

<h2>7. Câu hỏi thường gặp</h2>
<h3>Tròng càng tối thì chống UV càng tốt?</h3>
<p>Không. Độ tối chỉ làm giảm lượng ánh sáng nhìn thấy và không cho biết khả năng chống UV. Hãy dựa vào nhãn UV400 hoặc 100% UV protection.</p>

<h3>Kính đắt tiền chắc chắn bảo vệ mắt tốt hơn?</h3>
<p>Không nhất thiết. Giá có thể phản ánh thương hiệu, vật liệu, thiết kế hoặc lớp phủ, nhưng khả năng chống UV vẫn cần được công bố và kiểm tra rõ ràng.</p>

<h3>Trẻ em có cần đeo kính râm?</h3>
<p>Có. Trẻ em cũng cần kính có nhãn chống UVA và UVB rõ ràng, kích thước vừa mặt và vật liệu bền, an toàn khi vận động.</p>

<h3>Đeo kính áp tròng chống UV rồi có cần kính râm không?</h3>
<p>Vẫn nên đeo kính râm. Kính áp tròng chỉ che một phần mắt, trong khi kính râm có độ phủ tốt còn giúp bảo vệ vùng mắt và hạn chế chói.</p>

<h2>Kết luận</h2>
<p>Để chọn kính râm đúng, hãy bắt đầu từ <strong>khả năng chống UV, chất lượng tròng và độ vừa vặn</strong>, sau đó mới cân nhắc kiểu dáng. Một chiếc kính phù hợp sẽ bảo vệ mắt tốt, dễ chịu khi sử dụng lâu và trở thành điểm nhấn tự nhiên cho phong cách của bạn.</p>

<p class="article-sources"><strong>Nguồn tham khảo:</strong> <a href="https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses" target="_blank" rel="noopener noreferrer">U.S. Food and Drug Administration (FDA)</a> và <a href="https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a>.</p>'
WHERE Id = 11;

IF @@ROWCOUNT <> 1
    THROW 51000, N'Không tìm thấy bài viết Id 11 để cập nhật.', 1;

COMMIT TRANSACTION;

SELECT Id, Title, ImageUrl, CreatedDate, LEN(Content) AS ContentLength
FROM Posts
WHERE Id = 11;
