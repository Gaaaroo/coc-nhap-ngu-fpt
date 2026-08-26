# BUSINESS REQUIREMENTS DOCUMENT (BRD)

## Web App Booth 4 — "MẬT MÃ SỐ 4: BẺ ĐIỂM KHUYẾT – BIẾT ĐIỂM KHỎE"

*Sự kiện: CÓC NHẬP NGŨ 2026*

### Thông tin tài liệu

| | |
| --- | --- |
| Phiên bản | 1.0 |
| Ngày soạn | 17/08/2026 |
| Người soạn | Product Manager / UX Designer / Technical Analyst |
| Trạng thái | Dự thảo — chờ BTC phê duyệt |
| Tài liệu liên quan | Functional Specification for Developer — Booth 4 |

## 1. TỔNG QUAN DỰ ÁN

Web App Booth 4 là một trải nghiệm tương tác trong khuôn khổ sự kiện "Cóc Nhập Ngũ 2026", theo concept quân đội/tân binh. Người tham gia nhập một số chỉ số thể chất cơ bản, trả lời trắc nghiệm lối sống, nhận kết quả tổng hợp dạng "Điểm Khỏe / Điểm Khuyết", đọc kiến thức giáo dục ngắn, và mở khóa Avatar cá nhân hóa theo concept tân binh để tải về/chia sẻ.

App vận hành độc lập, không cần tài khoản, không lưu trữ dữ liệu người dùng lâu dài, và hoàn toàn tách biệt với Card Battle ở Trạm 2.

## 2. BỐI CẢNH & VẤN ĐỀ CẦN GIẢI QUYẾT

Booth 4 cần một điểm chạm tương tác nhanh, vui, dễ hiểu để thu hút người tham gia sự kiện, đồng thời lồng ghép thông điệp giáo dục về mối liên hệ giữa lối sống và sức khỏe sinh sản một cách nhẹ nhàng, không mang tính chẩn đoán y tế. Bài toán đặt ra là thiết kế một trải nghiệm đủ hấp dẫn (có kết quả cá nhân hóa, có phần thưởng dạng Avatar) nhưng vẫn gọn trong 3–5 phút để phù hợp với lưu lượng khách tham quan tại một booth sự kiện.

## 3. MỤC TIÊU KINH DOANH

- Tạo trải nghiệm tương tác thu hút người tham gia tại Booth 4 của sự kiện Cóc Nhập Ngũ 2026.
- Giúp người chơi tự đánh giá nhanh lối sống và thể chất theo concept "tân binh", tạo cảm giác thú vị và cá nhân hóa.
- Lồng ghép kiến thức giáo dục về mối liên hệ giữa lối sống và sức khỏe sinh sản theo hướng tích cực, không chẩn đoán, không kết luận y tế cá nhân.
- Tạo động lực lan tỏa qua mạng xã hội thông qua Avatar cá nhân hóa, góp phần tăng nhận diện sự kiện.
- Đảm bảo trải nghiệm nhanh gọn (3–5 phút/người), phù hợp vận hành tại booth có lưu lượng khách cao.

## 4. PHẠM VI DỰ ÁN

### 4.1 Trong phạm vi (In-scope)

- Thu thập thông tin thể chất cơ bản: tuổi, giới tính, chiều cao, cân nặng, tự động tính BMI.
- Ghi nhận kết quả bài test thể lực (gập thanh lò xo 20 giây) và quy đổi điểm.
- Trắc nghiệm lối sống theo 5 nhóm: Giấc ngủ, Dinh dưỡng, Uống nước, Vận động, Tinh thần.
- Tính điểm tổng hợp và phân loại "Điểm Khỏe" / "Điểm Khuyết".
- Nội dung giáo dục ngắn gọn theo từng nhóm lối sống.
- Mở khóa, tạo và xuất Avatar cá nhân hóa (upload ảnh, crop, zoom, ghép khung).
- Tải về (download) và chia sẻ (share) Avatar hoàn chỉnh.
- Giao diện tối ưu cho thiết bị di động, không yêu cầu tài khoản.

### 4.2 Ngoài phạm vi (Out-of-scope)

- Không kết nối, truyền hoặc chia sẻ dữ liệu/điểm số với Card Battle ở Trạm 2 dưới bất kỳ hình thức nào.
- Không lưu trữ dữ liệu người dùng vào hệ thống backend/database lâu dài.
- Không chẩn đoán y tế, không đánh giá hoặc kết luận về khả năng sinh sản của người chơi.
- Không có tính năng theo dõi sức khỏe theo thời gian (lịch sử, xu hướng nhiều lần chơi).
- Không yêu cầu đăng nhập, không có hệ thống tài khoản người dùng.
- Không phát triển thêm tính năng ngoài phạm vi mô tả trong tài liệu này và Functional Specification liên quan.

## 5. ĐỐI TƯỢNG LIÊN QUAN (STAKEHOLDERS)

| Vai trò | Trách nhiệm |
| --- | --- |
| Ban tổ chức sự kiện (BTC) | Chủ đầu tư, phê duyệt nội dung, benchmark thể lực/BMI, phê duyệt go-live |
| Product Manager | Định nghĩa yêu cầu, quản lý phạm vi, phối hợp các bên liên quan |
| Đội ngũ Developer / Designer | Xây dựng, kiểm thử và bàn giao Web App theo đúng FSD |
| Đội ngũ vận hành booth (MC / Tình nguyện viên) | Vận hành bài test thể lực, hỗ trợ người chơi thao tác tại booth |
| Người tham gia sự kiện (End user) | Đối tượng trải nghiệm chính, chủ yếu 18–25 tuổi |

## 6. YÊU CẦU NGHIỆP VỤ (BUSINESS REQUIREMENTS)

| Mã | Mô tả yêu cầu | Ưu tiên |
| --- | --- | --- |
| BR-01 | Cho phép người chơi nhập thông tin cá nhân cơ bản (tuổi, giới tính, chiều cao, cân nặng) và tự động tính BMI. | Cao |
| BR-02 | Ghi nhận kết quả bài test thể lực (gập thanh lò xo 20 giây) và quy đổi thành điểm theo giới tính. | Cao |
| BR-03 | Triển khai bộ câu hỏi trắc nghiệm lối sống gồm 5 nhóm: Giấc ngủ, Dinh dưỡng, Uống nước, Vận động, Tinh thần. | Cao |
| BR-04 | Tự động tính điểm từng nhóm và Tổng điểm theo trọng số đã quy định trong FSD. | Cao |
| BR-05 | Xác định và hiển thị 2 nhóm "Điểm Khỏe" và 2 nhóm "Điểm Khuyết" cho mỗi người chơi. | Cao |
| BR-06 | Cung cấp nội dung giáo dục ngắn, không chẩn đoán, liên hệ lối sống với sức khỏe sinh sản ở mức thông tin chung. | Cao |
| BR-07 | Mở khóa Avatar Frame theo concept tân binh sau khi người chơi hoàn thành phần kiến thức. | Trung bình |
| BR-08 | Cho phép upload, crop, zoom, di chuyển ảnh cá nhân để ghép vào Avatar Frame. | Cao |
| BR-09 | Cho phép tải về (download) và chia sẻ (share) Avatar hoàn chỉnh. | Cao |
| BR-10 | Không kết nối, chia sẻ hoặc truyền bất kỳ dữ liệu/điểm số nào sang hệ thống Card Battle Trạm 2. | Bắt buộc (Compliance) |
| BR-11 | Không sử dụng thuật ngữ "Fertility Score" hoặc "Reproductive Health Score" ở bất kỳ đâu trong sản phẩm. | Bắt buộc (Compliance) |
| BR-12 | Không yêu cầu người chơi tạo tài khoản hoặc đăng nhập. | Cao |

## 7. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

| Hạng mục | Yêu cầu |
| --- | --- |
| Hiệu năng trải nghiệm | Toàn bộ flow hoàn thành trong khoảng 3–5 phút/người chơi |
| Nền tảng | Thiết kế Mobile First, tối ưu cho màn hình điện thoại |
| Khả dụng | Hoạt động ổn định liên tục trong suốt sự kiện; xử lý phần lớn logic ở phía client |
| Bảo mật & riêng tư | Không lưu trữ ảnh/chỉ số cá nhân trên server sau khi phiên chơi kết thúc |
| Ngôn ngữ & văn phong | Tiếng Việt, văn phong theo concept "tân binh / nhập ngũ" |
| Vận hành | Không cần đội ngũ kỹ thuật can thiệp trong lúc vận hành, trừ khi có sự cố hệ thống |

## 8. GIẢ ĐỊNH (ASSUMPTIONS)

- Người tham gia đa số trong độ tuổi 18–25.
- Thiết bị sử dụng là smartphone cá nhân của người chơi hoặc thiết bị do BTC bố trí tại booth.
- Bài test thể lực (gập thanh lò xo) được thực hiện và ghi nhận thủ công bởi tình nguyện viên/BTC; App chỉ nhận input kết quả, không đo tự động.
- Có kết nối internet ổn định tại khu vực booth trong suốt thời gian sự kiện.
- BTC chịu trách nhiệm chuẩn bị thanh lò xo 20kg (nữ) và 30kg (nam) tại booth.

## 9. RÀNG BUỘC (CONSTRAINTS)

- Thời gian trải nghiệm giới hạn 3–5 phút/người do lưu lượng người chơi tại sự kiện.
- Không được phép tích hợp hoặc chia sẻ dữ liệu với Card Battle Trạm 2 dưới bất kỳ hình thức nào.
- Benchmark bài test thể lực và thang điểm BMI hiện là benchmark vận hành do chưa có chuẩn y khoa chính thức áp dụng riêng cho sự kiện (chi tiết tại FSD, Phần 6–7); cần BTC/cố vấn chuyên môn duyệt trước khi go-live.
- Không có ngân sách/thời gian để xây dựng hệ thống backend lưu trữ dữ liệu người dùng lâu dài.

## 10. RỦI RO & GIẢI PHÁP GIẢM THIỂU

| Rủi ro | Mức độ | Giải pháp giảm thiểu |
| --- | --- | --- |
| Benchmark bài test thể lực / BMI chưa được chuyên môn y tế xác nhận | Trung bình | Gắn nhãn rõ "benchmark trải nghiệm"; xin ý kiến cố vấn y tế/BTC trước go-live |
| Người chơi hiểu nhầm App là công cụ y tế hoặc công cụ đánh giá khả năng sinh sản | Cao | Hiển thị disclaimer rõ ràng ở màn hình Landing và màn hình kết quả |
| Đường truyền mạng yếu tại khu vực booth đông người | Trung bình | Thiết kế client xử lý phần lớn logic, hạn chế phụ thuộc gọi API |
| Thời gian chơi vượt quá 5 phút gây ùn tắc tại booth | Trung bình | Giới hạn số lượng câu hỏi; kiểm thử UX thực tế trước sự kiện |
| Lỗi tích hợp code khiến dữ liệu vô tình liên kết sang Card Battle | Cao | Review code đảm bảo tách biệt hoàn toàn 2 hệ thống trước go-live |

## 11. TIÊU CHÍ NGHIỆM THU / THÀNH CÔNG

- Người chơi hoàn thành toàn bộ flow (từ Landing đến Hoàn thành) trong khoảng 3–5 phút khi đo thực tế.
- Không phát sinh phản ánh/khiếu nại về việc App đưa ra kết luận y tế hoặc chẩn đoán sinh sản.
- Không phát sinh bất kỳ kết nối hoặc rò rỉ dữ liệu nào giữa App và Card Battle Trạm 2 trong suốt sự kiện.
- Tỷ lệ hoàn thành flow (từ Landing đến Hoàn thành) đạt tối thiểu 90% trên tổng số lượt bắt đầu.
- Avatar được người chơi tải về/chia sẻ thành công, đạt số lượng chia sẻ mục tiêu theo kế hoạch marketing của BTC.

## 12. TÀI LIỆU LIÊN QUAN

Chi tiết kỹ thuật, thiết kế màn hình, câu hỏi trắc nghiệm nguyên văn, công thức tính điểm, cấu trúc dữ liệu và acceptance criteria cho developer được quy định đầy đủ trong tài liệu: "Functional Specification for Developer — Booth 4" (đã bàn giao trước đó, dùng kèm với BRD này).
