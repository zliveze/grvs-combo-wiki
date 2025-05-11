// src/data/parsedTranslationRules.js

// Helper function to get the button translation from inputGuide
const getButtonTranslation = (buttonKey, targetInputType, inputGuide) => {
  if (!inputGuide || !inputGuide[targetInputType]) return buttonKey;
  const keyMap = {
    "L": "Tấn công nhẹ (Light attack)",
    "M": "Tấn công trung bình (Medium attack)",
    "H": "Tấn công mạnh (Heavy attack)",
    "U": "Tấn công đặc biệt (Unique attack)",
    "S": "Kỹ năng (Skill)",
    "X": "Nút X (thường là Light/Medium tùy game)", // Generic X for [X]
  };
  const inputGuideKey = keyMap[buttonKey];
  return inputGuide[targetInputType]?.[inputGuideKey] || buttonKey;
};

const rawTranslationRules = [
  // Specific Supers & Specials (longest first)
  { gameNotation: "236236H", keyboard: "S+D, S+D + K", controller: "Xuống-Tiến, Xuống-Tiến + B", type: "super" },
  { gameNotation: "236236U", keyboard: "S+D, S+D + J", controller: "Xuống-Tiến, Xuống-Tiến + A", type: "super" },
  { gameNotation: "236S+U", keyboard: "S+D, P+J", controller: "Xuống-Tiến, RB+A", type: "special", isEasySSBA: true },
  { gameNotation: "22H~low", keyboard: "S, S + K ~ (Không di chuyển)", controller: "Xuống, Xuống + B ~ (Không di chuyển)", type: "special_followup" },
  { gameNotation: "22H~H", keyboard: "S, S + K ~ K", controller: "Xuống, Xuống + B ~ B", type: "special_followup" },
  
  // Motion Inputs with placeholder (X represents L, M, H, or U button)
  { gameNotation: "[4]6X", keyboard: "Giữ A (1s) > D + {X}", controller: "Giữ Lùi (1s) > Tiến + {X}", type: "motion_charge" },
  { gameNotation: "[2]8X", keyboard: "Giữ S (2s) > W + {X}", controller: "Giữ Xuống (2s) > Lên + {X}", type: "motion_charge" },
  { gameNotation: "214X", keyboard: "S+A + {X}", controller: "Xuống-Lùi + {X}", type: "motion" }, // Updated
  { gameNotation: "236X", keyboard: "S+D + {X}", controller: "Xuống-Tiến + {X}", type: "motion" }, // Updated (was already correct)
  { gameNotation: "22X", keyboard: "S, S + {X}", controller: "Xuống, Xuống + {X}", type: "motion" },
  
  // Standalone motions (as per new request)
  { gameNotation: "236", keyboard: "S+D", controller: "Xuống-Tiến", type: "motion_standalone" },
  { gameNotation: "214", keyboard: "S+A", controller: "Xuống-Lùi", type: "motion_standalone" },

  // Easy inputs
  { gameNotation: "236S", keyboard: "S+D + P", controller: "Xuống-Tiến + RB", type: "special", isEasySBA: true },

  // Directions
  { gameNotation: "7", keyboard: "W+A", controller: "Lên-Lùi", type: "direction" },
  { gameNotation: "8", keyboard: "W", controller: "Lên", type: "direction" },
  { gameNotation: "9", keyboard: "W+D", controller: "Lên-Tiến", type: "direction" },
  { gameNotation: "4", keyboard: "A", controller: "Lùi", type: "direction" },
  { gameNotation: "6", keyboard: "D", controller: "Tiến", type: "direction" },
  { gameNotation: "1", keyboard: "S+A", controller: "Xuống-Lùi", type: "direction" },
  { gameNotation: "3", keyboard: "S+D", controller: "Xuống-Tiến", type: "direction" },
  { gameNotation: "2", keyboard: "S", controller: "Xuống", type: "direction" },
  { gameNotation: "5", keyboard: "(Không di chuyển)", controller: "(Không di chuyển)", type: "direction" },

  // Basic Attack Buttons
  { gameNotation: "L", keyboard: "U", controller: "X", type: "button" },
  { gameNotation: "M", keyboard: "I", controller: "Y", type: "button" },
  { gameNotation: "H", keyboard: "K", controller: "B", type: "button" },
  { gameNotation: "U", keyboard: "J", controller: "A", type: "button", isUniqueAttack: true },
  { gameNotation: "S", keyboard: "P", controller: "RB", type: "button", isSkillButton: true },

  // Connectors & Modifiers from user feedback and existing rules
  { gameNotation: ">", keyboard: "> (Tiếp theo)", controller: "> (Tiếp theo)", type: "connector", description: "Thực hiện đòn tiếp theo sau khi đòn trước kết thúc hoàn toàn animation." },
  { gameNotation: "▷/land", keyboard: "▷ (Tiếp đất)", controller: "▷ (Tiếp đất)", type: "modifier", description: "Chỉ ra rằng người chơi phải tiếp đất tại điểm đó trong chuỗi." },
  { gameNotation: ",", keyboard: ", (Link)", controller: ", (Link)", type: "connector", description: "Link đòn trước vào đòn tiếp theo." },
  { gameNotation: "->/~", keyboard: "->/~ (Cancel)", controller: "->/~ (Cancel)", type: "connector", description: "Cancel kỹ năng đặc biệt trước đó vào kỹ năng đặc biệt tiếp theo." },
  { gameNotation: "~", keyboard: "~", controller: "~", type: "connector" },
  { gameNotation: "dl./delay", keyboard: "dl. (Trì hoãn)", controller: "dl. (Trì hoãn)", type: "modifier", description: "Trì hoãn đòn tiếp theo." },
  { gameNotation: "(whiff)", keyboard: "(Đánh trượt)", controller: "(Đánh trượt)", type: "modifier", description: "Đòn đánh phải đánh trượt (không trúng)." },
  { gameNotation: "c.", keyboard: "c. (Gần)", controller: "c. (Gần)", type: "modifier", description: "Đứng gần (Close)" },
  { gameNotation: "f.", keyboard: "f. (Xa)", controller: "f. (Xa)", type: "modifier", description: "Đứng xa (Far)" },
  { gameNotation: "j.", keyboard: "j. (Trên không)", controller: "j. (Trên không)", type: "modifier", description: "Nhảy/Trên không (Jumping/Aerial)" },
  { gameNotation: "hj./sj.", keyboard: "hj./sj. (Siêu nhảy)", controller: "hj./sj. (Siêu nhảy)", type: "modifier", description: "Nhảy Cao/Siêu Nhảy (High Jump/Super Jump)" },
  { gameNotation: "jc", keyboard: "jc (Nhảy Hủy)", controller: "jc (Nhảy Hủy)", type: "modifier", description: "Nhảy Hủy (Jump Cancel)" },
  { gameNotation: "hjc/sjc", keyboard: "hjc/sjc (Siêu nhảy Hủy)", controller: "hjc/sjc (Siêu nhảy Hủy)", type: "modifier", description: "Nhảy Cao Hủy/Siêu Nhảy Hủy (High Jump Cancel/Super Jump Cancel)" },
  { gameNotation: "dc/adc", keyboard: "dc/adc (Dash Hủy)", controller: "dc/adc (Dash Hủy)", type: "modifier", description: "Dash Hủy/Air Dash Hủy (Dash Cancel/Air Dash Cancel)" },
  { gameNotation: "CH", keyboard: "CH (Phản công)", controller: "CH (Phản công)", type: "modifier", description: "Đòn đánh phản công (Counter Hit)" },
  { gameNotation: "AA", keyboard: "AA (Chống nhảy)", controller: "AA (Chống nhảy)", type: "modifier", description: "Chống nhảy (Anti-Air)" },
  { gameNotation: "IAS", keyboard: "IAS (Trên không tức thời)", controller: "IAS (Trên không tức thời)", type: "modifier", description: "Kỹ năng Đặc biệt Trên Không Tức thời (Instant Air Special)" },
  { gameNotation: "[X]", keyboard: "Giữ [{X}]", controller: "Giữ [{X}]", type: "modifier_hold", description: "Giữ nút X." }, // {X} will be replaced by actual button
  { gameNotation: "]X[", keyboard: "Nhả [{X}]", controller: "Nhả [{X}]", type: "modifier_release", description: "Nhả nút X." }, // {X} will be replaced
  { gameNotation: "(move)", keyboard: "(Đòn tùy chọn)", controller: "(Đòn tùy chọn)", type: "modifier", description: "Đòn đánh tùy chọn." },
  { gameNotation: "[X] or [Y]", keyboard: "[{X}] hoặc [{Y}]", controller: "[{X}] hoặc [{Y}]", type: "modifier_choice", description: "Thực hiện chuỗi X hoặc Y." }, // {X}, {Y} replaced
  { gameNotation: "[sequence] xN", keyboard: "[Chuỗi] x{N}", controller: "[Chuỗi] x{N}", type: "modifier_repeat", description: "Lặp lại chuỗi N lần." }, // {N} replaced
  { gameNotation: "(N)", keyboard: "(Hit {N})", controller: "(Hit {N})", type: "modifier_hitcount", description: "Đòn đánh thứ N hoặc đòn đánh phải gây ra N lượt đánh." }, // {N} replaced
  
  // Other existing rules
  { gameNotation: "(XX)", keyboard: "(XX)", controller: "(XX)", type: "modifier" },
  { gameNotation: "run forward", keyboard: "Chạy tới (nhấn giữ D)", controller: "Chạy tới (nhấn giữ cần analog trái về phía trước)", type: "action" },
];

const parsedTranslationRules = rawTranslationRules.sort((a, b) => {
  // Prioritize longer gameNotations to avoid partial matches (e.g., "236S" before "236" or "S")
  if (b.gameNotation.length !== a.gameNotation.length) {
    return b.gameNotation.length - a.gameNotation.length;
  }
  // If length is the same, prioritize rules that are more specific (e.g., not ending with X)
  if (a.gameNotation.endsWith('X') && !b.gameNotation.endsWith('X')) return 1;
  if (!a.gameNotation.endsWith('X') && b.gameNotation.endsWith('X')) return -1;
  return 0;
});

export { parsedTranslationRules, getButtonTranslation };
