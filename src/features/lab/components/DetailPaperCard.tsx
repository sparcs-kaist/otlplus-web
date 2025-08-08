'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/common/daily-tf/Typography';

export interface DetailPaperCardProps {
  title: string;
  summary: string;
  tags: string[];
  onClickMore?: () => void;
}

const PaperCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  gap: 16px;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const SummaryWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const TagListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

const MoreText = styled.div`
  color: #e85570;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: auto;
`;

const DetailPaperCard: React.FC<DetailPaperCardProps> = ({ title, summary, tags, onClickMore }) => {
  return (
    <PaperCardContainer>
      <TitleWrapper>
        <Typography type="BigBold">{title}</Typography>
      </TitleWrapper>

      <ContentWrapper>
        <TagListWrapper>
          {tags.map((tag, i) => (
            <TagBlock key={i}># {tag}</TagBlock>
          ))}
        </TagListWrapper>
        <SummaryWrapper>{summary}</SummaryWrapper>
      </ContentWrapper>

      <MoreText onClick={onClickMore}>더보기</MoreText>
    </PaperCardContainer>
  );
};

export default DetailPaperCard;
