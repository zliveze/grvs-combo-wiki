import normalMoves from './normalMoves';
import uniqueActions from './uniqueActions';
import specialMoves from './specialMoves';
import skyboundArts from './skyboundArts';
import superSkyboundArts from './superSkyboundArts';

const charlottaData = {
  name: "Charlotta",
  image: "https://www.dustloop.com/wiki/images/0/04/GBVS_Charlotta_Portrait.png",
  nameplate: "https://www.dustloop.com/wiki/images/7/7f/GBVS_Charlotta_Nameplate.png",
  icon: "https://www.dustloop.com/wiki/images/thumb/4/46/GBVS_Charlotta_Icon.png/56px-GBVS_Charlotta_Icon.png",
  overview: "Charlotta là nhân vật tấn công nhanh (rushdown) với khả năng gây áp lực cự ly gần nhờ vào các đòn tấn công tiến lên kết hợp với sát thương cao. Khả năng nhảy nhanh của cô vừa mạnh trong tấn công vừa tốt trong phòng thủ, cho phép áp đảo đối thủ và thoát khỏi các tình huống một cách nhanh chóng. Những điểm mạnh này giúp Charlotta tận dụng tối đa những sai lầm nhỏ nhất và nhanh chóng áp đảo đối thủ trong chớp mắt.",
  stats: {
    health: "10000",
    prejump: "4f",
    backdash: "22f",
    backshift: "HighRecovery (30f)"
  },
  pros: [
    {
      title: "Sát thương trên trung bình",
      description: "Với khả năng đẩy vào góc mạnh, khả năng sử dụng hai đòn đặc biệt trong một combo ngay cả ở giữa màn hình, và dễ dàng thực hiện nhảy vào đòn, Charlotta có sát thương đầu ra cao hơn so với phần lớn các nhân vật khác."
    },
    {
      title: "Áp lực và okizeme mạnh",
      description: "Cô có nhiều cách để gây áp lực và duy trì vị trí nhờ vào các đòn đánh tiêu chuẩn và đặc biệt tiến lên như Sword of Lumiel. Khi hạ gục đối thủ, Noble Strategy của cô mang đến nhiều cách để phá vỡ phòng thủ đối phương, đặc biệt nguy hiểm ở góc sân."
    },
    {
      title: "Khó đối phó",
      description: "Khả năng nhảy nhanh và tầm tấn công đột ngột buộc đối thủ phải kiên nhẫn và phản ứng nhanh nếu không muốn bị áp đảo trong chớp mắt. Ngoài ra, các đòn phản công và đòn super của cô khó để trừng phạt. Cô cũng có xu hướng thoát khỏi các combo mà hầu hết nhân vật khác sẽ bị dính nhờ tốc độ rơi nhanh."
    },
    {
      title: "Nhảy tốt",
      description: "Tốc độ rơi nhanh khiến việc chống nhảy Charlotta khó hơn so với các nhân vật khác. Quỹ đạo nhảy ngắn hơn cũng làm cho lối chơi đánh chéo của cô mạnh hơn. Các nhân vật không thể dựa vào chống nhảy bằng đòn phản công có thể nhanh chóng bị áp đảo, đặc biệt khi cô sử dụng Noble Strategy."
    }
  ],
  cons: [
    {
      title: "Đòn tiêu chuẩn hơi ngắn",
      description: "Hầu hết các nhân vật khác có đòn chọc có tầm xa hơn Charlotta, ngoại trừ f.H (nút nặng tầm xa/K từ xa) của cô, nhưng quá chậm để sử dụng đáng tin cậy trong trung lập."
    },
    {
      title: "Đòn phản công chậm hơn",
      description: "Holy Ladder là một trong số ít các đòn phản công chậm hơn, không dùng meter trong game. Nó dễ bị đánh thấp và do đó cho phép các nhân vật khác gây áp lực dễ dàng hơn, đặc biệt là những nhân vật có thể chơi xung quanh cả hai điểm yếu."
    },
    {
      title: "Khó khăn đối với lối chơi zoning",
      description: "Vì không có fireball riêng, cô gặp khó khăn khi đối phó với các đòn projectile nói chung."
    },
    {
      title: "Đòn chống nhảy kỳ quặc",
      description: "2H (xuống + nút nặng/S+K) của cô rất chậm. Điều này có nghĩa là cô thường phải dựa vào các công cụ khác để chống nhảy như Holy Ladder hoặc 5U (đứng yên + nút đặc biệt/(Không di chuyển)+J), thường mang lại ít phần thưởng hơn, hoặc sử dụng c.H (ngồi + nút nặng/S+K), một đòn đánh chỉ kích hoạt nếu đối thủ đủ gần."
    }
  ],
  inputGuide: {
    keyboard: {
      // Notation: L=U, M=I, H=K, U=J (Unique)
      // Movement: 2=S, 5=(Không di chuyển)
      "c.L": "U (gần)",
      "c.M": "I (gần)",
      "c.H": "K (gần)",
      "c.XX": "U, U (gần)",
      "c.XXX": "U, U, U (gần)", // Giả định 3x Light cho auto combo
      "f.L": "U (xa)",
      "f.M": "I (xa)",
      "f.H": "K (xa)",
      "2L": "S + U",
      "2M": "S + I",
      "2H": "S + K",
      "2U": "S + J",
      "5U": "J", // Standing Unique (Không di chuyển + J)
      "j.L": "(Nhảy) U",
      "j.M": "(Nhảy) I",
      "j.H": "(Nhảy) K",
      "j.U": "(Nhảy) J",
      // Universal Mechanics
      "5L+M": "U + I", // Ground Throw
      "j.L+M": "(Nhảy) U + I", // Air Throw
      "5M+H": "I + K", // Universal Overhead
      // Special Moves (Technical Inputs)
      "[4]6L": "Giữ A > D + U",
      "[4]6M": "Giữ A > D + I",
      "[4]6H": "Giữ A > D + K",
      "[4]6X": "Giữ A > D + U/I/K",
      "[2]8L": "Giữ S > W + U",
      "[2]8M": "Giữ S > W + I",
      "[2]8H": "Giữ S > W + K",
      "[2]8X": "Giữ S > W + U/I/K",
      "214L": "S, S+A, A + U",
      "214M": "S, S+A, A + I",
      "214H": "S, S+A, A + K",
      "214X": "S, S+A, A + U/I/K",
      "22L": "S, S + U",
      "22M": "S, S + I",
      "22H": "S, S + K",
      "22X": "S, S + U/I/K",
      // Special Moves (Easy Inputs)
      "6S": "D + P", // Easy Shining Onslaught (P là Skill)
      "5S": "P",    // Easy Holy Ladder (P là Skill)
      "4S": "A + P", // Easy Sword of Lumiel (P là Skill)
      "2S": "S + P", // Easy Noble Strategy (P là Skill)
      // Noble Strategy Follow-ups
      "22X > 5": "(Sau 22X) Không Input",
      "22X > L": "(Sau 22X) U",
      "22X > M": "(Sau 22X) I",
      "22X > H": "(Sau 22X) K",
      // Skybound Arts
      "236236H": "S+D, S+D + K", // SBA (Technical): Xuống+Tiến, Xuống+Tiến + Heavy
      "236S": "S+D + P", // Easy SBA: Xuống+Tiến + Skill
      // Super Skybound Arts
      "236236U": "S+D, S+D + J", // SSBA (Technical): Xuống+Tiến, Xuống+Tiến + Unique
      "236S+U": "S+D, P+J" // Easy SSBA: Xuống+Tiến, Skill+Unique
    },
    controller: {
      // Notation: L=X, M=Y, H=B, U=A (Unique)
      // Movement: 2=Xuống, 5=(Không di chuyển)
      "c.L": "X (gần)",
      "c.M": "Y (gần)",
      "c.H": "B (gần)",
      "c.XX": "X, X (gần)",
      "c.XXX": "X, X, X (gần)", // Giả định 3x Light cho auto combo
      "f.L": "X (xa)",
      "f.M": "Y (xa)",
      "f.H": "B (xa)",
      "2L": "Xuống + X",
      "2M": "Xuống + Y",
      "2H": "Xuống + B",
      "2U": "Xuống + A",
      "5U": "A", // Standing Unique (Không di chuyển + A)
      "j.L": "(Nhảy) X",
      "j.M": "(Nhảy) Y",
      "j.H": "(Nhảy) B",
      "j.U": "(Nhảy) A",
      // Universal Mechanics
      "5L+M": "X + Y", // Ground Throw
      "j.L+M": "(Nhảy) X + Y", // Air Throw
      "5M+H": "Y + B", // Universal Overhead
      // Special Moves (Technical Inputs)
      "[4]6L": "Giữ Lùi > Tiến + X",
      "[4]6M": "Giữ Lùi > Tiến + Y",
      "[4]6H": "Giữ Lùi > Tiến + B",
      "[4]6X": "Giữ Lùi > Tiến + X/Y/B",
      "[2]8L": "Giữ Xuống > Lên + X",
      "[2]8M": "Giữ Xuống > Lên + Y",
      "[2]8H": "Giữ Xuống > Lên + B",
      "[2]8X": "Giữ Xuống > Lên + X/Y/B",
      "214L": "Xuống, Xuống-Lùi, Lùi + X",
      "214M": "Xuống, Xuống-Lùi, Lùi + Y",
      "214H": "Xuống, Xuống-Lùi, Lùi + B",
      "214X": "Xuống, Xuống-Lùi, Lùi + X/Y/B",
      "22L": "Xuống, Xuống + X",
      "22M": "Xuống, Xuống + Y",
      "22H": "Xuống, Xuống + B",
      "22X": "Xuống, Xuống + X/Y/B",
      // Special Moves (Easy Inputs)
      "6S": "Tiến + RB", // Easy Shining Onslaught (RB là Skill)
      "5S": "RB",    // Easy Holy Ladder (RB là Skill)
      "4S": "Lùi + RB", // Easy Sword of Lumiel (RB là Skill)
      "2S": "Xuống + RB", // Easy Noble Strategy (RB là Skill)
       // Noble Strategy Follow-ups
      "22X > 5": "(Sau 22X) Không Input",
      "22X > L": "(Sau 22X) X",
      "22X > M": "(Sau 22X) Y",
      "22X > H": "(Sau 22X) B",
      // Skybound Arts
      "236236H": "Xuống-Tiến, Xuống-Tiến + B", // SBA (Technical): Xuống-Tiến, Xuống-Tiến + Heavy
      "236S": "Xuống-Tiến + RB", // Easy SBA: Xuống-Tiến + Skill
      // Super Skybound Arts
      "236236U": "Xuống-Tiến, Xuống-Tiến + A", // SSBA (Technical): Xuống-Tiến, Xuống-Tiến + Unique
      "236S+U": "Xuống-Tiến, RB+A" // Easy SSBA: Xuống-Tiến, Skill+Unique
    }
  },
  normalMoves: normalMoves,
  uniqueActions: uniqueActions,
  specialMoves: specialMoves,
  skyboundArts: skyboundArts,
  superSkyboundArts: superSkyboundArts
}

export default charlottaData;
