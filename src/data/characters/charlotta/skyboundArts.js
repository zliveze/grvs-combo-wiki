const skyboundArts = [
  {
    id: "charlotta_brilliant_moon",
    name: "Brilliant Moon",
    type: "SBA", // Skybound Art
    inputTechnical: "236236H",
    inputEasy: "236S",
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: [
          "https://www.dustloop.com/wiki/images/thumb/c/cc/GBVS_Charlotta_236236H_Start.png/210px-GBVS_Charlotta_236236H_Start.png",
          "https://www.dustloop.com/wiki/images/thumb/8/8c/GBVS_Charlotta_236236H.png/210px-GBVS_Charlotta_236236H.png"
        ]
      },
      {
        label: "Hitbox",
        urls: ["https://www.dustloop.com/wiki/images/thumb/b/bb/GBVS_Charlotta_236236H_Hitbox.png/210px-GBVS_Charlotta_236236H_Hitbox.png"]
      }
    ],
    description: "Charlotta gồng người và lao về phía trước với một đòn tấn công đa hitbox.",
    damage: "3500→2500",
    guard: "Mid",
    startup: "8+5f",
    active: "2x10f",
    recovery: "14f",
    onBlock: "-20f",
    onHit: "HKD",
    invuln: "1-14f All",
    properties: [
      "Bất tử khi startup.",
      "Hữu ích để trừng phạt fireball và các chiêu đánh trượt khác theo phản xạ.",
      "Càng ở gần, càng nhiều hitbox trúng.",
      "Khó trừng phạt khi bị chặn đối với các nhân vật có đòn normal ngắn vì Charlotta sẽ bật lùi lại một chút. Có thể spotdodge sau super flash để trừng phạt ở cự ly gần hơn, nhưng timing rất khó vì chỉ để lại cô ấy -8.",
      "Input kỹ thuật hất tung đối thủ ít hơn, dẫn đến oki tốt hơn nếu bạn trúng ở giữa màn hình."
    ],
    notes: "Thông số chi tiết: Level 4. Clash Level 25 (Technical), Clash Level 20 (Easy). Recovery 38F khi trúng/bị chặn."
  }
];

export default skyboundArts;
