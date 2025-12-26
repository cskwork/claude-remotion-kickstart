export const CONTENT = {
  // Hook - 흥미 유발
  hook: {
    scenario:
      "오늘 여의도 근처에서 회식해야 하는데\n어디갈지 모르겠어...",
    request:
      "동아출판에서 가까운 고깃집 추천해줘\n고기 먹고 근처 핫한 커피집에서 커피 마시고 갈거야\n경로 안내도 필요해 링크도 같이 해서 카톡 보내",
  },

  // 문제점 제시
  problems: {
    title: "AI 사용, 이런 걱정 있으시죠?",
    items: [
      {
        icon: "?",
        title: "할루시네이션",
        desc: "예측 어려운 출력\n\"선물 포장지에 감싼 쓰레기\"",
        color: "red",
      },
      {
        icon: "!",
        title: "보안 유출",
        desc: "데이터 유출되면?\n해킹 당하면?",
        color: "yellow",
      },
      {
        icon: "...",
        title: "난이도",
        desc: "너무 쓰기 어려운 것 같아\n새로운 걸 배워야 해",
        color: "blue",
      },
    ],
  },

  // 써야 하는 이유
  whyUse: {
    title: "그래서 안 쓸 건가요?",
    points: [
      "Anthropic, Google, 빅테크는 이미 활용 중",
      "짧은 시간에 더 많은 일을 할 수 있고",
      "그 속도는 점점 가속화되고 있습니다",
    ],
    punchline: "내가 안 하면\nAI 쓰는 사람이 먼저 퇴근합니다",
  },

  // 해결책 - 난이도
  solutionDifficulty: {
    title: "난이도 해결",
    subtitle: "생각보다 쉽습니다",
    points: [
      "설치 후 기본적인 실행은 간단",
      "MCP로 쉽게 확장",
    ],
    mcpExamples: ["Jira", "Unit Test", "Bruno", "Figma"],
  },

  // 해결책 - 보안
  solutionSecurity: {
    title: "보안 해결",
    subtitle: "Claude Code의 보안 기능",
    points: [
      "내장된 보안 기능 제공",
      "코드 실행 전 확인 절차",
      "민감 정보 자동 감지",
    ],
    warning: {
      title: "주의할 점",
      content: "데이터 학습 기능 끄기",
    },
  },

  // 해결책 - 할루시네이션
  solutionHallucination: {
    title: "할루시네이션 해결",
    subtitle: "정확도를 높이는 방법",
    strategies: [
      { title: "시스템 프롬프트", desc: "명확한 지시 제공" },
      { title: "마음 이론", desc: "배경지식/맥락 제공" },
      { title: "컨텍스트 관리", desc: "관련 정보만 전달" },
      { title: "플랜 모드", desc: "단계별 계획 수립" },
      { title: "코드 리뷰", desc: "Git으로 변경 관리" },
    ],
  },

  // 정리
  summary: {
    title: "정리",
    points: [
      "난이도 - 설치 간단, MCP 확장",
      "보안 - 내장 기능 + 학습 끄기",
      "할루시네이션 - 프롬프트 + 맥락 + 리뷰",
    ],
    cta: "지금 바로 시작하세요",
  },
};
