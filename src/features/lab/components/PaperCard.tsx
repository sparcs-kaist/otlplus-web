'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

export interface PaperCardProps {
  title: string; // 논문 제목
  summary: string; // 연구실 요약 설명
  fieldList: string[]; // 분야 해시태그
  onClick?: (val: number) => void;
}

const LabCardContainer = styled.div`
  display: flex;
  width: 330px;
  height: 299px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
`;

const FieldTagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const TagBlock = styled.div`
  display: flex;
  height: 32px;
  padding: 8px 10px;
  align-items: center;
  gap: 6px;
  border-radius: 16px;
  background-color: #f5f5f5;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: #888;
`;

const SummaryAndMore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 4px;
  height: 165px;
  align-self: stretch;
`;

const PaperButton = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PaperCard: React.FC<PaperCardProps> = ({ title, summary, fieldList, onClick }) => {
  return (
    <LabCardContainer>
      <Typography type="NormalBold">{title}</Typography>
      <FieldTagWrapper>
        {fieldList.map((item, i) => (
          <TagBlock key={i}># {item}</TagBlock>
        ))}
      </FieldTagWrapper>
      <SummaryAndMore>
        <Typography type="Normal" color="Text.light">
          {summary}
        </Typography>
        <PaperButton>
          <Typography type="NormalBold" color="Highlight.default">
            더보기
          </Typography>
        </PaperButton>
      </SummaryAndMore>
    </LabCardContainer>
  );
};

export default PaperCard;
