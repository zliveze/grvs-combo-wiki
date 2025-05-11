# Quy tắc dịch ký hiệu Combo Granblue Versus

Dưới đây là bảng quy tắc dịch các ký hiệu combo trong Granblue Versus sang nhập liệu Bàn phím và Controller, dựa trên cấu hình phím đã cung cấp.

**Lưu ý:** Các ký hiệu di chuyển số (1-9) dựa trên bàn phím số.

| Ký hiệu Game Đối kháng | Bàn phím (Cấu hình W,A,S,D + U,I,K,J) | Controller (Cấu hình X,Y,B,A + RB,RT,LB,LT) |
| :--------------------- | :------------------------------------ | :------------------------------------------ |
| `2` (xuống)            | `S`                                   | `Xuống`                                     |
| `3` (xuống-tiến)       | `S+D`                                 | `Xuống-Tiến`                                |
| `6` (tiến)             | `D`                                   | `Tiến`                                      |
| `4` (lùi)              | `A`                                   | `Lùi`                                       |
| `1` (xuống-lùi)        | `S+A`                                 | `Xuống-Lùi`                                 |
| `7` (lên-lùi)          | `W+A`                                 | `Lên-Lùi`                                   |
| `8` (lên)              | `W`                                   | `Lên`                                       |
| `9` (lên-tiến)         | `W+D`                                 | `Lên-Tiến`                                  |
| `5` (trung lập)        | `(Không di chuyển)`                   | `(Không di chuyển)`                         |
| `L` (Light)            | `U`                                   | `X`                                         |
| `M` (Medium)           | `I`                                   | `Y`                                         |
| `H` (Heavy)            | `K`                                   | `B`                                         |
| `U` (Unique)           | `J`                                   | `A`                                         |
| `S` (Skill Button)     | `P`                                   | `RB`                                        |
| `>`                    | `>`                                   | `>`                                         |
| `,`                    | `,`                                   | `,`                                         |
| `->/~`                 | `->/~`                                | `->/~`                                      |
| `c.`                   | `c.`                                  | `c.`                                        |
| `f.`                   | `f.`                                  | `f.`                                        |
| `j.`                   | `j.`                                  | `j.`                                        |
| `CH`                   | `CH`                                  | `CH`                                        |
| `[4]6X`                | `Giữ A (1s) hoặc S+A (1s) > D + U/I/K/J` | `Giữ Lùi (1s) hoặc Xuống-Lùi (1s) > Tiến + X/Y/B/A` |
| `[2]8X`                | `Giữ S (2s) hoặc S+A (2s) > W + U/I/K/J` | `Giữ Xuống (2s) hoặc Xuống-Lùi (2s) > Lên + X/Y/B/A` |
| `214X`                 | `S+A + U/I/K/J`                       | `Xuống-Lùi + X/Y/B/A`                       |
| `236X`                 | `S+D + U/I/K/J`                       | `Xuống-Tiến + X/Y/B/A`                      |
| `22X`                  | `S, S + U/I/K/J`                      | `Xuống, Xuống + X/Y/B/A`                    |
| `236S` (Easy SBA)      | `S+D + P`                             | `Xuống-Tiến + RB`                           |
| `236S+U` (Easy SSBA)   | `S+D + P + J`                         | `Xuống-Tiến + RB + A`                       |
| `236236H` (SBA)        | `S+D, S+D + K`                        | `Xuống-Tiến, Xuống-Tiến + B`                |
| `236236U` (SSBA)       | `S+D, S+D + J`                        | `Xuống-Tiến, Xuống-Tiến + A`                |
// Thêm các ký hiệu mới nếu chưa có hoặc cần làm rõ, dựa trên danh sách người dùng cung cấp
// Các ký hiệu như >, ,, c., f., j., CH, (whiff), dl., jc, CH, AA, IAS đã có.
// [X], ]X[, (move), [X] or [Y], [sequence] xN, (N) cũng đã có.
// ▷/land, hjc/sjc, dc/adc cần được xem xét thêm nếu cần dịch khác đi.
// Hiện tại, các ký hiệu này sẽ được giữ nguyên trong cột dịch nếu không có bản dịch cụ thể.
// Quy tắc "236 = Xuống tiến" và "214 = Xuống lùi" sẽ được áp dụng trong logic code,
// không nhất thiết phải thêm dòng riêng cho "236" và "214" ở đây nếu "236X" và "214X" đã phản ánh điều đó.
// Tuy nhiên, để rõ ràng, có thể thêm:
| `236` (motion)         | `S+D`                                 | `Xuống-Tiến`                                |
| `214` (motion)         | `S+A`                                 | `Xuống-Lùi`                                 |
| `22H~low`              | `S, S + K ~ (Không di chuyển)`        | `Xuống, Xuống + B ~ (Không di chuyển)`      |
| `22H~H`                | `S, S + K ~ K`                        | `Xuống, Xuống + B ~ B`                      |
| `(whiff)`              | `(đánh trượt)`                        | `(đánh trượt)`                              |
| `(XX)`                 | `(XX)`                                | `(XX)`                                      |
| `run forward`          | `Chạy tới (nhấn giữ D)`               | `Chạy tới (nhấn giữ cần analog trái về phía trước)` |
| `dl.`                  | `Trì hoãn`                            | `Trì hoãn`                                  |
| `jc`                   | `Nhảy Hủy`                            | `Nhảy Hủy`                                  |
| `hjc/sjc`              | `Nhảy Cao Hủy/Siêu Nhảy Hủy`          | `Nhảy Cao Hủy/Siêu Nhảy Hủy`                |
| `dc/adc`               | `Dash Hủy/Air Dash Hủy`              | `Dash Hủy/Air Dash Hủy`                     |
| `AA`                   | `Chống nhảy`                          | `Chống nhảy`                                |
| `IAS`                  | `Kỹ năng Đặc biệt Trên Không Tức thời` | `Kỹ năng Đặc biệt Trên Không Tức thời`      |
| `[X]`                  | `[X]`                                 | `[X]`                                       |
| `]X[`                  | `]X[`                                 | `]X[`                                       |
| `(move)`               | `(đòn đánh tùy chọn)`                 | `(đòn đánh tùy chọn)`                       |
| `[X] or [Y]`           | `[X] hoặc [Y]`                        | `[X] hoặc [Y]`                              |
| `[sequence] xN`        | `[chuỗi động tác] xN`                 | `[chuỗi động tác] xN`                       |
| `(N)`                  | `(N)`                                 | `(N)`                                       |
