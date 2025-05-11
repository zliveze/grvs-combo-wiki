const superSkyboundArts = [
  {
    id: "charlotta_noble_execution",
    name: "Noble Execution",
    type: "SSBA", // Super Skybound Art
    inputTechnical: "236236U",
    inputEasy: "236S+U", // Trong HTML là 236S+U, tôi sẽ dùng S là nút Skill (J/RT) + U (Unique Action)
    imageTabs: [
      {
        label: "Hình ảnh",
        urls: [
          "https://www.dustloop.com/wiki/images/thumb/3/35/GBVS_Charlotta_236236U.png/210px-GBVS_Charlotta_236236U.png",
          "https://www.dustloop.com/wiki/images/thumb/7/7d/GBVS_Charlotta_236236U_Finish.png/210px-GBVS_Charlotta_236236U_Finish.png"
        ]
      },
      {
        label: "Hitbox",
        urls: [
          "https://www.dustloop.com/wiki/images/thumb/2/21/GBVS_Charlotta_236236U_Hitbox1.png/126px-GBVS_Charlotta_236236U_Hitbox1.png",
          "https://www.dustloop.com/wiki/images/thumb/9/9b/GBVS_Charlotta_236236U_Hitbox2.png/165px-GBVS_Charlotta_236236U_Hitbox2.png",
          "https://www.dustloop.com/wiki/images/thumb/2/27/GBVS_Charlotta_236236U_Hitbox3.png/210px-GBVS_Charlotta_236236U_Hitbox3.png",
          "https://www.dustloop.com/wiki/images/thumb/d/db/GBVS_Charlotta_236236U_Hitbox4.png/210px-GBVS_Charlotta_236236U_Hitbox4.png",
          "https://www.dustloop.com/wiki/images/thumb/2/21/GBVS_Charlotta_236236U_Hitbox5.png/210px-GBVS_Charlotta_236236U_Hitbox5.png"
        ]
      }
    ],
    description: "Thực hiện một nhát chém lên theo sau là một cú vung kiếm mạnh mẽ xuống dưới.",
    damage: "4500→3500", // Sát thương giảm dần
    guard: "Mid,All", // Hitbox đầu là Mid, phần cinematic là All
    startup: "8+3f", // 8f cinematic + 3f thực tế
    active: "11(10)17f",
    recovery: "20f",
    onBlock: "-18f",
    onHit: "HKD", // Hard Knockdown
    invuln: "1-21f All", // Bất tử hoàn toàn từ frame 1 đến 21
    properties: [
      "Bất tử khi startup.",
      "Với 11 frame startup, nó nhanh ngang với Holy Ladder [2]8X của cô.",
      "Anti-air tốt vì không thể chặn trên không (air unblockable) và tầm với rất cao phía trên cô.",
      "Input kỹ thuật giữ bạn gần đối thủ hơn sau cinematic, dẫn đến oki tốt hơn.",
      "Xóa sổ thanh máu của đối thủ."
    ],
    notes: "Thông số chi tiết: Level 4. Clash Level 35 (Technical), Clash Level 30 (Easy). Sát thương của nhát chém xuống không cinematic: 2000."
  }
];

export default superSkyboundArts;
