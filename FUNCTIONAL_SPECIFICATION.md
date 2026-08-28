FUNCTIONAL SPECIFICATION
Web App Booth 4 - "MẬT MÃ SỐ 4: BẺ ĐIỂM KHUYẾT - BIẾT ĐIỂM KHỎE"
Sự kiện: CÓC NHẬP NGŨ 2026
1. PRODUCT OVERVIEW
Web App mobile-first, dùng tại Booth 4, không cần đăng nhập, không cần database user.
Thời lượng sử dụng mục tiêu: 3-5 phút/lượt chơi.
Chức năng: nhập chỉ số thể chất → làm bài test thể lực → trả lời câu hỏi lối sống → nhận kết quả (Điểm Khỏe/Điểm Khuyết) → đọc kiến thức giáo dục → mở khóa và ghép Avatar tân binh.
App KHÔNG chẩn đoán y tế, KHÔNG đánh giá khả năng sinh sản, KHÔNG lưu trữ dữ liệu cá nhân dài hạn (xử lý toàn bộ ở client, không cần backend lưu user).
App HOÀN TOÀN ĐỘC LẬP với Card Battle ở Trạm 2. Không truyền, không export, không liên kết điểm số giữa hai hệ thống dưới bất kỳ hình thức nào.
2. USER FLOW
Landing - Màn hình chào, giới thiệu ngắn Booth 4, nút bắt đầu.
Hồ sơ tân binh - Người chơi nhập tuổi, giới tính, chiều cao, cân nặng; hệ thống tính BMI.
Nhập kết quả thể lực - Người chơi (hoặc BTC) nhập số lần gập thanh lò xo trong 20 giây.
Kiểm tra lối sống - Người chơi trả lời lần lượt 5 nhóm câu hỏi: Giấc ngủ, Dinh dưỡng, Uống nước, Vận động, Tinh thần.
Phân tích - Màn hình loading, hệ thống tính toán toàn bộ điểm số.
Hồ sơ sức khỏe - Hiển thị kết quả tổng hợp: các điểm thành phần, Điểm Khỏe, Điểm Khuyết.
Mật mã kiến thức - Hiển thị 5 thẻ kiến thức ngắn liên quan tới 5 nhóm lối sống.
Unlock Avatar - Thông báo mở khóa Avatar Frame tân binh sau khi đọc hết kiến thức.
Upload ảnh - Người chơi tải ảnh cá nhân lên.
Ghép Avatar - Người chơi crop/zoom/di chuyển ảnh để khớp với Avatar Frame.
Hoàn thành - Hiển thị Avatar hoàn chỉnh, cho phép Download/Share, kết thúc phiên.
3. SCREEN LIST
#
Screen
Mục đích
Input
Output
CTA
1
Landing
Chào mừng, giới thiệu Booth 4
Không có
Không có
"BẮT ĐẦU NHẬP NGŨ"
2
Hồ sơ tân binh
Thu thập dữ liệu cá nhân + tính BMI
Tuổi, giới tính, chiều cao, cân nặng
BMI
"TIẾP TỤC"
3
Nhập kết quả thể lực
Ghi nhận kết quả bài test gập thanh lò xo
Số lần gập/20s
Grip Score
"TIẾP TỤC"
4
Kiểm tra lối sống
Thu thập dữ liệu 5 nhóm lối sống
Lựa chọn từng câu hỏi
Điểm 5 nhóm lối sống
"XEM KẾT QUẢ" (ở bước cuối)
5
Phân tích
Xử lý tính toán, tạo cảm giác chờ
Không có
Không có (chuyển tự động)
Không có
6
Hồ sơ sức khỏe
Hiển thị kết quả tổng hợp
Không có
Total Score, các điểm thành phần, Điểm Khỏe/Khuyết
"XEM MẬT MÃ KIẾN THỨC"
7
Mật mã kiến thức
Giáo dục ngắn theo 5 nhóm
Vuốt/chuyển thẻ
Trạng thái đã đọc hết
"MỞ KHÓA AVATAR"
8
Unlock Avatar
Thông báo mở khóa
Không có
Trạng thái avatarUnlocked = true
"TẢI ẢNH LÊN"
9
Upload ảnh
Nhận ảnh người chơi
File ảnh (JPG/PNG/WEBP)
Ảnh đã upload
"GHÉP AVATAR"
10
Ghép Avatar
Cho phép căn chỉnh ảnh vào khung
Crop/Zoom/Move
Ảnh đã căn chỉnh
"XÁC NHẬN"
11
Hoàn thành
Hiển thị kết quả cuối, tải/chia sẻ
Không có
File ảnh Avatar cuối cùng
"TẢI VỀ" / "CHIA SẺ"


4. SCREEN SPECIFICATION
Screen 1 - Landing
Mục đích: Giới thiệu Booth 4, tạo không khí "nhập ngũ". UI: Logo sự kiện, tiêu đề "MẬT MÃ SỐ 4: BẺ ĐIỂM KHUYẾT - BIẾT ĐIỂM KHỎE", mô tả ngắn 1-2 câu, nút CTA lớn. Input: Không có. Lựa chọn: Không có. Logic xử lý: Không có xử lý dữ liệu. Output: Không có. Điều kiện chuyển màn: Bấm "BẮT ĐẦU NHẬP NGŨ" → chuyển sang Screen 2.
Screen 2 - Hồ sơ tân binh
Mục đích: Thu thập dữ liệu cá nhân cơ bản, tính BMI. UI: 4 field nhập liệu dạng form, hiển thị theo từng bước hoặc cùng lúc trên 1 màn hình cuộn. Input:
Tuổi: number input, bàn phím số.
Giới tính: 2 nút lựa chọn dạng button-card.
Chiều cao: number input, đơn vị cm.
Cân nặng: number input, đơn vị kg.
Lựa chọn cụ thể (Giới tính):
A. "Nam"
B. "Nữ"
ĐỀ XUẤT VẬN HÀNH: chỉ có 2 lựa chọn giới tính vì bài test thể lực (thanh lò xo) chỉ có 2 mức tạ (30kg/20kg) tương ứng 2 nhóm này; đây là giới hạn kỹ thuật của thiết bị test, không phải quan điểm của app.
Logic xử lý:
BMI = weight / (height/100)² , làm tròn 1 chữ số thập phân.
Lưu tuổi, giới tính, chiều cao, cân nặng, BMI vào state.
Output: age, gender, height, weight, bmi. Điều kiện chuyển màn: Tất cả field hợp lệ (xem Phần 12) → bấm "TIẾP TỤC" → Screen 3.
Screen 3 - Nhập kết quả thể lực
Mục đích: Ghi nhận kết quả bài test gập thanh lò xo 20 giây. UI: Hiển thị lại thanh tạ tương ứng giới tính đã chọn (Nam: 30kg / Nữ: 20kg), 1 field nhập số lần gập, đồng hồ đếm 20 giây hiển thị mang tính minh họa (không bắt buộc chạy timer thật, BTC bấm giờ thủ công). Input:
Field "Số lần gập": number input, do BTC hoặc người chơi nhập sau khi test xong.
Lựa chọn cụ thể: Không có (nhập số trực tiếp). Logic xử lý: Tra bảng benchmark theo giới tính (xem Phần 6) để tính gripScore. Output: gripResult (số lần), gripScore. Điều kiện chuyển màn: Field không rỗng và hợp lệ → bấm "TIẾP TỤC" → Screen 4.
Screen 4 - Kiểm tra lối sống
Mục đích: Thu thập dữ liệu 5 nhóm lối sống thông qua trắc nghiệm. UI: 1 màn hình dạng wizard 5 bước (progress dots 1/5 → 5/5), mỗi bước hiển thị toàn bộ câu hỏi của 1 nhóm dưới dạng card, mỗi câu hỏi có các option dạng button, chọn 1 option/câu. Input: Lựa chọn option cho từng câu hỏi (xem chi tiết Phần 5 - Questionnaire). Lựa chọn cụ thể: Xem chi tiết từng câu ở Phần 5. Logic xử lý:
Mỗi bước phải trả lời hết các câu hỏi trong nhóm mới được bấm "Tiếp theo".
Cho phép bấm "Quay lại" để sửa đáp án bước trước, đáp án được giữ nguyên trong state.
Sau bước 5 (Tinh thần), tính điểm 5 nhóm theo công thức Phần 7. Output: sleepScore, nutritionScore, hydrationScore, exerciseScore, mentalScore. Điều kiện chuyển màn: Hoàn thành cả 5 bước → bấm "XEM KẾT QUẢ" ở bước 5 → Screen 5.
Screen 5 - Phân tích
Mục đích: Tạo hiệu ứng chờ trong lúc hệ thống tính toán, tăng cảm giác "được xử lý dữ liệu". UI: Animation loading dạng thanh quét / icon xoay, text "ĐANG PHÂN TÍCH HỒ SƠ TÂN BINH...". Input: Không có. Lựa chọn: Không có. Logic xử lý:
Tính physicalScore, totalScore theo công thức Phần 7.
Xác định overallTier, strengths, weaknesses theo Phần 8.
ĐỀ XUẤT VẬN HÀNH: giữ màn hình tối thiểu 1.5 giây, tối đa 3 giây (setTimeout cố định), để tránh cảm giác giật màn hình dù tính toán thực tế gần như tức thời. Output: Toàn bộ object kết quả (xem Phần 13). Điều kiện chuyển màn: Hết thời gian loading cố định → tự động chuyển sang Screen 6.
Screen 6 - Hồ sơ sức khỏe
Mục đích: Hiển thị kết quả tổng hợp cho người chơi. UI: Xem chi tiết thiết kế tại Phần 9. Input: Không có. Lựa chọn: Không có. Logic xử lý: Chỉ hiển thị dữ liệu đã tính từ Screen 5, không tính toán lại. Output: Không có dữ liệu mới. Điều kiện chuyển màn: Bấm "XEM MẬT MÃ KIẾN THỨC" → Screen 7.
Screen 7 - Mật mã kiến thức
Mục đích: Truyền tải kiến thức giáo dục ngắn gọn theo 5 nhóm lối sống. UI: Carousel/swipe 5 thẻ, mỗi thẻ 1 nhóm, có chỉ báo số thứ tự thẻ (1/5...5/5), nút "Tiếp" giữa các thẻ. Input: Vuốt hoặc bấm nút để chuyển thẻ. Lựa chọn: Không có. Logic xử lý: Yêu cầu người chơi xem hết cả 5 thẻ (đã lướt qua) trước khi cho phép bấm nút mở khóa; nội dung copy xem Phần 10. Output: knowledgeViewed = true. Điều kiện chuyển màn: Đã xem hết 5 thẻ → bấm "MỞ KHÓA AVATAR" → Screen 8.
Screen 8 - Unlock Avatar
Mục đích: Tạo khoảnh khắc "phần thưởng", thông báo mở khóa Avatar Frame. UI: Animation mở khóa (icon khóa mở ra / hiệu ứng ánh sáng), hiển thị preview Avatar Frame trống (chưa có ảnh). Input: Không có. Lựa chọn: Không có. Logic xử lý: Set avatarUnlocked = true. Output: avatarUnlocked = true. Điều kiện chuyển màn: Bấm "TẢI ẢNH LÊN" → Screen 9.
Screen 9 - Upload ảnh
Mục đích: Nhận ảnh cá nhân từ người chơi. UI: Nút "Chụp ảnh" (mở camera) và nút "Chọn ảnh từ thư viện", preview ảnh sau khi chọn. Input: File ảnh từ camera hoặc thư viện. Lựa chọn cụ thể:
A. "Chụp ảnh"
B. "Chọn từ thư viện"
Logic xử lý: Kiểm tra định dạng (JPG/PNG/WEBP) và dung lượng (xem Phần 12). Output: userPhotoFile. Điều kiện chuyển màn: Ảnh hợp lệ → bấm "GHÉP AVATAR" → Screen 10.
Screen 10 - Ghép Avatar
Mục đích: Cho phép người chơi căn chỉnh ảnh khớp với khung Avatar Frame tân binh. UI: Vùng preview có Avatar Frame overlay cố định phía trên ảnh, thanh trượt Zoom, vùng ảnh kéo (drag) để Move, nút Reset. Input:
Zoom: slider (50%-200%).
Move: kéo thả ảnh (drag/pan) trong khung.
Reset: đưa ảnh về vị trí/zoom mặc định.
Lựa chọn cụ thể: Không có (thao tác trực tiếp, không phải chọn option). Logic xử lý: Tính toán vị trí/tỷ lệ crop cuối cùng của ảnh theo khung cố định (khung không di chuyển, chỉ ảnh di chuyển/zoom bên dưới khung). Output: croppedPhotoData (tọa độ crop + zoom level). Điều kiện chuyển màn: Bấm "XÁC NHẬN" → render ảnh preview cuối → Screen 11.
Screen 11 - Hoàn thành
Mục đích: Hiển thị Avatar hoàn chỉnh, cho phép tải về/chia sẻ, kết thúc trải nghiệm. UI: Ảnh Avatar cuối cùng (ảnh người dùng + khung), nút "TẢI VỀ", nút "CHIA SẺ", nút phụ "CHƠI LẠI". Input: Không có. Lựa chọn cụ thể:
A. "TẢI VỀ" → export file ảnh (PNG) về máy.
B. "CHIA SẺ" → mở Web Share API (nếu thiết bị hỗ trợ) hoặc fallback copy link/ảnh.
C. "CHƠI LẠI" → reset toàn bộ state, quay về Screen 1.
Logic xử lý: Export ảnh final (merge userPhoto + frame) thành 1 file PNG duy nhất, độ phân giải tối thiểu 1080x1080px. Output: finalAvatarImage (file PNG). Điều kiện chuyển màn: Đây là màn hình cuối flow; chỉ chuyển khi bấm "CHƠI LẠI".
5. QUESTIONNAIRE
A. Giấc ngủ
A1. "Một đêm bình thường, bạn ngủ được khoảng bao nhiêu tiếng (tính từ lúc nhắm mắt đến lúc dậy đi học/làm)?"
A. "Dưới 5 tiếng – ngủ 'chợp mắt' là chính" → 25
B. "5–6 tiếng – đủ để không gục giữa giờ" → 50
C. "7–8 tiếng – ngủ đúng chuẩn tân binh" → 100
D. "Trên 9 tiếng – ngủ nướng là sở trường" → 75
A2. "Bạn có hay ôm điện thoại, cày phim, lướt mạng đến sau 12h đêm mới chịu ngủ không?"
A. "Gần như đêm nào cũng vậy, ngủ trễ là chuyện thường" → 25
B. "Khoảng 3–4 đêm/tuần" → 50
C. "Thỉnh thoảng 1–2 đêm/tuần" → 75
D. "Hiếm khi, đến giờ là tắt máy đi ngủ" → 100
B. Dinh dưỡng
B1. "Một tuần bình thường, bữa ăn của bạn có rau xanh hoặc trái cây khoảng mấy lần?"
A. "Gần như không có rau, chủ yếu đạm và tinh bột" → 25
B. "2–3 lần/tuần, thỉnh thoảng ăn cho có" → 50
C. "4–6 lần/tuần, khá đều đặn" → 75
D. "Gần như bữa nào cũng có rau/trái cây" → 100
B2. "Đồ chiên rán, trà sữa, thức ăn nhanh, nước ngọt... bạn 'nạp' vào người mấy lần một tuần?"
A. "Gần như ngày nào cũng có mặt trong thực đơn" → 25
B. "Khoảng 3–4 lần/tuần" → 50
C. "1–2 lần/tuần, thỉnh thoảng thèm thì ăn" → 75
D. "Hiếm khi, ưu tiên đồ ăn lành mạnh" → 100
C. Uống nước
C1. "Một ngày bình thường, bạn uống khoảng mấy chai nước lọc loại 500ml?"
A. "Dưới 2 chai (dưới 1 lít) – nhớ ra mới uống" → 25
B. "2–3 chai (1–1.5 lít)" → 50
C. "3–5 chai (1.5–2.5 lít) – uống đều đặn cả ngày" → 100
D. "Trên 5 chai (trên 2.5 lít)" → 75
C2. "Trà sữa, cà phê, nước ngọt có 'thế chỗ' nước lọc trong ngày của bạn không?"
A. "Có, gần như thay hẳn nước lọc luôn" → 25
B. "Khá thường xuyên, ngày nào cũng có 1 ly" → 50
C. "Thỉnh thoảng, vài ngày mới uống 1 lần" → 75
D. "Hiếm khi, nước lọc vẫn là 'bạn thân'" → 100
D. Vận động
D1. "Một tuần, bạn vận động đổ mồ hôi thật sự (chạy bộ, gym, đá banh, nhảy, bơi...) khoảng mấy buổi?"
A. "Không buổi nào, đi từ giường ra bàn học/làm là chính" → 25
B. "1–2 buổi/tuần" → 50
C. "3–4 buổi/tuần, khá chăm" → 75
D. "5 buổi trở lên/tuần, chuẩn tinh thần rèn luyện" → 100
D2. "Ngoài giờ học/làm, bạn ngồi 'dính ghế' liên tục bao lâu mỗi ngày (học bài, làm việc, xem phim, chơi game...)?"
A. "Trên 8 tiếng, đứng dậy là chuyện hiếm" → 25
B. "5–8 tiếng" → 50
C. "3–5 tiếng, thỉnh thoảng đứng dậy đi lại" → 75
D. "Dưới 3 tiếng, hay đứng lên vận động" → 100
E. Tinh thần
E1. "Dạo này bạn thấy đầu óc mình 'căng như dây đàn' cỡ nào?"
A. "Cực kỳ căng thẳng, áp lực từ mọi phía" → 25
B. "Khá căng thẳng, hay stress" → 50
C. "Bình thường, đôi lúc căng nhưng vẫn ổn" → 75
D. "Khá thoải mái, tinh thần thư thái" → 100
E2. "Trong tuần, bạn có dành thời gian làm điều mình thích (nghe nhạc, chơi game, gặp bạn bè, đọc sách...) để 'xả hơi' không?"
A. "Hầu như không có thời gian cho bản thân" → 25
B. "1–2 lần/tuần" → 50
C. "3–4 lần/tuần" → 75
D. "Gần như ngày nào cũng có" → 100
6. PHYSICAL TEST
Thông tin cá nhân - quy định field
Field
Loại input
Range
Validation
Tuổi
number, bàn phím số
15-60 (số nguyên)
Bắt buộc, chỉ số nguyên, ngoài range → báo lỗi
Giới tính
button-select (2 option)
Nam / Nữ
Bắt buộc chọn 1
Chiều cao
number, đơn vị cm
100-230
Bắt buộc, chỉ số, ngoài range → báo lỗi
Cân nặng
number, đơn vị kg
30-200
Bắt buộc, chỉ số, ngoài range → báo lỗi, cho phép 1 số thập phân

Bài test: Gập thanh lò xo trong 20 giây
Field: Grip Count Input: Số lần gập trong 20 giây (number input, số nguyên, 0-100)
Bảng benchmark (ĐỀ XUẤT VẬN HÀNH - benchmark trải nghiệm cho trò chơi, không phải chuẩn y khoa):
Gender
Result range
Score
Nam (thanh 30kg)
0-5 lần
30
Nam (thanh 30kg)
6-10 lần
60
Nam (thanh 30kg)
11-15 lần
80
Nam (thanh 30kg)
16 lần trở lên
100
Nữ (thanh 20kg)
0-4 lần
30
Nữ (thanh 20kg)
5-8 lần
60
Nữ (thanh 20kg)
9-12 lần
80
Nữ (thanh 20kg)
13 lần trở lên
100


7. SCORING LOGIC
BMI
Công thức: BMI = weight (kg) / (height (m))²
height phải đổi từ cm sang m trước khi tính: height(m) = height(cm) / 100
Làm tròn: 1 chữ số thập phân
Bảng khoảng BMI và điểm quy đổi (ĐỀ XUẤT VẬN HÀNH — dùng ngưỡng BMI châu Á, chỉ mang tính tham khảo trải nghiệm, KHÔNG dùng để kết luận bệnh lý hay sức khỏe sinh sản):
Khoảng BMI
Phân loại hiển thị
BMI Score
< 18.5
Thiếu cân
50
18.5 – 22.9
Bình thường
100
23 – 24.9
Thừa cân
75
25 – 29.9
Béo phì độ I
50
≥ 30
Béo phì độ II
30

Physical Score
Physical Score = (BMI Score × 40%) + (Grip Score × 60%), làm tròn số nguyên gần nhất.
Total Score
Total Score =
  Physical Score  × 20%
+ Sleep Score      × 15%
+ Nutrition Score  × 15%
+ Hydration Score  × 10%
+ Exercise Score   × 20%
+ Mental Score     × 20%

Làm tròn số nguyên gần nhất. Thang điểm mỗi thành phần: 0-100. Total Score cũng nằm trong thang 0-100.
Ngưỡng xếp hạng tổng thể (overallTier)
Total Score
Xếp hạng tổng thể
≥ 75
"ĐIỂM KHỎE"
50 - 74
"ỔN ĐỊNH"
< 50
"ĐIỂM KHUYẾT"

Lưu ý: Đây là nhãn xếp hạng TỔNG THỂ dựa trên Total Score, khác với nhãn "Điểm Khỏe" / "Điểm Khuyết" gắn cho từng nhóm chỉ số ở Phần 8 - cả hai đều hiển thị song song trên Screen 6 nhưng có ý nghĩa khác nhau, cần chú thích rõ trên UI (ví dụ label phụ "Xếp hạng tổng thể" và "Nhóm nổi bật / Nhóm cần cải thiện").
8. ĐIỂM KHỎE / ĐIỂM KHUYẾT
Nguồn dữ liệu: 6 nhóm chỉ số – Physical, Sleep, Nutrition, Hydration, Exercise, Mental. Thứ tự danh sách cố định (dùng để tie-break): Physical → Sleep → Nutrition → Hydration → Exercise → Mental.
Cách chọn Điểm Khỏe (2 nhóm cao nhất): Sắp xếp 6 nhóm giảm dần theo điểm; nếu 2 nhóm bằng điểm nhau, nhóm đứng trước trong thứ tự danh sách cố định được ưu tiên xếp trên. Lấy 2 nhóm đầu tiên sau khi sắp xếp.
Cách chọn Điểm Khuyết (2 nhóm thấp nhất): Sắp xếp 6 nhóm tăng dần theo điểm; nếu 2 nhóm bằng điểm nhau, nhóm đứng sau trong thứ tự danh sách cố định được ưu tiên xếp trên (tức bị coi là điểm khuyết trước). Lấy 2 nhóm đầu tiên sau khi sắp xếp.
Một nhóm không được xuất hiện đồng thời ở cả Điểm Khỏe và Điểm Khuyết.
Output người dùng nhìn thấy (UI text cố định):
ĐIỂM KHỎE
✓ [Tên nhóm 1]
✓ [Tên nhóm 2]

ĐIỂM KHUYẾT
! [Tên nhóm 1]
! [Tên nhóm 2]

Tên nhóm hiển thị dùng đúng nhãn: "Thể lực", "Giấc ngủ", "Dinh dưỡng", "Uống nước", "Vận động", "Tinh thần".
9. SCREEN KẾT QUẢ - "HỒ SƠ TÂN BINH"
Cách visualize (CHỐT phương án): Stat cards + progress bar ngang cho từng nhóm. Không dùng radar chart (ưu tiên tốc độ render trên mobile và dễ đọc nhanh trong 3–5 phút).
Bố cục từ trên xuống:
Header: "HỒ SƠ TÂN BINH" + Total Score dạng số lớn + badge xếp hạng tổng thể ("ĐIỂM KHỎE" / "ỔN ĐỊNH" / "ĐIỂM KHUYẾT").
6 progress bar ngang, mỗi bar gồm: tên nhóm, điểm số (0–100), thanh progress theo %.
Thứ tự hiển thị cố định: Thể lực, Giấc ngủ, Dinh dưỡng, Uống nước, Vận động, Tinh thần.
2 khối card: "ĐIỂM KHỎE" (viền/màu xanh, icon ✓) và "ĐIỂM KHUYẾT" (viền/màu vàng cam, icon !), mỗi card liệt kê 2 nhóm tương ứng.
CTA "XEM MẬT MÃ KIẾN THỨC".
10. EDUCATIONAL CONTENT - MẬT MÃ KIẾN THỨC
Thẻ 1 - Giấc ngủ
Headline: "NGỦ ĐỦ - NỀN TẢNG SỨC KHỎE" Nội dung: Giấc ngủ đủ và đúng giờ giúp cơ thể phục hồi, cân bằng hormone và duy trì năng lượng ổn định. Đây là nền tảng cho một sức khỏe tổng thể bền vững, bao gồm cả sức khỏe sinh sản về lâu dài.
Thẻ 2 - Dinh dưỡng
Headline: "DINH DƯỠNG CÂN BẰNG - SINH LỰC BỀN VỮNG" Nội dung: Một chế độ ăn đủ chất, đúng bữa giúp cơ thể duy trì hoạt động ổn định. Dinh dưỡng cân bằng góp phần hỗ trợ sức khỏe tổng thể, trong đó có sức khỏe sinh sản.
Thẻ 3 - Uống nước
Headline: "UỐNG ĐỦ NƯỚC - CƠ THỂ VẬN HÀNH TRƠN TRU" Nội dung: Nước chiếm phần lớn cơ thể và tham gia hầu hết các quá trình chuyển hóa. Uống đủ nước mỗi ngày giúp cơ thể hoạt động hiệu quả và khỏe mạnh hơn.
Thẻ 4 - Vận động
Headline: "VẬN ĐỘNG ĐỀU ĐẶN – THỂ LỰC VỮNG VÀNG" Nội dung: Vận động thường xuyên giúp tăng cường tuần hoàn máu, sức bền và thể lực tổng thể. Một cơ thể vận động đều đặn là nền tảng cho sức khỏe toàn diện.
Thẻ 5 - Sức khỏe tinh thần
Headline: "TÂM LÝ VỮNG – CƠ THỂ KHỎE" Nội dung: Căng thẳng kéo dài có thể ảnh hưởng đến sự cân bằng chung của cơ thể. Giữ tinh thần thoải mái, có người để chia sẻ cũng quan trọng như rèn luyện thể chất.
Ghi chú bắt buộc: Toàn bộ nội dung trên mang tính giáo dục chung, KHÔNG chẩn đoán, KHÔNG kết luận cá nhân về khả năng sinh sản của người chơi.
11. AVATAR SPECIFICATION
Điều kiện unlock: knowledge Viewed = true (đã xem hết 5 thẻ ở Screen 7).
Avatar Frame: 1 khung ảnh PNG trong suốt theo concept tân binh, cố định vị trí, không thay đổi theo giới tính hay điểm số (tách biệt hoàn toàn khỏi kết quả sức khỏe).
Upload ảnh: người dùng chọn "Chụp ảnh" hoặc "Chọn từ thư viện". Định dạng hỗ trợ: JPG, PNG, WEBP.
Crop: vùng crop cố định theo tỷ lệ khung (1:1), người dùng không đổi được tỷ lệ, chỉ đổi phần ảnh hiển thị trong khung.
Zoom: slider 50%–200%, mặc định 100%.
Move: kéo thả ảnh trong vùng crop bằng thao tác chạm/kéo.
Reset: đưa zoom về 100% và vị trí ảnh về giữa khung.
Preview: hiển thị real-time ảnh + frame trong lúc chỉnh.
Confirm: chốt vị trí/zoom hiện tại, khóa chỉnh sửa, chuyển sang render ảnh cuối.
Export: merge ảnh người dùng (đã crop) với Avatar Frame thành 1 file PNG, độ phân giải tối thiểu 1080x1080px.
Output cuối: USER PHOTO + AVATAR FRAME = FINAL AVATAR (1 file PNG). Chức năng cuối: Download (lưu file về máy) và Share (Web Share API, fallback: copy ảnh/link). Không cần tài khoản, không cần login, không cần database lưu user. Toàn bộ dữ liệu chỉ tồn tại trong phiên (session/state), không lưu trữ lâu dài trên server.
12. VALIDATION & ERROR HANDLING
Trường hợp
Xử lý
Message hiển thị
Bỏ trống field (tuổi/chiều cao/cân nặng/grip count)
Chặn không cho bấm nút tiếp theo, viền field chuyển đỏ
"Vui lòng nhập đầy đủ thông tin."
Nhập chữ vào field số
Chặn ký tự không phải số ngay khi gõ (input filter)
"Chỉ được nhập số."
Chiều cao/cân nặng ngoài range hợp lệ
Chặn submit, highlight field
"Vui lòng nhập chiều cao từ 100–230cm." / "Vui lòng nhập cân nặng từ 30–200kg."
Tuổi ngoài range hợp lệ
Chặn submit, highlight field
"Vui lòng nhập tuổi từ 15–60."
Chưa chọn giới tính
Chặn submit
"Vui lòng chọn giới tính."
Chưa trả lời hết câu hỏi trong 1 bước lối sống
Disable nút "Tiếp theo"
"Vui lòng trả lời tất cả câu hỏi."
Upload file sai định dạng
Từ chối file, không hiển thị preview
"Định dạng ảnh không hỗ trợ. Vui lòng chọn file JPG, PNG hoặc WEBP."
Upload file quá lớn (> 10MB, ĐỀ XUẤT VẬN HÀNH)
Từ chối file
"Ảnh vượt quá dung lượng cho phép (tối đa 10MB)."
Không crop/xác nhận ảnh (bấm thẳng qua)
Nút "XÁC NHẬN" chỉ active khi đã có ảnh upload, dùng vị trí/zoom mặc định nếu người dùng không chỉnh
Không cần message, dùng giá trị mặc định
Refresh giữa flow
Mất toàn bộ state (do không dùng database), quay về Screen 1
"Phiên chơi đã được làm mới. Vui lòng bắt đầu lại."
User bấm Back (nút back trình duyệt/thiết bị)
Quay về màn hình trước đó trong flow, giữ nguyên dữ liệu đã nhập trong state hiện tại của phiên
Không cần message
User submit nhiều lần (bấm liên tục CTA)
Disable nút ngay sau lần bấm đầu tiên cho tới khi chuyển màn xong
Không cần message



14. DEVELOPER ACCEPTANCE CRITERIA
[ ] Toàn bộ 11 màn hình trong Phần 3 được implement đúng thứ tự flow.
[ ] BMI được tính đúng công thức, làm tròn 1 chữ số thập phân.
[ ] Grip Score được tra đúng bảng benchmark theo giới tính (Phần 6).
[ ] Physical Score = BMI Score × 40% + Grip Score × 60%, làm tròn số nguyên.
[ ] 5 nhóm lối sống hiển thị đúng nguyên văn câu hỏi và đúng số điểm từng option theo Phần 5.
[ ] Mỗi nhóm lối sống tính điểm trung bình đúng công thức, làm tròn số nguyên.
[ ] Total Score tính đúng công thức trọng số ở Phần 7, làm tròn số nguyên.
[ ] overallTier hiển thị đúng 1 trong 3 giá trị theo đúng ngưỡng Total Score.
[ ] Điểm Khỏe/Điểm Khuyết chọn đúng 2 nhóm cao nhất/thấp nhất, áp dụng đúng rule tie-break ở Phần 8.
[ ] Không có nhóm nào xuất hiện đồng thời ở cả Điểm Khỏe và Điểm Khuyết.
[ ] Screen 6 hiển thị đủ: Total Score, 6 progress bar theo đúng thứ tự cố định, 2 khối Điểm Khỏe/Điểm Khuyết.
[ ] 5 thẻ kiến thức hiển thị đúng nguyên văn headline + nội dung ở Phần 10, không thêm nội dung chẩn đoán.
[ ] Avatar Frame cố định, không đổi theo điểm số hoặc giới tính.
[ ] Upload ảnh chỉ chấp nhận JPG/PNG/WEBP, chặn file > 10MB.
[ ] Chức năng Crop/Zoom/Move/Reset hoạt động đúng, ảnh xuất ra đúng vị trí đã chỉnh.
[ ] Export ảnh cuối cùng tối thiểu 1080x1080px, merge đúng ảnh người dùng + frame.
[ ] Download và Share hoạt động trên thiết bị mobile.
[ ] Toàn bộ validation ở Phần 12 hiển thị đúng message quy định.
[ ] App không có bất kỳ liên kết dữ liệu, API, hoặc biến số nào kết nối với Card Battle Trạm 2.
[ ] App không sử dụng thuật ngữ "Fertility Score" hoặc "Reproductive Health Score" ở bất kỳ đâu trong UI hoặc code.
[ ] App không yêu cầu đăng nhập, không có màn hình tài khoản, không lưu dữ liệu người chơi vào database lâu dài.
[ ] Toàn bộ flow hoàn thành trong khoảng 3–5 phút khi test thực tế.

