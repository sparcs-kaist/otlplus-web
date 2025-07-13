interface MockReviewProps {
  professor: string;
  professorId: number;
  content: string;
  like: number;
  grade: string;
  load: string;
  lecture: string;
}
export const mockReview: () => MockReviewProps[] = () => [
  {
    professor: '교수명',
    professorId: 1,
    content:
      '개별연구 주제를 설정할 때 많은 조언을 주셔서 연구 방향을 잡는 데 큰 도움이 됐습니다. 매주 미팅에서 꼼꼼히 피드백 주셨어요.',
    like: 15,
    grade: 'A+',
    load: 'B',
    lecture: 'A',
  },
  {
    professor: '교수명',
    professorId: 1,
    content:
      '자율성이 높은 수업이지만, 교수님이 논문 작성 경험을 적극적으로 공유해 주셔서 연구를 처음 시작하는 사람에게도 좋았습니다.',
    like: 18,
    grade: 'A',
    load: 'A',
    lecture: 'A+',
  },
  {
    professor: '교수명',
    professorId: 1,
    content:
      '연구 설계에 있어 독립적인 판단을 요구하시지만, 중간중간 날카로운 질문으로 방향을 잘 잡아주십니다.',
    like: 12,
    grade: 'A-',
    load: 'B',
    lecture: 'B+',
  },
  {
    professor: '교수명',
    professorId: 1,
    content:
      '연구 진행은 스스로 해야 하지만, 일정 관리와 자료 조사는 교수님이 도와주셔서 성과를 내는 데 큰 도움이 됐습니다.',
    like: 22,
    grade: 'A',
    load: 'B',
    lecture: 'A',
  },
  {
    professor: '교수명',
    professorId: 1,
    content:
      '자유도가 매우 높고, 주도적으로 연구할 수 있는 기회입니다. 교수님의 논문 피드백이 실질적인 도움이 되었어요.',
    like: 9,
    grade: 'B+',
    load: 'C',
    lecture: 'A',
  },
  {
    professor: '교수명',
    professorId: 1,
    content:
      '매주 미팅을 통해 연구 내용을 정리하고, 최종 결과물을 학기 말에 발표하는 방식이 연구역량을 키우는 데 효과적이었습니다.',
    like: 19,
    grade: 'A',
    load: 'A',
    lecture: 'A+',
  },
];
