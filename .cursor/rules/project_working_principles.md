# Nguyên tắc làm việc dự án Granblue Combo Wiki

Tài liệu này ghi lại các quy tắc và quy ước quan trọng đã được thiết lập trong quá trình phát triển dự án, nhằm đảm bảo tính nhất quán và hiệu quả.

## 1. Dữ liệu Chiêu Thức (Normal Moves)

### 1.1. Nguồn và Trích xuất Dữ liệu
-   Dữ liệu chi tiết về các đòn đánh thường (normal moves) được trích xuất từ cấu trúc HTML do người dùng cung cấp (ví dụ: file tương tự `src/components/character/common/Normal Move structure`).
-   **URL Hình ảnh:** Các URL hình ảnh trích xuất từ HTML (thường là đường dẫn tương đối) phải được chuyển thành URL tuyệt đối bằng cách thêm tiền tố `https://www.dustloop.com` vào trước.
-   **Thông tin "Stats for Nerds":** Các thông tin như "Level" và "Attribute" từ phần "Stats for Nerds" trong HTML cần được trích xuất và đưa vào trường `notes` của mỗi chiêu thức.

### 1.2. Cấu trúc file `normalMoves.js`
File dữ liệu cho normal moves (ví dụ: `src/data/characters/charlotta/normalMoves.js`) nên tuân theo cấu trúc sau cho mỗi chiêu thức:
```javascript
{
  id: "characterName_inputNormalized", // ví dụ: charlotta_cL
  name: "Tên đầy đủ của chiêu thức (ví dụ: Crouching Light (c.L))",
  input: "Ký hiệu input gốc (ví dụ: c.L)",
  imageTabs: [ // Mảng chứa thông tin cho các tab hình ảnh
    { 
      label: "Hình ảnh", // Nhãn cho tab ảnh thường
      urls: ["url_anh_thuong_1", /* ... */] 
    },
    { 
      label: "Hitbox",  // Nhãn cho tab ảnh hitbox
      urls: ["url_anh_hitbox_1", /* ... */] 
    }
  ],
  description: "Mô tả chiêu thức bằng tiếng Việt.",
  damage: "Sát thương",
  guard: "Cách chặn (Mid, Low, High, All)",
  startup: "Số frame startup (ví dụ: 5f)",
  active: "Số frame active (ví dụ: 3f)",
  recovery: "Số frame recovery (ví dụ: 6f)",
  onBlock: "Frame advantage/disadvantage khi bị chặn (ví dụ: +2f, -5f)",
  onHit: "Frame advantage/disadvantage khi trúng đòn (ví dụ: +6f, KD)",
  properties: [ // Mảng các chuỗi mô tả thuộc tính bằng tiếng Việt
    "Thuộc tính 1...",
    "Thuộc tính 2..."
  ],
  notes: "Ghi chú bổ sung bằng tiếng Việt (bao gồm cả thông tin từ 'Stats for Nerds')."
}
```

## 2. Dịch và Hiển thị Input Chiêu Thức

### 2.1. Quy tắc dịch Input
-   Việc dịch các ký hiệu input game đối kháng sang thao tác Keyboard và Controller phải tuân thủ theo file `data/translation_rules.md`.
-   `inputGuide` trong file dữ liệu chính của nhân vật (ví dụ: `src/data/characters/charlotta/charlotta.js`) phải được cập nhật để phản ánh tất cả các `input` có trong `normalMoves.js` và các chiêu thức khác.

### 2.2. Hiển thị Input trong Component
-   Trong component hiển thị chiêu thức (ví dụ: `NormalMove.js`):
    *   Input gốc của chiêu thức được hiển thị rõ ràng.
    *   Bên dưới input gốc, hiển thị riêng biệt:
        *   **Keyboard:** \[Thao tác bàn phím đã dịch] (Viết đầy đủ "Keyboard")
        *   **Controller:** \[Thao tác controller đã dịch] (Viết đầy đủ "Controller")
-   **Dịch Input trong Văn bản:**
    *   Các ký hiệu input (ví dụ: `2L`, `c.M`, `214X`) xuất hiện trong các đoạn văn bản (mô tả, thuộc tính, ghi chú) phải được tự động dịch và hiển thị kèm thông tin Keyboard/Controller.
    *   Khi hiển thị input đã dịch trong văn bản:
        *   Ký hiệu input gốc: Màu xám đậm (hoặc xám nhạt ở dark mode), font mono.
        *   Phần "Keyboard: \[phím]": Nhãn "Keyboard:" màu tím, phần phím màu tím nhạt hơn.
        *   Phần "Controller: \[phím]": Nhãn "Controller:" màu xanh lá, phần phím màu xanh lá nhạt hơn.
        *   Toàn bộ cụm dịch được đặt trong cặp dấu `()`.

## 3. Bố cục Component

### 3.1. Component `NormalMove.js`
-   Mỗi chiêu thức được hiển thị trong một card riêng.
-   Bố cục tổng thể của card chiêu thức được chia thành 2 cột chính (responsive):
    *   **Cột Trái (sm:w-1/4):** Chứa phần hiển thị hình ảnh với các tab "Hình ảnh" và "Hitbox".
    *   **Cột Phải (sm:w-3/4):** Chứa toàn bộ thông tin chi tiết còn lại, và cột này lại được chia thành 2 cột con:
        *   **Cột con Trái (md:w-2/5 của cột phải):**
            *   Tên chiêu thức
            *   Input gốc
            *   Input dịch (Keyboard, Controller)
            *   Mô tả chiêu thức
            *   Ghi chú (Notes)
        *   **Cột con Phải (md:w-3/5 của cột phải):**
            *   Bảng Frame Data
            *   Thuộc tính (Properties)
-   Toàn bộ mục "Normal Moves" có thể thu gọn/mở rộng.

## 4. Ngôn ngữ
-   Toàn bộ nội dung hiển thị cho người dùng trên website (mô tả chiêu thức, ghi chú, thuộc tính, nhãn tab, v.v.) phải được trình bày bằng **tiếng Việt**.

## 5. Quy trình làm việc chung
-   Luôn kiểm tra kỹ các yêu cầu và phản hồi của người dùng.
-   Khi có thay đổi về dữ liệu hoặc cấu trúc, cần cập nhật đồng bộ ở các file liên quan (ví dụ: `normalMoves.js`, `inputGuide` trong `charlotta.js`, component hiển thị).
-   Ưu tiên sự rõ ràng, chính xác và nhất quán.
