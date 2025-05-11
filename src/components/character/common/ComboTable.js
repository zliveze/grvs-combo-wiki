import React, { useState, useMemo } from 'react';
import { parsedTranslationRules, getButtonTranslation } from '../../../data/parsedTranslationRules'; // Import quy tắc đã parse

// Dữ liệu input guide mặc định (sẽ được ghi đè nếu được truyền qua props)
const defaultInputGuide = {
  "keyboard": {
    "Di chuyển": "W, A, S, D",
    "Tấn công nhẹ (Light attack)": "U",
    "Tấn công trung bình (Medium attack)": "I",
    "Tấn công mạnh (Heavy attack)": "K",
    "Tấn công đặc biệt (Unique attack)": "J",
    "Kỹ năng (Skill)": "P",
    "Đỡ đòn (Block)": ";",
    "Ném (Throw)": "O",
    "Tấn công trên đầu (Overhead attack)": "L",
    "c.XX": "c.X,X (Auto Combo)",
    "c.XXX": "c.X,X,X (Full Auto Combo)"
  },
  "controller": {
    "Tấn công nhẹ (Light attack)": "X",
    "Tấn công trung bình (Medium attack)": "Y",
    "Tấn công mạnh (Heavy attack)": "B",
    "Tấn công đặc biệt (Unique attack)": "A",
    "Kỹ năng (Skill)": "RB",
    "Đỡ đòn (Block)": "RT",
    "Ném (Throw)": "LB",
    "Tấn công trên đầu (Overhead attack)": "LT",
    "c.XX": "c.X,X (Auto Combo)",
    "c.XXX": "c.X,X,X (Full Auto Combo)"
  }
};

// Helper function to escape regex special characters
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getHighlightClass = (ruleType, targetInputType, isButtonPlaceholder = false) => {
  if (isButtonPlaceholder) {
    return targetInputType === 'keyboard' ? 'font-bold text-sky-500 dark:text-sky-400' : 'font-bold text-lime-500 dark:text-lime-400';
  }
  switch (ruleType) {
    case 'direction':
    case 'motion_standalone': // Treat standalone motions like directions for styling
      return 'font-medium text-purple-600 dark:text-purple-400';
    case 'button':
    case 'isSkillButton':
    case 'isUniqueAttack':
      return targetInputType === 'keyboard' ? 'font-bold text-sky-500 dark:text-sky-400' : 'font-bold text-lime-500 dark:text-lime-400';
    case 'motion': // For motions like 236X, 214X
    case 'motion_charge': // For charge motions [4]6X
      return 'font-semibold text-amber-600 dark:text-amber-400';
    case 'special':
    case 'super':
    case 'special_followup':
    case 'isEasySBA':
    case 'isEasySSBA':
      return 'font-bold text-rose-500 dark:text-rose-400';
    case 'connector':
      return 'font-normal text-gray-500 dark:text-gray-400 mx-px';
    case 'modifier':
    case 'modifier_hold':
    case 'modifier_release':
    case 'modifier_choice':
    case 'modifier_repeat':
    case 'modifier_hitcount':
      return 'italic text-slate-600 dark:text-slate-300';
    case 'action':
      return 'text-sm text-gray-700 dark:text-gray-200';
    default:
      return 'text-gray-700 dark:text-gray-200';
  }
};

// Tạo cache để lưu kết quả dịch, tránh việc phân tích lại combo khi chuyển tab input type
const comboCache = new Map();

// Thêm một đối tượng dịch các prefix
const prefixTranslations = {
  "keyboard": {
    "c.": "Gần", 
    "f.": "Xa",
    "j.": "Nhảy"
  },
  "controller": {
    "c.": "Gần",
    "f.": "Xa",
    "j.": "Nhảy"
  }
};

// Thêm hàm tiền xử lý để chuẩn hóa các ký hiệu
const preprocessComboNotation = (comboString) => {
  // Chuẩn hóa c và c. (tương tự cho f và f., j và j.)
  return comboString
    .replace(/\bc(\d)/g, 'c.$1') // Thay c1, c2, c5, etc bằng c.1, c.2, c.5...
    .replace(/\bf(\d)/g, 'f.$1') // Thay f1, f2, f5, etc bằng f.1, f.2, f.5...
    .replace(/\bj(\d)/g, 'j.$1'); // Thay j1, j2, j5, etc bằng j.1, j.2, j.5...
};

// Thêm xử lý đặc biệt cho các ký hiệu giữ phím
const getHoldDirectionText = (direction, targetInputType) => {
  const dirMap = {
    "keyboard": {
      "1": "Giữ S+A", // Xuống-Lùi
      "2": "Giữ S",   // Xuống
      "3": "Giữ S+D", // Xuống-Tiến
      "4": "Giữ A",   // Lùi
      "6": "Giữ D",   // Tiến
      "7": "Giữ W+A", // Lên-Lùi
      "8": "Giữ W",   // Lên
      "9": "Giữ W+D"  // Lên-Tiến
    },
    "controller": {
      "1": "Giữ Xuống-Lùi",
      "2": "Giữ Xuống",
      "3": "Giữ Xuống-Tiến",
      "4": "Giữ Lùi",
      "6": "Giữ Tiến",
      "7": "Giữ Lên-Lùi",
      "8": "Giữ Lên",
      "9": "Giữ Lên-Tiến"
    }
  };

  return dirMap[targetInputType][direction] || `Giữ ${direction}`;
};

const parseAndTranslateCombo = (comboString, targetInputType, providedInputGuide, allRules) => {
  // Tạo khóa cache dựa trên combo và loại input
  const cacheKey = `${comboString}_${targetInputType}`;
  
  // Kiểm tra cache trước khi phân tích
  if (comboCache.has(cacheKey)) {
    return comboCache.get(cacheKey);
  }

  // Sử dụng input guide từ props nếu có, nếu không thì dùng mặc định
  const inputGuide = providedInputGuide || defaultInputGuide;
  
  let cleanedString = comboString;

  const decodeHtmlEntities = (str) => {
    if (typeof window !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
      } catch (e) {
        return str.replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&');
      }
    }
    return str.replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&');
  };

  cleanedString = decodeHtmlEntities(cleanedString);
  // Tiền xử lý để chuẩn hóa các ký hiệu
  cleanedString = preprocessComboNotation(cleanedString);
  
  const spanRegex = /<span class="colorful-text-\d+">(.*?)<\/span>/gi;
  while (spanRegex.test(cleanedString)) {
    cleanedString = cleanedString.replace(spanRegex, '$1');
  }

  const sortedGameNotations = [...allRules]
    .map(rule => escapeRegex(rule.gameNotation))
    .sort((a, b) => b.length - a.length);

  const tokenizerPatterns = [
    ...sortedGameNotations,
    "c5XXX", "c5XX", "f5X", "\\(XX\\)",
    "\\[\\d\\][LMHUS]", "\\d[LMHUS]", "[LMHUS]", "\\d",
    "[cfj]\\.", "->/~", ">", ",", "\\+", "~",
    "\\]\\w+\\[", // ]X[ pattern for button release
    "\\[\\w+\\] or \\[\\w+\\]", // [X] or [Y] pattern
    "\\[\\w+\\]", // [X] pattern for button hold
    "\\[sequence\\] x\\d+", // [sequence] xN pattern
    "\\w+(?:\\s\\w+)*", "\\S"
  ];
  const tokenizerRegex = new RegExp(`(${tokenizerPatterns.join('|')})`, 'g');
  let tokens = cleanedString.match(tokenizerRegex) || [];
  
  let htmlOutput = "";

  for (const token of tokens) {
    if (token.match(/^\s+$/)) {
      htmlOutput += token; continue;
    }

    let translatedToken = token;
    let appliedStyleClass = getHighlightClass('default', targetInputType);
    let ruleFound = false;
    let matchedRule = null;

    // 1. Exact match
    matchedRule = allRules.find(rule => rule.gameNotation === token);
    if (matchedRule) {
      ruleFound = true;
      translatedToken = matchedRule[targetInputType];
      
      // Loại bỏ phần "(Không di chuyển)" nếu có
      translatedToken = translatedToken.replace(/\(Không di chuyển\)/g, "").trim();
      
      appliedStyleClass = getHighlightClass(matchedRule.type, targetInputType);

      if (matchedRule.isEasySSBA && translatedToken) {
        // SSBA specific highlighting (S+D, P+J or Xuống-Tiến, RB+A)
        const parts = translatedToken.split(/([+,])/); // Split by comma or plus, keeping delimiters
        let tempHtml = "";
        parts.forEach(part => {
          if (part === ',' || part === '+') {
            tempHtml += `<span class="${getHighlightClass('connector', targetInputType)}">${part}</span>`;
          } else if (part.trim() !== '') {
            // Determine if part is direction or button for styling
            const dirRule = allRules.find(r => r[targetInputType] === part.trim() && (r.type === 'direction' || r.type === 'motion_standalone'));
            const btnRule = allRules.find(r => r[targetInputType] === part.trim() && r.type === 'button');
            if (dirRule) {
              tempHtml += `<span class="${getHighlightClass(dirRule.type, targetInputType)}">${part.trim()}</span>`;
            } else if (btnRule) {
              tempHtml += `<span class="${getHighlightClass(btnRule.type, targetInputType)}">${part.trim()}</span>`;
            } else {
              tempHtml += part; // Should not happen if SSBA translation is consistent
            }
          }
        });
        translatedToken = tempHtml;
        htmlOutput += translatedToken;
        continue;
      }
    } else {
      // 2. Motion inputs with {X} placeholder (e.g., 214X, 236X, [4]6X)
      for (const rule of allRules) {
        if ((rule.type === 'motion' || rule.type === 'motion_charge') && rule.gameNotation.endsWith('X')) {
          const baseNotation = rule.gameNotation.slice(0, -1); // e.g., "214"
          if (token.startsWith(baseNotation) && token.length === baseNotation.length + 1) {
            const buttonChar = token.slice(-1); // e.g., "H"
            const buttonRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');
            if (buttonRule) {
              ruleFound = true;
              matchedRule = rule;
              const translatedButton = buttonRule[targetInputType];
              let baseMotionTranslation = matchedRule[targetInputType].replace('{X}', '').replace(/\s*\+\s*$/, ''); // Remove {X} and trailing +
              
              // Loại bỏ phần "(Không di chuyển)" nếu có
              baseMotionTranslation = baseMotionTranslation.replace(/\(Không di chuyển\)/g, "").trim();
              
              appliedStyleClass = getHighlightClass(matchedRule.type, targetInputType);
              translatedToken = `<span class="${appliedStyleClass}">${baseMotionTranslation}</span>` +
                                `<span class="${getHighlightClass('connector', targetInputType)}">+</span>` +
                                `<span class="${getHighlightClass(buttonRule.type, targetInputType, true)}">${translatedButton}</span>`;
              break;
            }
          }
        }
      }
    }
    
    // 3. Simple direction+button (e.g., 2U, c.5L, f.5M)
    if (!ruleFound && /^(c\.|f\.|j\.)?\d[LMHUS]$/.test(token)) {
        let prefix = "";
        let directionChar = "";
        let buttonChar = "";
        let tempToken = token;

        if (tempToken.startsWith("c.")) { prefix = "c."; tempToken = tempToken.substring(2); }
        else if (tempToken.startsWith("f.")) { prefix = "f."; tempToken = tempToken.substring(2); }
        else if (tempToken.startsWith("j.")) { prefix = "j."; tempToken = tempToken.substring(2); }

        directionChar = tempToken.charAt(0);
        buttonChar = tempToken.charAt(1);

        const dirRule = allRules.find(r => r.gameNotation === directionChar && r.type === 'direction');
        const btnRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');

        if (dirRule && btnRule) {
            ruleFound = true;
            const translatedDir = dirRule[targetInputType];
            const translatedBtn = btnRule[targetInputType];
            
            let tempHtml = "";
            
            // Nếu số 5 (không di chuyển) hoặc có prefix thì chỉ hiển thị nút
            if (dirRule.gameNotation === "5" || prefix) {
              tempHtml += `<span class="${getHighlightClass(btnRule.type, targetInputType)}">${translatedBtn}</span>`;
            } else {
              // Các số khác thì hiển thị hướng + nút
              tempHtml += `<span class="${getHighlightClass(dirRule.type, targetInputType)}">${translatedDir}</span>`;
              tempHtml += `<span class="${getHighlightClass('connector', targetInputType)}">+</span>`;
              tempHtml += `<span class="${getHighlightClass(btnRule.type, targetInputType)}">${translatedBtn}</span>`;
            }
            
            translatedToken = tempHtml;
        }
    }

    // Auto-combos and other specific strings
    if (!ruleFound && token === "c5XXX") {
        const c5xxxRule = inputGuide?.[targetInputType]?.["c.XXX"];
        if (c5xxxRule) {
            ruleFound = true; 
            // Bỏ các từ Gần, Không di chuyển
            translatedToken = c5xxxRule.replace(/\b(Gần|Không di chuyển|c\.)\b/gi, "").trim();
            appliedStyleClass = getHighlightClass('action', targetInputType);
        } else {
            // Fallback to generic translation
            ruleFound = true;
            translatedToken = "XXX (Auto Combo)";
            appliedStyleClass = getHighlightClass('action', targetInputType);
        }
    } else if (!ruleFound && token === "c5XX") {
        const c5xxRule = inputGuide?.[targetInputType]?.["c.XX"];
        if (c5xxRule) {
            ruleFound = true; 
            // Bỏ các từ Gần, Không di chuyển
            translatedToken = c5xxRule.replace(/\b(Gần|Không di chuyển|c\.)\b/gi, "").trim();
            appliedStyleClass = getHighlightClass('action', targetInputType);
        } else {
            // Fallback to generic translation
            ruleFound = true;
            translatedToken = "XX (Auto Combo)";
            appliedStyleClass = getHighlightClass('action', targetInputType);
        }
    } else if (!ruleFound && token === "(XX)") {
        const xxRule = allRules.find(rule => rule.gameNotation === "(XX)" && rule.type === 'modifier');
        if (xxRule) {
            ruleFound = true;
            translatedToken = xxRule[targetInputType] || "(XX)";
            appliedStyleClass = getHighlightClass('modifier', targetInputType);
        } else {
            ruleFound = true;
            translatedToken = "(XX)";
            appliedStyleClass = getHighlightClass('modifier', targetInputType);
        }
    } else if (!ruleFound && token === "f5X") {
        ruleFound = true;
        translatedToken = "X (Far Auto Attack)";
        appliedStyleClass = getHighlightClass('action', targetInputType);
    }
    // Xử lý các biến thể khác như c5L, f5M (không có dấu chấm)
    else if (!ruleFound && /^[cfj]5[LMHUS]$/.test(token)) {
        const buttonChar = token.charAt(2);
        
        const btnRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');
        
        if (btnRule) {
            ruleFound = true;
            // Chỉ hiển thị nút, không hiển thị prefix
            translatedToken = `<span class="${getHighlightClass(btnRule.type, targetInputType)}">${btnRule[targetInputType]}</span>`;
        }
    } else if (!ruleFound && /^\[\w+\]$/.test(token)) {
        // Handles [X] pattern (button hold)
        const buttonChar = token.substring(1, token.length - 1);
        const holdRuleTemplate = allRules.find(r => r.gameNotation === "[X]" && r.type === 'modifier_hold');
        
        if (holdRuleTemplate) {
            const buttonRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');
            ruleFound = true;
            
            let translatedButton = buttonChar;
            if (buttonRule) {
                translatedButton = buttonRule[targetInputType];
            }
            
            translatedToken = holdRuleTemplate[targetInputType].replace('{X}', translatedButton);
            appliedStyleClass = getHighlightClass('modifier', targetInputType);
        }
    } else if (!ruleFound && /^\]\w+\[$/.test(token)) {
        // Handles ]X[ pattern (button release)
        const buttonChar = token.substring(1, token.length - 1);
        const releaseRuleTemplate = allRules.find(r => r.gameNotation === "]X[" && r.type === 'modifier_release');
        
        if (releaseRuleTemplate) {
            const buttonRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');
            ruleFound = true;
            
            let translatedButton = buttonChar;
            if (buttonRule) {
                translatedButton = buttonRule[targetInputType];
            }
            
            translatedToken = releaseRuleTemplate[targetInputType].replace('{X}', translatedButton);
            appliedStyleClass = getHighlightClass('modifier', targetInputType);
        }
    } else if (!ruleFound && /^\[\w+\] or \[\w+\]$/.test(token)) {
        // Handles [X] or [Y] pattern (choice)
        const match = token.match(/^\[(\w+)\] or \[(\w+)\]$/);
        if (match) {
            const choiceRuleTemplate = allRules.find(r => r.gameNotation === "[X] or [Y]" && r.type === 'modifier_choice');
            
            if (choiceRuleTemplate) {
                const button1 = match[1];
                const button2 = match[2];
                const buttonRule1 = allRules.find(r => r.gameNotation === button1 && r.type === 'button');
                const buttonRule2 = allRules.find(r => r.gameNotation === button2 && r.type === 'button');
                
                let translatedButton1 = button1;
                let translatedButton2 = button2;
                
                if (buttonRule1) translatedButton1 = buttonRule1[targetInputType];
                if (buttonRule2) translatedButton2 = buttonRule2[targetInputType];
                
                ruleFound = true;
                translatedToken = choiceRuleTemplate[targetInputType]
                    .replace('{X}', translatedButton1)
                    .replace('{Y}', translatedButton2);
                appliedStyleClass = getHighlightClass('modifier', targetInputType);
            }
        }
    } else if (!ruleFound && /^\[sequence\] x(\d+)$/.test(token)) {
        // Handles [sequence] xN pattern (repeat)
        const match = token.match(/^\[sequence\] x(\d+)$/);
        if (match) {
            const repeatRuleTemplate = allRules.find(r => r.gameNotation === "[sequence] xN" && r.type === 'modifier_repeat');
            
            if (repeatRuleTemplate) {
                const repeatCount = match[1];
                ruleFound = true;
                translatedToken = repeatRuleTemplate[targetInputType].replace('{N}', repeatCount);
                appliedStyleClass = getHighlightClass('modifier', targetInputType);
            }
        }
    } else if (!ruleFound && /^\((\d+)\)$/.test(token)) {
        const match = token.match(/^\((\d+)\)$/);
        if (match) {
            const hitCountRuleTemplate = allRules.find(r => r.gameNotation === "(N)" && r.type === 'modifier_hitcount');
            
            if (hitCountRuleTemplate) {
                const hitCount = match[1];
                ruleFound = true;
                translatedToken = hitCountRuleTemplate[targetInputType].replace('{N}', hitCount);
                appliedStyleClass = getHighlightClass('modifier', targetInputType);
            }
        }
    }

    // Xử lý thêm cho các ký hiệu [X] nơi X là số (hướng)
    else if (!ruleFound && /^\[(\d)\]/.test(token)) {
      const match = token.match(/^\[(\d)\](\d)([LMHUS])?$/);
      if (match) {
        const holdDirection = match[1];
        const releaseDirection = match[2];
        const buttonChar = match[3]; // Có thể là undefined nếu không có nút

        const holdText = getHoldDirectionText(holdDirection, targetInputType);
        
        // Map các số thành hướng tương ứng
        const directionMap = {
          "keyboard": {
            "1": "S+A", "2": "S", "3": "S+D", "4": "A", "6": "D", "7": "W+A", "8": "W", "9": "W+D"
          },
          "controller": {
            "1": "Xuống-Lùi", "2": "Xuống", "3": "Xuống-Tiến", "4": "Lùi", "6": "Tiến", "7": "Lên-Lùi", "8": "Lên", "9": "Lên-Tiến"
          }
        };
        
        // Lấy text hướng giải phóng
        const releaseText = directionMap[targetInputType][releaseDirection] || releaseDirection;
        
        ruleFound = true;

        if (buttonChar) {
          // Nếu có nút (e.g. [4]6L, [2]8H)
          const btnRule = allRules.find(r => r.gameNotation === buttonChar && r.type === 'button');
          if (btnRule) {
            const buttonText = btnRule[targetInputType];
            
            // Format: Giữ A (1s) > D + U (đối với [4]6L trên bàn phím)
            translatedToken = `<span class="${getHighlightClass('motion_charge', targetInputType)}">${holdText}</span>` +
                             `<span class="${getHighlightClass('connector', targetInputType)}"> > </span>` +
                             `<span class="${getHighlightClass('direction', targetInputType)}">${releaseText}</span>` +
                             `<span class="${getHighlightClass('connector', targetInputType)}"> + </span>` +
                             `<span class="${getHighlightClass('button', targetInputType)}">${buttonText}</span>`;
          } else {
            // Nếu không tìm thấy quy tắc button, vẫn hiển thị ký hiệu ban đầu
            translatedToken = `<span class="${getHighlightClass('motion_charge', targetInputType)}">${holdText}</span>` +
                             `<span class="${getHighlightClass('connector', targetInputType)}"> > </span>` +
                             `<span class="${getHighlightClass('direction', targetInputType)}">${releaseText}</span>` +
                             `<span class="${getHighlightClass('connector', targetInputType)}"> + </span>` +
                             `<span class="${getHighlightClass('button', targetInputType)}">${buttonChar}</span>`;
          }
        } else {
          // Nếu không có nút, chỉ có dạng [4]6, [2]8
          translatedToken = `<span class="${getHighlightClass('motion_charge', targetInputType)}">${holdText}</span>` +
                           `<span class="${getHighlightClass('connector', targetInputType)}"> > </span>` +
                           `<span class="${getHighlightClass('direction', targetInputType)}">${releaseText}</span>`;
        }
      }
      else {
        // Xử lý các trường hợp như [4]6X, [2]8X
        const generalMatch = token.match(/^\[(\d)\](\d)X$/);
        if (generalMatch) {
          const holdDirection = generalMatch[1];
          const releaseDirection = generalMatch[2];
          
          const holdText = getHoldDirectionText(holdDirection, targetInputType);
          
          // Map các số thành hướng tương ứng
          const directionMap = {
            "keyboard": {
              "1": "S+A", "2": "S", "3": "S+D", "4": "A", "6": "D", "7": "W+A", "8": "W", "9": "W+D"
            },
            "controller": {
              "1": "Xuống-Lùi", "2": "Xuống", "3": "Xuống-Tiến", "4": "Lùi", "6": "Tiến", "7": "Lên-Lùi", "8": "Lên", "9": "Lên-Tiến"
            }
          };
          
          // Lấy text hướng giải phóng
          const releaseText = directionMap[targetInputType][releaseDirection] || releaseDirection;
          
          ruleFound = true;
          
          // Format: Giữ A (1s) > D + nút
          translatedToken = `<span class="${getHighlightClass('motion_charge', targetInputType)}">${holdText}</span>` +
                           `<span class="${getHighlightClass('connector', targetInputType)}"> > </span>` +
                           `<span class="${getHighlightClass('direction', targetInputType)}">${releaseText}</span>` +
                           `<span class="${getHighlightClass('connector', targetInputType)}"> + nút</span>`;
        }
      }
    }

    // Xử lý thêm cho các ký hiệu prefix riêng lẻ
    else if (!ruleFound && (token === "c." || token === "f." || token === "j.")) {
        // Không hiển thị prefix, nhưng vẫn đánh dấu là đã xử lý
        ruleFound = true;
        translatedToken = ""; // Không hiển thị gì cả
    }

    // Xử lý trường hợp ">" (tiếp theo)
    else if (!ruleFound && token === ">") {
        ruleFound = true;
        translatedToken = `<span class="${getHighlightClass('connector', targetInputType)}">></span>`;
    }

    if (ruleFound) {
        if (translatedToken.includes("<span")) { 
            htmlOutput += translatedToken;
        } else {
            htmlOutput += `<span class="${appliedStyleClass}">${translatedToken}</span>`;
        }
    } else {
      htmlOutput += `<span class="text-slate-700 dark:text-slate-200">${token}</span>`;
    }
  }
  
  // Lưu kết quả vào cache trước khi trả về
  const result = { __html: htmlOutput };
  comboCache.set(cacheKey, result);
  return result;
};

const ComboTable = ({ combosData = [], inputGuide }) => {
  const [activeInputType, setActiveInputType] = useState('keyboard');
  const [showTooltip, setShowTooltip] = useState(false);

  if (!combosData || combosData.length === 0) {
    return <p className="text-center py-4 text-gray-500 dark:text-gray-400">Không có dữ liệu combo để hiển thị.</p>;
  }

  // Sử dụng useMemo để tránh tạo lại các mục hướng dẫn màu sắc khi render lại
  const colorGuideItems = useMemo(() => [
    { label: 'Hướng (Di chuyển)', class: getHighlightClass('direction', activeInputType) },
    { label: 'Nút', class: getHighlightClass('button', activeInputType) },
    { label: 'Đòn Đặc biệt', class: getHighlightClass('special', activeInputType) },
    { label: 'Super', class: getHighlightClass('super', activeInputType) },
    { label: 'Motion Input', class: getHighlightClass('motion', activeInputType) },
    { label: 'Charge Motion', class: getHighlightClass('motion_charge', activeInputType) },
    { label: 'Kết nối (> , +)', class: getHighlightClass('connector', activeInputType) },
    { label: 'Bổ sung/Điều kiện', class: getHighlightClass('modifier', activeInputType) },
  ], [activeInputType]);

  const headers = ['Combo', 'Vị trí', 'Meter Gain', 'Hiệu quả với', 'Độ khó', 'Ghi chú'];

  // Xử lý click nút chuyển đổi input type
  const handleInputTypeChange = (type) => {
    setActiveInputType(type);
  }

  return (
    <div className="my-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">Danh sách Combo</h2>
          
          <div className="relative">
            <button 
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
              onClick={() => setShowTooltip(!showTooltip)}
              aria-expanded={showTooltip}
              aria-haspopup="true"
            >
              {showTooltip ? 'Ẩn chú thích' : 'Xem chú thích màu sắc'}
            </button>
            
            {showTooltip && (
              <div className="absolute right-0 z-10 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg p-3 text-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Ý nghĩa màu sắc</h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {colorGuideItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className={`${item.class} mr-2`}>■</span>
                      <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-1">
                  Nhấn vào "Bàn phím" hoặc "Controller" để chuyển đổi hiển thị.
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-3">
          <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">Hiển thị input cho:</span>
          <button
            onClick={() => handleInputTypeChange('keyboard')}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md mr-2 transition-colors duration-150 ${activeInputType === 'keyboard' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            aria-pressed={activeInputType === 'keyboard'}
          >
            Bàn phím
          </button>
          <button
            onClick={() => handleInputTypeChange('controller')}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-colors duration-150 ${activeInputType === 'controller' ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            aria-pressed={activeInputType === 'controller'}
          >
            Controller
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-750">
            <tr>
              {headers.map(header => (
                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {combosData.map((comboItem, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                  <div className="font-mono leading-relaxed" dangerouslySetInnerHTML={parseAndTranslateCombo(comboItem.combo, activeInputType, inputGuide, parsedTranslationRules)} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{comboItem.position}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{comboItem.meterGain || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{comboItem.worksOn}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    comboItem.difficulty === 'Very Easy' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                    comboItem.difficulty === 'Easy' ? 'bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100' :
                    comboItem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                    comboItem.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                    comboItem.difficulty === 'Very Hard' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                  }`}>
                    {comboItem.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">{comboItem.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComboTable;
