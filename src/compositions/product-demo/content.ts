export const CONTENT = {
  // 타이틀
  title: "Python 함수 배우기",
  subtitle: "Step by Step 기초 강좌",

  // 개념 설명
  conceptHeader: "함수(Function)란?",
  conceptBody:
    "함수는 특정 작업을 수행하는 코드 블록입니다.\n재사용 가능하고, 코드를 깔끔하게 정리할 수 있습니다.",

  // 전체 코드
  pythonCode: `def greet(name: str) -> str:
    """인사 메시지를 반환합니다."""
    message = f"안녕하세요, {name}님!"
    print(message)
    return message

# 함수 사용 예시
greet("홍길동")`,

  // 라인별 설명
  line1: {
    header: "1단계: 함수 정의",
    body: "def 키워드로 함수를 선언합니다.\nname: str은 문자열 매개변수,\n-> str은 반환 타입을 의미합니다.",
    highlight: "1",
  },
  line2: {
    header: "2단계: Docstring",
    body: "삼중 따옴표로 함수 설명을 작성합니다.\n다른 개발자가 함수를 이해하는 데 도움이 됩니다.",
    highlight: "2",
  },
  line3to5: {
    header: "3단계: 함수 본문",
    body: "f-string으로 메시지를 만들고,\nprint()로 출력한 후,\nreturn으로 값을 반환합니다.",
    highlight: "3-5",
  },
  usage: {
    header: "4단계: 함수 호출",
    body: "함수 이름과 괄호로 호출합니다.\n괄호 안에 인자를 전달하면\n함수가 실행됩니다.",
    highlight: "8",
  },

  // 다이어그램
  diagramTitle: "함수 실행 흐름",
  diagram: `direction: right

입력: {
  shape: oval
  label: "greet(\\"홍길동\\")"
}

함수: {
  label: "greet 함수"

  1: "message 생성"
  2: "화면에 출력"
  3: "값 반환"

  1 -> 2 -> 3
}

출력: {
  shape: oval
  label: "\\"안녕하세요, 홍길동님!\\""
}

입력 -> 함수
함수 -> 출력`,

  // 정리
  summaryHeader: "오늘 배운 내용",
  summaryPoints: [
    "def 키워드로 함수 정의",
    "타입 힌트로 코드 가독성 향상",
    "docstring으로 함수 설명 작성",
    "return으로 값 반환",
  ],
};
