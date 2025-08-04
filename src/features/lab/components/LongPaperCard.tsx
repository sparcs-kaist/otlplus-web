'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

export interface LongPaperCardProps {
  title: string; // 논문 제목
  summary: string; // 연구실 요약 설명
  fieldList: string[]; // 분야 해시태그
  onClick?: (val: number) => void;
}

const LabCardContainer = styled.div`
  border-radius: 6px;
  width: 100%;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  gap: 11px;
  //align-self: stretch;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
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

const PaperButton = styled.div`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PaperButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleContainer = styled.div`
  align-self: stretch;
`;

const SummaryContainer = styled.div`
  height: 14px;
  align-self: stretch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LongPaperCard: React.FC<LongPaperCardProps> = ({ title, summary, fieldList, onClick }) => {
  return (
    <LabCardContainer>
      <TitleContainer>
        <Typography type="NormalBold">{title}</Typography>
      </TitleContainer>
      <SummaryContainer>
        <Typography type="Normal" color="Text.light">
          {summary}
        </Typography>
      </SummaryContainer>
      <BottomWrapper>
        <FieldTagWrapper>
          {fieldList.map((item, i) => (
            <TagBlock key={i}># {item}</TagBlock>
          ))}
        </FieldTagWrapper>
        <PaperButtonWrapper>
          <PaperButton>
            <Typography type="NormalBold" color="Highlight.default">
              발행 연구실로 이동
            </Typography>
          </PaperButton>
          <PaperButton>
            <Typography type="NormalBold" color="Highlight.default">
              더보기
            </Typography>
          </PaperButton>
        </PaperButtonWrapper>
      </BottomWrapper>
    </LabCardContainer>
  );
};

export default LongPaperCard;
