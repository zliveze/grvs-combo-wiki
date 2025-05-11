const universalMechanics = [
  {
    id: "universal_ground_throw",
    name: "Ground Throw (Vật mặt đất)",
    input: "5L+M", // Giả định input: Light + Medium
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: [
          "https://www.dustloop.com/wiki/images/thumb/9/94/GBVS_Charlotta_Throw.png/177px-GBVS_Charlotta_Throw.png", // neutral/forward
          "https://www.dustloop.com/wiki/images/thumb/2/28/GBVS_Charlotta_BackThrow.png/210px-GBVS_Charlotta_BackThrow.png"  // back
        ]
      },
      {
        label: "Hitbox",
        urls: ["https://www.dustloop.com/wiki/images/thumb/2/2e/GBVS_Charlotta_Throw_Hitbox.png/210px-GBVS_Charlotta_Throw_Hitbox.png"]
      }
    ],
    description: "Thực hiện một cú vật đối thủ trên mặt đất.",
    damage: "1500",
    guard: "Throw",
    startup: "7f",
    active: "3f",
    recovery: "31f",
    onBlock: "HKD", // Hard Knockdown
    onHit: "HKD",   // Hard Knockdown
    invuln: "",
    properties: [
      "Vật tiến: Ném đối thủ rất xa để đẩy góc. Cho phép thực hiện meaty chuẩn xác sau đó.",
      "Vật lùi: Để đối thủ ngay sau lưng bạn."
    ],
    notes: "Thông số chi tiết: Level 0,4."
  },
  {
    id: "universal_air_throw",
    name: "Air Throw (Vật trên không)",
    input: "j.L+M", // Giả định input: Light + Medium khi nhảy
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: ["https://www.dustloop.com/wiki/images/thumb/6/61/GBVS_Charlotta_AirThrow.png/205px-GBVS_Charlotta_AirThrow.png"]
      },
      {
        label: "Hitbox",
        urls: ["https://www.dustloop.com/wiki/images/thumb/3/36/GBVS_Charlotta_AirThrow_Hitbox.png/188px-GBVS_Charlotta_AirThrow_Hitbox.png"]
      }
    ],
    description: "Thực hiện một cú vật đối thủ trên không.",
    damage: "1500",
    guard: "Airthrow",
    startup: "5f",
    active: "5f",
    recovery: "Until L+6f", // Cho đến khi chạm đất + 6 frame
    onBlock: "HKD", // Hard Knockdown
    onHit: "HKD",   // Hard Knockdown
    invuln: "",
    properties: [],
    notes: "Thông số chi tiết: Level 0,4."
  },
  {
    id: "universal_overhead_attack",
    name: "Overhead Attack (Tấn công trên đầu)",
    input: "5M+H", // Giả định input: Medium + Heavy (Universal Overhead)
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: ["https://www.dustloop.com/wiki/images/thumb/d/df/GBVS_Charlotta_OverheadAttack.png/210px-GBVS_Charlotta_OverheadAttack.png"]
      },
      {
        label: "Hitbox",
        urls: ["https://www.dustloop.com/wiki/images/thumb/8/84/GBVS_Charlotta_UOH_Hitbox.png/210px-GBVS_Charlotta_UOH_Hitbox.png"]
      }
    ],
    description: "Một đòn tấn công trên đầu phổ thông, lao tới và có thể bắt bài đối thủ.",
    damage: "1000",
    guard: "High",
    startup: "26f",
    active: "3f",
    recovery: "20f",
    onBlock: "-4f",
    onHit: "+1f",
    invuln: "4-31f Throw; 10-31f Low; 9-30f Airborne",
    properties: [
      "Lao tới, nên tầm với của nó có thể bắt bài đối thủ.",
      "Khi counter hit, c.H vào SSBA (Noble Execution 236236U) sẽ không tới và cần một auto combo sau c.H hoặc một microwalk trước đó để gây thêm 170 sát thương (sự khác biệt không đáng để mạo hiểm thực hiện sai)."
    ],
    notes: "Thông số chi tiết: Level 4."
  }
];

export default universalMechanics;
