interface MockPaperListProps {
  title: string;
  fieldList: string[];
  summary: string;
  paperId: number;
  department: string;
}

export const mockPaperList: () => MockPaperListProps[] = () => [
  {
    title: 'A Graph-based Interface for Interactive Literature Exploration',
    fieldList: ['HCI', '문헌 탐색', '그래프 인터페이스'],
    summary:
      '노드-링크 다이어그램을 사용하여 논문을 탐색하는 인터페이스를 제안합니다. 사용자는 시각적으로 문헌을 구조화할 수 있습니다.',
    paperId: 1,
    department: '전자',
  },
  {
    title: 'Enhancing Scientific Writing with LLM-based Feedback',
    fieldList: ['자연어처리', '과학 작문', 'LLM'],
    summary:
      '과학 작문 초안에 대해 LLM 기반 피드백을 제공하여 작성자의 논리적 흐름을 보완할 수 있도록 돕는 시스템입니다.',
    paperId: 1,
    department: '전자',
  },
  {
    title: 'Node-Link Diagrams as Thinking Tools for Researchers',
    fieldList: ['정보 시각화', '연구 방법론', 'UX'],
    summary:
      '연구 아이디어를 구성하고 발전시키는 데 도움이 되는 노드-링크 기반 사고 도구를 제안합니다.',
    paperId: 1,
    department: '전자',
  },
  {
    title:
      'Note-Taking in Literature Graphs: An Empirical Study - A Systematic Review in Affinity Diagram and the Use of Post-it Notes',
    fieldList: ['Related Work', '문헌 구조화', '시각화'],
    summary:
      '관련 연구 단원을 구성할 때 그래프 기반 구조화를 활용하여 논리적 흐름을 명확히 할 수 있도록 지원합니다.',
    paperId: 1,
    department: '산디',
  },
  {
    title: 'Reducing Research Anxiety through Visual Organization',
    fieldList: ['연구 UX', '감정 설계', '정보 시각화'],
    summary:
      '논문 구조를 시각적으로 표현함으로써 문헌조사 과정에서의 불안감을 줄이는 인터페이스를 설계했습니다.',
    paperId: 1,
    department: '산디',
  },
  {
    title: 'Designing a Multi-device Research Canvas System',
    fieldList: ['디바이스 연동', '협업 도구', 'UX'],
    summary:
      '데스크탑과 태블릿 간의 연동을 통해 더 나은 연구 워크플로우를 제공하는 멀티디바이스 지원 시스템을 제안합니다.',
    paperId: 1,
    department: '산디',
  },
  {
    title:
      'Note-Taking in Literature Graphs: An Empirical Study - A Systematic Review in Affinity Diagram and the Use of Post-it Notes',
    fieldList: ['사용성 평가', '노트 기능', '문헌조사'],
    summary: '문헌 그래프 위에 메모를 작성하는 기능의 유용성을 실험을 통해 검증하였습니다.',
    paperId: 1,
    department: '전산',
  },
];
