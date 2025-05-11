import normalMoves from './normalMoves';

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
      "j.U": "(Nhảy) J"
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
      "j.U": "(Nhảy) A"
    }
  },
  normalMoves: normalMoves
}

export default charlottaData;
