const specialMoves = [
  {
    id: "charlotta_shining_onslaught",
    name: "Shining Onslaught",
    inputTechnical: "[4]6X",
    inputEasy: "6S",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/0/06/GBVS_Charlotta_46X.png/210px-GBVS_Charlotta_46X.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/9/90/GBVS_Charlotta_46X_Hitbox.png/210px-GBVS_Charlotta_46X_Hitbox.png"] }
    ],
    description: "Một chiêu charge lao tới nhanh, bật lại đối thủ khi trúng hoặc bị chặn. Chiêu special cancel chủ đạo của Charlotta để xác nhận trúng đòn từ các cú poke. Do tính chất nhanh của Shining Onslaught, đối thủ của bạn sẽ buộc phải chơi xung quanh nó, nghĩa là họ sẽ chơi chậm lại, giữ khoảng cách an toàn để phản ứng, hoặc mạo hiểm bị trúng chiêu. Tuy nhiên, khi chiêu này cooldown, mối đe dọa đó biến mất và Charlotta mất khả năng xác nhận hầu hết các cú poke mà không tốn meter, khiến lối chơi neutral của cô kém nguy hiểm hơn nhiều. Ngoài ra, rất nhanh khi đánh trượt.",
    notes: "Cần 30 frame để charge. Thông số chi tiết (Cooldown L/M - Technical: 20F, Easy: 200F. Cooldown H - Technical: 480F, Easy: 600F).",
    versions: [
      {
        id_suffix: "L",
        name_suffix: "(Light)",
        input: "[4]6L",
        damage: "1000", guard: "Mid", startup: "11f", active: "16f", recovery: "8f", onBlock: "-4f", onHit: "0f",
        description: "Di chuyển quãng ngắn. An toàn khi bị chặn. Để lại đối thủ đứng yên khi trúng đòn.",
        properties: ["+4 khi counter hit (counter hit khi đối thủ ngồi sẽ combo vào c.L ở góc).", "Không bật cao như hai phiên bản kia sau khi trúng đối thủ, nghĩa là nó tránh được Air Mehen của Cagliostro."],
        notes: "0 khi trúng đòn, nhưng vì bạn thường sẵn sàng hơn đối thủ, nên thường vẫn là lượt của bạn sau đó. Clash Level 1. Recovery 20F khi trúng/bị chặn."
      },
      {
        id_suffix: "M",
        name_suffix: "(Medium)",
        input: "[4]6M",
        damage: "1400", guard: "Mid", startup: "15f", active: "16f", recovery: "8f", onBlock: "-10f", onHit: "KD",
        description: "Di chuyển quãng dài, nhưng startup chậm hơn. Gây knockdown khi trúng, và wallbounce khi counter hit.",
        properties: ["Có thể bị trừng phạt khi bị chặn bởi hầu hết các nhân vật. Một số luôn có thể trừng phạt, với những người khác thì tùy thuộc vào khoảng cách, trong khi một số ít không thể trừng phạt trừ khi họ chặn nó ở góc."],
        notes: "Clash Level 3. Recovery 28F khi trúng/bị chặn."
      },
      {
        id_suffix: "H",
        name_suffix: "(Heavy)",
        input: "[4]6H",
        damage: "1200", guard: "Mid", startup: "11f", active: "16f", recovery: "8f", onBlock: "-4f", onHit: "HKD",
        description: "Di chuyển quãng dài. An toàn khi bị chặn. Gây hard knockdown và wallbounce.",
        properties: ["Xác nhận từ tất cả các cú poke của bạn ở hầu hết các tầm."],
        notes: "Phiên bản bạn thường muốn xác nhận vào, vì trúng nó có nghĩa là bạn đã áp sát và có thể bắt đầu gây áp lực lên đối thủ ở cự ly gần. Clash Level 2. Recovery 25F khi trúng/bị chặn."
      }
    ]
  },
  {
    id: "charlotta_holy_ladder",
    name: "Holy Ladder",
    inputTechnical: "[2]8X",
    inputEasy: "5S",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/8/8c/GBVS_Charlotta_28X.png/210px-GBVS_Charlotta_28X.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/2/2e/GBVS_Charlotta_28X_Hitbox1.png/135px-GBVS_Charlotta_28X_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/7/77/GBVS_Charlotta_28X_Hitbox2.png/150px-GBVS_Charlotta_28X_Hitbox2.png", "https://www.dustloop.com/wiki/images/thumb/a/aa/GBVS_Charlotta_28X_Hitbox3.png/210px-GBVS_Charlotta_28X_Hitbox3.png"] }
    ],
    description: "Chiêu reversal bất tử của Charlotta và là một chiêu charge khác trong bộ kỹ năng của cô. Một đòn tấn công bay lên rồi lao xuống với một đòn tấn công khác. Với 11 frame startup, đây là một trong số ít các chiêu reversal chậm hơn trong game, nhưng mặt tích cực là nó khó bị trừng phạt hơn hầu hết các chiêu khác vì nó đẩy đối thủ ra xa và chỉ -7 hoặc -8 nếu bị chặn ngồi (cao hơn nếu bị chặn đứng), nghĩa là hình phạt cho việc sử dụng nó khi bị chặn thường thấp hơn mức trung bình. Các đòn trừng phạt lớn hơn có thể thực hiện được, tuy nhiên dễ bị lỗi hơn.",
    notes: "Thông số chi tiết (Cooldown L/M - Technical: 20F, Easy: 200F. Cooldown H - Technical: 480F, Easy: 600F). Tất cả các phiên bản đều có Level 4.",
    versions: [
      {
        id_suffix: "L", name_suffix: "(Light)", input: "[2]8L", damage: "500,600", guard: "Mid,All", startup: "11f", active: "4(12)7f", recovery: "23f", onBlock: "-8~-11f", onHit: "KD", invuln: "1-10f All",
        properties: ["Lựa chọn anti-air tốt. Input dễ có thể được sử dụng để anti-air theo phản xạ khi bạn chưa charge trước đó.", "Kết thúc combo tốt."]
      },
      {
        id_suffix: "M", name_suffix: "(Medium)", input: "[2]8M", damage: "800,600", guard: "Mid,All", startup: "11f", active: "8(16)11f", recovery: "23f", onBlock: "-7~-9f", onHit: "KD", invuln: "1-10f All",
        properties: ["Lựa chọn anti-air tốt.", "Kết thúc combo tốt."]
      },
      {
        id_suffix: "H", name_suffix: "(Heavy)", input: "[2]8H", damage: "100x8,600", guard: "Mid", startup: "11f", active: "1x8(12)9f", recovery: "23f", onBlock: "-7~-9f", onHit: "HKD", invuln: "1-18f All",
        properties: ["Lựa chọn anti-air tốt.", "Kết thúc combo tốt. Đặc biệt là [2]8H vì mất một lúc để hoàn thành, cho phép cooldown của bạn hồi lại. Nó cũng dẫn đến các cú safejump dễ dàng sau đó để duy trì thế công.", "Input kỹ thuật hất tung đối thủ ít hơn, nghĩa là trúng [2]8H cho phép safejump cross-up, làm cho nó rất mạnh khi trúng chiêu này trong khi bạn bị ép góc."]
      }
    ]
  },
  {
    id: "charlotta_sword_of_lumiel",
    name: "Sword of Lumiel",
    inputTechnical: "214X",
    inputEasy: "4S",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/6/6a/GBVS_Charlotta_214X.png/210px-GBVS_Charlotta_214X.png"] },
      { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/8/88/GBVS_Charlotta_214X_Hitbox1.png/210px-GBVS_Charlotta_214X_Hitbox1.png", "https://www.dustloop.com/wiki/images/thumb/1/12/GBVS_Charlotta_214X_Hitbox2.png/210px-GBVS_Charlotta_214X_Hitbox2.png"] }
    ],
    description: "Tung ra các nhát chém liên tiếp trong khi di chuyển nhẹ về phía trước. An toàn khi bị chặn và giữ bạn ở gần đối thủ. Công cụ combo và gây áp lực tốt. Cũng gây chip damage tốt.",
    notes: "Thông số chi tiết (Cooldown L/M - Technical: 20F, Easy: 200F. Cooldown H - Technical: 480F, Easy: 600F). Tất cả các phiên bản đều có Level 2.",
    versions: [
      {
        id_suffix: "L", name_suffix: "(Light)", input: "214L", damage: "200x2,400", guard: "Mid", startup: "7f", active: "2(8)2(8)2f", recovery: "15f", onBlock: "-2f", onHit: "+2f",
        description: "Đánh 3 lần. Hơi trừ frame khi bị chặn.",
        properties: ["Để Charlotta khá gần đối thủ, thường đủ gần để thực hiện c.M. Không dẫn đến nhiều lợi thế ngay cả khi trúng và không được sử dụng nhiều nói chung nhưng có thể gây bất ngờ cho đối thủ không sẵn sàng, đặc biệt là những người có đòn normal chậm hơn mức trung bình như Ferry hoặc Metera."]
      },
      {
        id_suffix: "M", name_suffix: "(Medium)", input: "214M", damage: "200x5", guard: "Mid", startup: "18f", active: "42f", recovery: "12f", onBlock: "+1f", onHit: "+5f",
        description: "Đánh 5 lần. Khi đánh trượt, chiêu thức hủy sau 3 nhát chém. Lợi frame khi bị chặn.",
        properties: ["Có thể bị ngắt do startup dài hơn. Nếu đối thủ spotdodge, bạn sẽ mất lượt. Khi bị chặn, để Charlotta ở xa đối thủ hơn nhiều. Sử dụng f.M sau khi bị chặn là một cách tốt để buộc đối thủ phải tôn trọng lợi thế frame của bạn. Combo vào f.L khi trúng đối thủ ngồi."]
      },
      {
        id_suffix: "H", name_suffix: "(Heavy)", input: "214H", damage: "200x5", guard: "Mid", startup: "13f", active: "2(8)2(8)2(8)2(8)2f", recovery: "9f", onBlock: "+4f", onHit: "+8f",
        description: "Đánh 5 lần. Lợi frame nhiều hơn khi bị chặn.",
        properties: ["Startup nhanh hơn 214M. Combo vào f.M khi trúng và 2U khi trúng đối thủ ngồi để gây hard knockdown."]
      }
    ]
  },
  {
    id: "charlotta_noble_strategy",
    name: "Noble Strategy",
    inputTechnical: "22X",
    inputEasy: "2S",
    imageTabs: [
      { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/c/cd/GBVS_Charlotta_22X.png/184px-GBVS_Charlotta_22X.png"] },
      { label: "Hitbox", urls: [] } // HTML không có hitbox chung cho 22X
    ],
    description: "Công cụ di chuyển và gây áp lực. Có thể theo sau bằng nhiều hành động bổ sung khác nhau. Tuyệt vời để thu hẹp khoảng cách, gọi ra fireball, hoặc reset áp lực từ xa, nhưng rất dễ bị anti-air. Nếu bạn không thể anti-air kịp thời, thường nên chặn thấp vì phần thưởng cô ấy nhận được từ follow-up overhead thấp hơn đáng kể so với khi cô ấy bắt bạn đứng.",
    notes: "Thông số chi tiết (Cooldown L/M - Technical: 20F, Easy: 200F. Cooldown H - Technical: 480F, Easy: 600F). Startup chung: 26f.",
    versions: [
      { id_suffix: "L", name_suffix: "(Light - [22L])", input: "22L", description: "Nhảy lên theo một vòng cung nhọn, trong hầu hết các trường hợp không cross-up.", properties: ["Cẩn thận với các follow-up, vì chúng có thể đánh cao hơn so với các cú nhảy khác, nghĩa là bạn sẽ bị trừ frame nhiều hơn."] },
      { id_suffix: "M", name_suffix: "(Medium - [22M])", input: "22M", description: "Nhảy xa hơn và theo một vòng cung thấp hơn. Sẽ cross-up nếu thực hiện gần đối thủ.", properties: ["Thường được sử dụng nhiều hơn 22L."] },
      { id_suffix: "H", name_suffix: "(Heavy - [22H])", input: "22H", description: "Nhảy nhanh hơn nhiều và ở cùng độ cao với 22M.", properties: [] }
    ],
    followUps: [
      {
        id: "charlotta_noble_strategy_surest_strike",
        name: "With Surest Strike! (Noble Strategy > No Input)",
        input: "22X > 5", // Giả định 5 là không input sau 22X
        imageTabs: [
            { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/3/3a/GBVS_Charlotta_22X-5.png/210px-GBVS_Charlotta_22X-5.png"] },
            { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/a/af/GBVS_Charlotta_22X_Hitbox.png/210px-GBVS_Charlotta_22X_Hitbox.png"] }
        ],
        description: "Follow-up chém đánh thấp. Thường trừ frame, nhưng nhờ vào active frame cực dài, đánh meaty chiêu này có thể để bạn lợi frame rất nhiều.",
        damage: "1200", guard: "Low", startup: "7f (sau khi đáp)", active: "", recovery: "", onBlock: "-4f", onHit: "KD",
        properties: ["22H vào chiêu này cho phép combo sau đó ở góc, và tình huống ở giữa màn hình."],
        notes: "Thông số chi tiết: Level 4."
      },
      {
        id: "charlotta_noble_strategy_flying_nobility",
        name: "With Flying Nobility! (Noble Strategy > L)",
        input: "22X > L",
        imageTabs: [
            { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/8/83/GBVS_Charlotta_22X-L.png/187px-GBVS_Charlotta_22X-L.png"] },
            { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/e/e4/GBVS_Charlotta_22XL_Hitbox.png/187px-GBVS_Charlotta_22XL_Hitbox.png"] }
        ],
        description: "Follow-up bổ nhào từ trên không. Dùng để combo khi trúng và tiếp tục áp lực khi bị chặn. Thường là lựa chọn an toàn nhất từ Noble Strategy nhờ vào recovery nhanh. Bạn càng ở gần mặt đất khi đánh trúng đối thủ, bạn càng lợi frame khi bị chặn.",
        damage: "800", guard: "All", startup: "9f", active: "", recovery: "", onBlock: "+1/+1/+3f", onHit: "+3/+3/+5f", // L/M/H versions of 22X
        properties: ["Luôn ít nhất +1 khi bị chặn từ 22M và 22H do quỹ đạo nhảy.", "Có thể dùng làm safejump, một lựa chọn tốt nếu bạn đoán trước đối thủ sẽ reversal khi dậy."],
        notes: "Giá trị On Block và On Hit được phân tách theo 22L~L / 22M~L / 22H~L. Thông số chi tiết: Level 1."
      },
      {
        id: "charlotta_noble_strategy_purest_bravery",
        name: "With Purest Bravery! (Noble Strategy > M)",
        input: "22X > M",
        imageTabs: [
            { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/4/4d/GBVS_Charlotta_22X-M.png/151px-GBVS_Charlotta_22X-M.png"] },
            { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/d/d3/GBVS_Charlotta_22XM_Hitbox.png/151px-GBVS_Charlotta_22XM_Hitbox.png"] }
        ],
        description: "Follow-up overhead từ trên không. Làm chậm quán tính một chút trên không, có thể bait các đòn anti-air tầm ngắn, đặc biệt khi thực hiện từ 22L.",
        damage: "1200", guard: "High/Air", startup: "17f", active: "", recovery: "", onBlock: "-3/-3/+1f", onHit: "KD/KD/HKD", // L/M/H versions of 22X
        properties: ["22H vào chiêu này làm cho nó +1 khi bị chặn. Nhấn c.M sau đó (hoặc f.L nếu bạn bị đẩy ra quá xa) là một cách tốt để kiểm tra đối thủ và duy trì áp lực."],
        notes: "Giá trị On Block và On Hit được phân tách theo 22L~M / 22M~M / 22H~M. Thông số chi tiết: Level 4."
      },
      {
        id: "charlotta_noble_strategy_sweetest_skills",
        name: "With Sweetest Skills! (Noble Strategy > H)",
        input: "22X > H",
        imageTabs: [
            { label: "Hình ảnh", urls: ["https://www.dustloop.com/wiki/images/thumb/d/de/GBVS_Charlotta_22X-H.png/173px-GBVS_Charlotta_22X-H.png", "https://www.dustloop.com/wiki/images/thumb/2/22/GBVS_Charlotta_22X-H_Whiff.png/210px-GBVS_Charlotta_22X-H_Whiff.png"] },
            { label: "Hitbox", urls: ["https://www.dustloop.com/wiki/images/thumb/6/60/GBVS_Charlotta_22XH_Hitbox.png/210px-GBVS_Charlotta_22XH_Hitbox.png"] }
        ],
        description: "Follow-up command grab từ trên không, dẫn đến combo chết người nếu bạn bắt được đối thủ đứng dậy chống lại Noble Strategy của cô ấy.",
        damage: "1500", guard: "Throw", startup: "5f", active: "", recovery: "", onBlock: "", onHit: "KD",
        properties: ["Đánh trượt đối thủ đang ngồi.", "Từ 22L và 22M dẫn đến combo ở giữa màn hình và ở góc.", "Từ 22H chỉ dẫn đến combo ở góc."],
        notes: "Thông số chi tiết: Level 0,4."
      }
    ]
  }
];

export default specialMoves;
