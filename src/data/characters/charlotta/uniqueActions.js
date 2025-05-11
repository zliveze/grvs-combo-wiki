const uniqueActions = [
  {
    id: "charlotta_5U_konigsschild",
    name: "Königsschild",
    input: "5U",
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: [
          "https://www.dustloop.com/wiki/images/thumb/f/f6/GBVS_Charlotta_5U.png/203px-GBVS_Charlotta_5U.png",
          "https://www.dustloop.com/wiki/images/thumb/0/0f/GBVS_Charlotta_5UAttack.png/210px-GBVS_Charlotta_5UAttack.png"
        ]
      },
      {
        label: "Hitbox", // HTML không có ảnh hitbox cho chiêu này
        urls: []
      }
    ],
    description: "5U bao gồm hai phần, một Parry (Phản đòn) và một Counter (Đòn phản công) tự động theo sau nếu đối thủ đủ gần.",
    damage: "1500 (Counter)", // Sát thương của đòn phản công
    guard: "Unblockable (Counter)", // Đòn phản công không thể chặn
    startup: "6f (Parry)", // Startup của Parry
    active: "18f (Parry Window 6f-23f)", // Khung thời gian Parry hoạt động
    recovery: "25f (Tổng thể nếu Parry không thành công hoặc không có Counter)",
    onBlock: "N/A", // Không áp dụng cho Parry/Counter kiểu này
    onHit: "HKD + Side Switch (Counter)", // Hard Knockdown và đổi bên khi Counter trúng
    invuln: "", // Không có thông tin invuln cụ thể trong bảng chính
    properties: [
      "Parry: Phản đòn tất cả các chiêu từ frame 6-23 ngoại trừ đòn vật, (Super) Skybound Arts hoặc kích hoạt OD, và giảm 50% sát thương nhận vào. Sát thương này bị ảnh hưởng bởi Guts, nhưng không được coi là chip damage nên nếu không đủ HP, bạn vẫn sẽ bị hạ gục.",
      "Counter: Nếu đối thủ đủ gần khi chiêu của họ bị parry, một đòn phản công sẽ tự động kích hoạt gây 1500 sát thương, đổi bên và hard knockdown. Nếu đối thủ ở ngoài tầm để Counter kích hoạt, họ sẽ bị choáng (stagger), để lại bạn lợi frame một chút nhưng chỉ khi parry các chiêu có tính chất strike. Parry projectile từ xa sẽ không ảnh hưởng đến đối thủ."
    ],
    notes: "Anti-air khá đáng tin cậy, vì nó nhanh và sẽ kích hoạt ngay cả với các đòn jump normal từ rất cao hoặc phía sau bạn. Không nên dùng để đối phó với fireball từ xa khi Counter không thể kích hoạt, vì bạn chỉ nhận sát thương không cần thiết và vẫn có thể bị trừng phạt sau đó. Với 6 frame startup, nó chậm hơn c.L, nên không được ưu tiên khi bạn cần một thứ gì đó để mash thoát áp lực. Tuy nhiên, nó vẫn có thể hữu ích trong một số chuỗi áp lực nhất định khi bạn ở quá xa đối thủ để các đòn normal gần có thể kích hoạt hoặc chống lại các chiêu setplay như Sweeping Beam của Zooey. Thông số chi tiết: Level 2."
  }
  // Thêm các unique actions khác của Charlotta vào đây nếu có
];

export default uniqueActions;
