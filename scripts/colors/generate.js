/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @fileoverview Color Token Generator
 *
 * 이 스크립트는 src/styles/color.css에서 정의된 CSS 변수들을 파싱하여
 * TypeScript에서 타입 안전하게 사용할 수 있는 color.ts 파일을 생성합니다.
 *
 * @description
 * - 입력: src/styles/color.css (CSS 변수 정의)
 * - 출력: src/utils/color.ts (TypeScript 상수 및 타입)
 *
 * @usage
 * pnpm generate:colors
 *
 * @note
 * - color.css 수정 후 반드시 이 스크립트를 실행해야 color.ts에 반영됩니다.
 * - src/utils/color.ts 파일은 직접 수정하지 마세요. 스크립트 실행 시 덮어씌워집니다.
 */

const fs = require("fs");
const path = require("path");

// ==================================================
// Configuration
// ==================================================

/** CSS 변수가 정의된 소스 파일 경로 */
const COLOR_CSS_PATH = path.resolve(__dirname, "../../src/styles/color.css");

/** 생성될 TypeScript 파일 경로 */
const OUTPUT_PATH = path.resolve(__dirname, "../../src/constants/color.ts");

/** Tailwind CSS prefix (globals.css의 prefix 설정과 일치해야 함) */
const CSS_PREFIX = "ygi";

// ==================================================
// Parser Functions
// ==================================================

/**
 * CSS 파일에서 --color-* 변수들을 추출합니다.
 * @param {string} cssContent - CSS 파일 내용
 * @returns {Array<{name: string, value: string}>} 변수 목록
 */
function parseCssVariables(cssContent) {
  const variableRegex = /--color-([a-zA-Z0-9-]+):\s*([^;]+);/g;
  const variables = [];

  let match;
  while ((match = variableRegex.exec(cssContent)) !== null) {
    const [, name, value] = match;
    variables.push({ name, value: value.trim() });
  }

  return variables;
}

/**
 * CSS 변수 참조(var(--...))를 실제 값으로 해석합니다.
 * 중첩된 참조도 재귀적으로 해석합니다.
 *
 * @param {string} value - CSS 값 (hex, rgba, 또는 var() 참조)
 * @param {Object} variableMap - 변수명 -> 값 매핑
 * @returns {string} 해석된 실제 색상 값
 */
function resolveValue(value, variableMap) {
  const varMatch = value.match(
    new RegExp(`var\\(--${CSS_PREFIX}-color-([^)]+)\\)`)
  );
  if (varMatch) {
    const refName = varMatch[1];
    const resolvedValue = variableMap[refName];
    if (resolvedValue) {
      return resolveValue(resolvedValue, variableMap);
    }
  }
  return value;
}

// ==================================================
// Builder Functions
// ==================================================

/**
 * 파싱된 변수들을 중첩된 객체 구조로 변환합니다.
 *
 * @description
 * CSS 변수 네이밍 규칙:
 * - Palette: --color-palette-{category}-{key} (예: --color-palette-gray-500)
 * - Semantic: --color-{category}-{key} (예: --color-text-primary)
 *
 * @param {Array<{name: string, value: string}>} variables
 * @returns {{palette: Object, semantic: Object}}
 */
function buildNestedObject(variables) {
  const palette = {};
  const semantic = {};

  // 먼저 모든 변수의 값을 맵에 저장 (참조 해석용)
  const variableMap = {};
  for (const { name, value } of variables) {
    variableMap[name] = value;
  }

  for (const { name, value } of variables) {
    const parts = name.split("-");
    const resolvedValue = resolveValue(value, variableMap);

    if (parts[0] === "palette") {
      // Palette tokens: palette-common-black, palette-gray-50, palette-opacity-gray-16
      const category = parts[1];

      if (category === "opacity") {
        // Opacity tokens: opacity-gray-16, opacity-primary-80
        const subCategory = parts[2];
        const key = parts[3];

        if (!palette.opacity) palette.opacity = {};
        if (!palette.opacity[subCategory]) palette.opacity[subCategory] = {};
        palette.opacity[subCategory][key] = resolvedValue;
      } else {
        // Regular palette tokens: common-black, gray-50
        const key = parts[2];

        if (!palette[category]) palette[category] = {};
        palette[category][key] = resolvedValue;
      }
    } else {
      // Semantic tokens: bg-white, surface-primary, button-primary-hover
      const category = parts[0];
      const rest = parts.slice(1).join("-");

      if (!semantic[category]) semantic[category] = {};
      semantic[category][toCamelCase(rest)] = resolvedValue;
    }
  }

  return { palette, semantic };
}

/**
 * kebab-case를 camelCase로 변환합니다.
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
  return str.replace(/-([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());
}

// ==================================================
// Generator Functions
// ==================================================

/**
 * TypeScript 파일 내용을 생성합니다.
 * @param {{palette: Object, semantic: Object}} colorObj
 * @returns {string} TypeScript 파일 내용
 */
function generateTypeScript(colorObj) {
  const { palette, semantic } = colorObj;

  const formatValue = (obj, indent = 2) => {
    const spaces = " ".repeat(indent);
    const entries = Object.entries(obj);

    const lines = entries.map(([key, value]) => {
      const safeKey = /^\d/.test(key) ? `"${key}"` : key;

      if (typeof value === "object") {
        return `${spaces}${safeKey}: ${formatValue(value, indent + 2)}`;
      }
      return `${spaces}${safeKey}: "${value}"`;
    });

    return `{\n${lines.join(",\n")},\n${" ".repeat(indent - 2)}}`;
  };

  const paletteStr = formatValue(palette, 4);
  const semanticEntries = Object.entries(semantic)
    .map(([key, value]) => `  ${key}: ${formatValue(value, 4)}`)
    .join(",\n");

  return `/**
 * @fileoverview Auto-generated Color Tokens
 *
 * 이 파일은 scripts/colors/generate.js에 의해 자동 생성됩니다.
 * 직접 수정하지 마세요. 수정 사항은 스크립트 실행 시 덮어씌워집니다.
 *
 * @generated
 * @see scripts/colors/generate.js
 *
 * @description
 * src/styles/color.css에서 정의된 디자인 토큰을 TypeScript에서 사용할 수 있도록
 * 변환한 상수입니다. Tailwind 유틸리티 클래스 대신 직접 색상 값이 필요한 경우 사용합니다.
 *
 * @example 기본 사용법
 * \`\`\`tsx
 * import { colors } from "#/constants/color";
 *
 * // Semantic 토큰 사용 (권장)
 * <div style={{ color: colors.text.primary }}>텍스트</div>
 * <div style={{ backgroundColor: colors.surface.primary }}>배경</div>
 *
 * // Palette 토큰 사용 (특수한 경우에만)
 * <div style={{ borderColor: colors.palette.gray[300] }}>테두리</div>
 * \`\`\`
 *
 * @example 조건부 스타일링
 * \`\`\`tsx
 * const getBorderColor = (isError: boolean) =>
 *   isError ? colors.border.primary : colors.border.default;
 * \`\`\`
 *
 * @important
 * - 가능하면 Tailwind 유틸리티 클래스(ygi:text-text-primary)를 우선 사용하세요.
 * - 동적 스타일링이나 JS에서 색상 값이 필요한 경우에만 이 모듈을 사용하세요.
 * - Palette 토큰보다 Semantic 토큰 사용을 권장합니다. (디자인 일관성 유지)
 */

export const colors = {
  /**
   * Palette Colors (기본 색상 팔레트)
   *
   * @description
   * 디자인 시스템의 기본 색상 값입니다.
   * 가능하면 semantic 토큰을 사용하고, palette는 특수한 경우에만 직접 참조하세요.
   *
   * @example
   * colors.palette.gray[500]    // "#6b7280"
   * colors.palette.primary[500] // "#ff5a3c"
   */
  palette: ${paletteStr},
${semanticEntries},
} as const;

/** 전체 colors 객체의 타입 */
export type Colors = typeof colors;

/** Palette 색상 타입 */
export type PaletteColors = typeof colors.palette;

/** Background 색상 타입 */
export type BgColors = typeof colors.bg;

/** Surface 색상 타입 */
export type SurfaceColors = typeof colors.surface;

/** Text 색상 타입 */
export type TextColors = typeof colors.text;

/** Border 색상 타입 */
export type BorderColors = typeof colors.border;

/** Icon 색상 타입 */
export type IconColors = typeof colors.icon;

/** Button 색상 타입 */
export type ButtonColors = typeof colors.button;
`;
}

// ==================================================
// Main
// ==================================================

function main() {
  console.log("🎨 Color Token Generator\n");

  console.log("📖 Reading color.css...");
  const cssContent = fs.readFileSync(COLOR_CSS_PATH, "utf-8");

  console.log("🔍 Parsing CSS variables...");
  const variables = parseCssVariables(cssContent);
  console.log(`   Found ${variables.length} color variables`);

  console.log("🏗️  Building color object...");
  const colorObj = buildNestedObject(variables);

  console.log("📝 Generating TypeScript...");
  const tsContent = generateTypeScript(colorObj);

  console.log(`💾 Writing to ${OUTPUT_PATH}...`);
  fs.writeFileSync(OUTPUT_PATH, tsContent, "utf-8");

  console.log("\n✅ Done! Color tokens generated successfully.");
}

main();
