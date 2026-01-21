# Color Token Generator

CSS 변수로 정의된 디자인 토큰을 TypeScript에서 타입 안전하게 사용할 수 있도록 변환하는 스크립트입니다.

## 실행 방법

```bash
pnpm generate:colors
```

## 파일 구조

```
scripts/colors/
├── generate.js    # 생성 스크립트
└── README.md      # 이 문서

src/styles/
└── color.css      # 입력: CSS 변수 정의

src/constants/
└── color.ts       # 출력: TypeScript 상수 및 타입 (자동 생성)
```

## 워크플로우

1. 디자이너가 Figma에서 색상 토큰 정의
2. `src/styles/color.css`에 CSS 변수로 추가
3. `pnpm generate:colors` 실행
4. `src/constants/color.ts` 자동 생성

## 사용 가이드

### Tailwind 유틸리티 vs colors 객체

| 상황 | 권장 방법 |
|------|----------|
| 정적 스타일링 | Tailwind 유틸리티 (`ygi:text-text-primary`) |
| 동적 스타일링 | colors 객체 (`colors.text.primary`) |
| JS에서 색상 값 필요 | colors 객체 |
| 조건부 색상 | colors 객체 |

### 코드 예시

```tsx
import { colors } from "#/constants/color";

// 정적 스타일 - Tailwind 유틸리티 사용 (권장)
<div className="ygi:text-text-primary ygi:bg-surface-white">
  정적 스타일
</div>

// 동적 스타일 - colors 객체 사용
<div style={{
  color: isActive ? colors.text.primary : colors.text.disabled,
  backgroundColor: colors.surface.primary
}}>
  동적 스타일
</div>

// 타입 활용
import type { TextColors } from "#/constants/color";

const getTextColor = (variant: keyof TextColors) => colors.text[variant];
```

### Semantic vs Palette 토큰

```tsx
// Semantic 토큰 사용 (권장)
// 디자인 의도가 명확하고, 나중에 색상 변경 시 일괄 적용됨
colors.text.primary      // 주요 텍스트
colors.surface.disabled  // 비활성 배경

// Palette 토큰 사용 (특수한 경우에만)
// 특정 색상 값이 명시적으로 필요한 경우
colors.palette.gray[500]
colors.palette.primary[300]
```

## 주의사항

- `src/constants/color.ts`는 **직접 수정하지 마세요**. 스크립트 실행 시 덮어씌워집니다.
- `color.css` 수정 후 반드시 `pnpm generate:colors`를 실행하세요.
- Tailwind prefix(`ygi`)가 변경되면 `generate.js`의 `CSS_PREFIX` 상수도 수정해야 합니다.
