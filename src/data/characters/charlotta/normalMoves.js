const normalMoves = [
  {
    id: "charlotta_cL",
    name: "Crouching Light (c.L)",
    input: "c.L",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/a/ad/GBVS_Charlotta_cL.png/210px-GBVS_Charlotta_cL.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/f/fe/GBVS_Charlotta_cL_Hitbox.png/210px-GBVS_Charlotta_cL_Hitbox.png"] }
    ],
    description: "Đòn đánh nhanh nhất của Charlotta và là công cụ gây áp lực tiêu chuẩn.",
    damage: "400", guard: "Mid", startup: "5f", active: "3f", recovery: "6f", onBlock: "+2f", onHit: "+6f",
    properties: ["Combo và frame-trap vào chính nó, 2L, f.L, và c.M."],
    notes: "Thông số chi tiết: Level 0." // Thêm từ Stats for Nerds
  },
  {
    id: "charlotta_cM",
    name: "Crouching Medium (c.M)",
    input: "c.M",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/e/e8/GBVS_Charlotta_cM.png/210px-GBVS_Charlotta_cM.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/0/00/GBVS_Charlotta_cM_Hitbox1.png/206px-GBVS_Charlotta_cM_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/1/19/GBVS_Charlotta_cM_Hitbox2.png/210px-GBVS_Charlotta_cM_Hitbox2.png"] }
    ],
    description: "Tốt để giữ bản thân ở gần đối thủ vì đây là đòn đánh lao tới và có phạm vi kích hoạt lớn. Nhược điểm thực sự duy nhất là -4 khi bị chặn nên không được khuyến khích để reset áp lực.",
    damage: "700", guard: "Mid", startup: "6f", active: "3f", recovery: "16f", onBlock: "-4f", onHit: "0f",
    properties: [
      "Nhanh như 2L hoặc f.L của cô ấy.",
      "Lao tới, vì vậy Charlotta có thể thực hiện hai đòn light khi trúng hoặc bị chặn với quán tính chạy và vẫn kết nối được c.M sau đó, cho phép cô tiếp tục áp lực ở cự ly gần và theo sau bằng Sword of Lumiel 214X."
    ],
    notes: "Thông số chi tiết: Level 2."
  },
  {
    id: "charlotta_cH",
    name: "Crouching Heavy (c.H)",
    input: "c.H",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/8/8e/GBVS_Charlotta_cH.png/210px-GBVS_Charlotta_cH.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/5/5f/GBVS_Charlotta_cH_Hitbox1.png/210px-GBVS_Charlotta_cH_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/e/e7/GBVS_Charlotta_cH_Hitbox2.png/210px-GBVS_Charlotta_cH_Hitbox2.png", "https://www.dustloop.com/wiki/images/thumb/9/9c/GBVS_Charlotta_cH_Hitbox3.png/210px-GBVS_Charlotta_cH_Hitbox3.png"] }
    ],
    description: "Đòn bắt đầu combo trừng phạt trên mặt đất gây sát thương cao nhất của cô.",
    damage: "1200", guard: "Mid", startup: "9f", active: "6f", recovery: "15f", onBlock: "-2f", onHit: "+2f",
    properties: [
      "Đòn anti-air tình huống do nhanh hơn 2H. Tuy nhiên, hitbox không mở rộng ra sau lưng cô, nghĩa là nó có xu hướng đánh trượt các cú nhảy cross-up.",
      "Active trong 6 frame có nghĩa là nó có thể trở nên lợi frame nếu đánh meaty."
    ],
    notes: "Thông số chi tiết: Level 4."
  },
  {
    id: "charlotta_auto_xx",
    name: "Auto Combo 2nd Hit (c.XX)",
    input: "c.XX",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/2/27/GBVS_Charlotta_cXX.png/210px-GBVS_Charlotta_cXX.png"] },
      { label: "Hitbox", urls: [] }
    ],
    description: "Autocombo tiêu chuẩn, thường dùng để cho bạn thời gian xác nhận trúng đòn hoặc chỉ đơn giản là làm đầy combo.",
    damage: "350", guard: "Mid", startup: "9f", active: "3f", recovery: "15f", onBlock: "-3f", onHit: "+1f",
    properties: [],
    notes: "Giúp charge Shining Onslaught [4]6X hoặc Holy Ladder [2]8X. Thông số chi tiết (c.XX): Level 2."
  },
  {
    id: "charlotta_auto_xxx",
    name: "Auto Combo 3rd Hit (c.XXX)",
    input: "c.XXX",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/2/27/GBVS_Charlotta_cXXX.png/210px-GBVS_Charlotta_cXXX.png"] },
      { label: "Hitbox", urls: [] }
    ],
    description: "Autocombo tiêu chuẩn, thường dùng để cho bạn thời gian xác nhận trúng đòn hoặc chỉ đơn giản là làm đầy combo.",
    damage: "350", guard: "Mid", startup: "12f", active: "3f", recovery: "18f", onBlock: "-4f", onHit: "0f",
    properties: [
        "Có thể được sử dụng để đẩy góc, đặc biệt khi kết hợp với Sword of Lumiel 214X.",
        "Thỉnh thoảng được sử dụng sau khi đánh trúng các đòn normal gần ở tầm tối đa để đảm bảo bạn đủ gần đối thủ sao cho 214H > f.M vẫn kết nối."
    ],
    notes: "Thông số chi tiết (c.XXX): Level 3."
  },
  {
    id: "charlotta_fL",
    name: "Far Light (f.L)",
    input: "f.L",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/4/49/GBVS_Charlotta_fL.png/210px-GBVS_Charlotta_fL.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/5/5f/GBVS_Charlotta_fL_Hitbox.png/210px-GBVS_Charlotta_fL_Hitbox.png"] }
    ],
    description: "Một đòn light tầm xa tiêu chuẩn. Công dụng chính là xác nhận sau khi đánh trúng đối thủ bằng một hoặc hai đòn 2L, và đôi khi dùng để trừng phạt khi f.M quá chậm.",
    damage: "400", guard: "Mid", startup: "6f", active: "3f", recovery: "15f", onBlock: "-5f", onHit: "-1f",
    properties: ["Combo vào từ 214M đối với đối thủ đang ngồi."],
    notes: "Thông số chi tiết: Level 1."
  },
  {
    id: "charlotta_fM",
    name: "Far Medium (f.M)",
    input: "f.M",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/b/b8/GBVS_Charlotta_fM.png/210px-GBVS_Charlotta_fM.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/0/07/GBVS_Charlotta_fM_Hitbox.png/210px-GBVS_Charlotta_fM_Hitbox.png"] }
    ],
    description: "Một đòn normal tầm xa mạnh mẽ nhờ vào startup nhanh và tầm với tốt.",
    damage: "700", guard: "Mid", startup: "7f", active: "3f", recovery: "18f", onBlock: "-6f", onHit: "-2f",
    properties: [
      "Công cụ nối combo chính của bạn trong nhiều tình huống như sau 214H, hoặc các cú wallbounce tầm xa.",
      "Hữu ích để duy trì áp lực và buộc đối thủ phải tôn trọng sau khi 214M bị chặn.",
      "Combo vào từ 2L đối với đối thủ đang ngồi."
    ],
    notes: "Chú thích ảnh: Nó vĩnh cửu, nó giữ cho Sky Realm sạch sẽ. Thông số chi tiết: Level 2."
  },
  {
    id: "charlotta_fH",
    name: "Far Heavy (f.H)",
    input: "f.H",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/d/de/GBVS_Charlotta_fH.png/210px-GBVS_Charlotta_fH.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/3/38/GBVS_Charlotta_fH_Hitbox1.png/210px-GBVS_Charlotta_fH_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/9/9f/GBVS_Charlotta_fH_Hitbox2.png/210px-GBVS_Charlotta_fH_Hitbox2.png"] }
    ],
    description: "Một trong những đòn normal tầm xa nhất trong game. Mặc dù có startup dài, nó cần được sử dụng một cách tiết kiệm. Mục đích chính là để phản công các đòn đánh chậm hơn hoặc khi đối thủ đánh giá sai tầm của bạn và trở nên quá thoải mái ở khoảng cách xa.",
    damage: "1300", guard: "Mid", startup: "24f", active: "6f", recovery: "18f", onBlock: "-5f", onHit: "-1f",
    properties: ["Có Cấp độ Clash cao hơn hầu hết các đòn f.H khác, nghĩa là nó sẽ phá tan chúng thay vì clash, điều này hữu ích trong việc sử dụng nó như một đòn phản công poke."],
    notes: "Thông số chi tiết: Level 4."
  },
  {
    id: "charlotta_2L_alt",
    name: "Down Light (2L)",
    input: "2L",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/1/13/GBVS_Charlotta_2L.png/210px-GBVS_Charlotta_2L.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/b/b5/GBVS_Charlotta_2L_Hitbox.png/210px-GBVS_Charlotta_2L_Hitbox.png"] }
    ],
    description: "2L là lựa chọn đánh thấp truyền thống của Charlotta. Nó có tầm với tốt đối với một đòn 2L, và nhờ vào tầm của c.M, nó được sử dụng nhiều trong lối chơi áp lực của cô.",
    damage: "400", guard: "Low", startup: "6f", active: "3f", recovery: "6f", onBlock: "+2f", onHit: "+6f",
    properties: ["Combo vào f.L và c.M khi đánh trúng đối thủ đứng, f.M khi đánh trúng đối thủ ngồi."],
    notes: "Đây là 2L theo mục riêng trong HTML, khác với c.L. Thông số chi tiết: Level 0."
  },
  {
    id: "charlotta_2M_alt",
    name: "Down Medium (2M)",
    input: "2M",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/e/e2/GBVS_Charlotta_2M.png/210px-GBVS_Charlotta_2M.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/6/6b/GBVS_Charlotta_2M_Hitbox1.png/210px-GBVS_Charlotta_2M_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/9/9b/GBVS_Charlotta_2M_Hitbox2.png/210px-GBVS_Charlotta_2M_Hitbox2.png"] }
    ],
    description: "2M chậm hơn một chút so với f.M của cô, nhưng vì đây là một đòn normal lao tới, rất active và tệ nhất là -2 khi bị chặn, nó có thể là một công cụ gây áp lực tốt.",
    damage: "700", guard: "Mid", startup: "9f", active: "5f", recovery: "15f", onBlock: "-2f", onHit: "+2f",
    properties: ["Combo vào f.L và c.M khi counter hit đối thủ đứng, và f.M khi counter hit đối thủ ngồi."],
    notes: "Đây là 2M theo mục riêng trong HTML, khác với c.M. Thông số chi tiết: Level 2."
  },
  {
    id: "charlotta_2H_alt",
    name: "Down Heavy (2H)",
    input: "2H",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/4/46/GBVS_Charlotta_2H.png/210px-GBVS_Charlotta_2H.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/5/5a/GBVS_Charlotta_2H_Hitbox1.png/210px-GBVS_Charlotta_2H_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/1/1f/GBVS_Charlotta_2H_Hitbox2.png/210px-GBVS_Charlotta_2H_Hitbox2.png"] }
    ],
    description: "Một đòn anti-air chậm, thỉnh thoảng được sử dụng nếu bạn đã sẵn sàng cho cú nhảy của đối thủ hoặc nếu Holy Ladder [2]8X của bạn đang cooldown. Tầm với hơi ra sau đầu cô ấy, không giống như c.H. Có thể dùng để bắt các đòn đánh bị lộ frame khi f.H quá chậm. Gây nhiều sát thương hơn và đưa Charlotta lao tới một chút khi được charge.",
    damage: "1000 [1200]", guard: "Mid", startup: "14f [27f]", active: "6f", recovery: "24f", onBlock: "-10f [-8f]", onHit: "-6f [-4f]",
    properties: [],
    notes: "Đây là 2H theo mục riêng trong HTML, khác với c.H. Thông số chi tiết: Level 3 [4]."
  },
  {
    id: "charlotta_2U",
    name: "Down Unique (2U)",
    input: "2U",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/0/04/GBVS_Charlotta_2U.png/210px-GBVS_Charlotta_2U.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/8/81/GBVS_Charlotta_2U_Hitbox.png/210px-GBVS_Charlotta_2U_Hitbox.png"] }
    ],
    description: "2U là một cú quét chân lao tới gây hard knockdown. Nó không an toàn khi bị chặn nên hãy chắc chắn bạn special cancel nếu đối thủ chặn được. Một cách cancel dễ dàng là 214H vì nó sẽ combo nếu cú quét trúng, và để bạn lợi frame nếu bị chặn, cho phép bạn kéo dài áp lực.",
    damage: "700", guard: "Low", startup: "9f", active: "6f", recovery: "18f", onBlock: "-9f", onHit: "HKD",
    properties: [
        "Đòn đánh thấp có tầm xa nhất của cô.",
        "Tốt để nhặt các cú wallbounce từ xa hơn vì nó đưa bạn lại gần đối thủ hơn không giống như f.M, điều này cần thiết nếu bạn đang cố gắng kết thúc combo bằng Holy Ladder [2]8X."
    ],
    notes: "Thông số chi tiết: Level 2."
  },
  {
    id: "charlotta_jL",
    name: "Jumping Light (j.L)",
    input: "j.L",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/f/f8/GBVS_Charlotta_jL.png/210px-GBVS_Charlotta_jL.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/1/14/GBVS_Charlotta_jL_Hitbox.png/210px-GBVS_Charlotta_jL_Hitbox.png"] }
    ],
    description: "Một đòn jump light bình thường.",
    damage: "400", guard: "High/Air", startup: "5f", active: "Until L", recovery: "0f", onBlock: "", onHit: "",
    properties: [],
    notes: "Thông số chi tiết: Level 1."
  },
  {
    id: "charlotta_jM",
    name: "Jumping Medium (j.M)",
    input: "j.M",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/d/d1/GBVS_Charlotta_jM.png/181px-GBVS_Charlotta_jM.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/0/06/GBVS_Charlotta_jM_Hitbox.png/200px-GBVS_Charlotta_jM_Hitbox.png"] }
    ],
    description: "Đòn jump normal cross-up quen thuộc của Charlotta. Vì quỹ đạo nhảy của cô rất phù hợp cho cross-up, đây là một công cụ giá trị trong bộ kỹ năng của cô.",
    damage: "550", guard: "High/Air", startup: "6f", active: "3f", recovery: "Until L", onBlock: "", onHit: "",
    properties: ["Có thể cross-up"],
    notes: "Chú thích ảnh: Góc của tôi rồi. Thông số chi tiết: Level 1."
  },
  {
    id: "charlotta_jH",
    name: "Jumping Heavy (j.H)",
    input: "j.H",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/8/8b/GBVS_Charlotta_jH.png/210px-GBVS_Charlotta_jH.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/b/b5/GBVS_Charlotta_jH_Hitbox1.png/210px-GBVS_Charlotta_jH_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/8/88/GBVS_Charlotta_jH_Hitbox2.png/210px-GBVS_Charlotta_jH_Hitbox2.png"] }
    ],
    description: "Đòn jump normal chủ đạo của Charlotta. Có tầm với và tốc độ tốt.",
    damage: "800", guard: "High/Air", startup: "8f", active: "6f", recovery: "", onBlock: "", onHit: "",
    properties: [],
    notes: "Thông số chi tiết: Level 2."
  },
  {
    id: "charlotta_jU",
    name: "Jumping Unique (j.U)",
    input: "j.U",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/e/e8/GBVS_Charlotta_jU.png/210px-GBVS_Charlotta_jU.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/9/9d/GBVS_Charlotta_jU_Hitbox1.png/210px-GBVS_Charlotta_jU_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/d/dc/GBVS_Charlotta_jU_Hitbox2.png/210px-GBVS_Charlotta_jU_Hitbox2.png"] }
    ],
    description: "Chém chéo lên trên Charlotta, làm cho đây trở thành một công cụ air-to-air hữu ích. Đòn này có thể đánh trúng đối thủ đứng một lần, nhưng sẽ đánh trượt tất cả các đối thủ đang ngồi. Các nhân vật cao trong game có thể bị trúng hai lần khi đứng, đây là một lựa chọn double overhead mạnh mẽ có thể bắt bài đối thủ, nhưng nhìn chung khó để thực hiện đúng cách mà không có knockdown/setup.",
    damage: "300,700", guard: "High/Air", startup: "6f", active: "3(4)3", recovery: "Until L", onBlock: "", onHit: "",
    properties: ["Thay đổi quỹ đạo nhảy"],
    notes: "Thông số chi tiết: Level 2."
  }
];

export default normalMoves;
