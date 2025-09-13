'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/common/daily-tf/Typography';
import { useTranslation } from 'react-i18next';

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
  border: 1px solid ${({ theme }) => theme.colors.Line.default};
  background-color: ${({ theme }) => theme.colors.Background.Section.default};
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
  color: ${({ theme }) => theme.colors.Text.light};
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
  background-color: ${({ theme }) => theme.colors.Background.Block.default};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: ${({ theme }) => theme.colors.Text.lighter};
`;

const MoreText = styled.div`
  color: ${({ theme }) => theme.colors.Highlight.default};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: auto;
`;

const DetailPaperCard: React.FC<DetailPaperCardProps> = ({ title, summary, tags, onClickMore }) => {
  const { t } = useTranslation();

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

      <MoreText onClick={onClickMore}>{t('ui.button.seeMore')}</MoreText>
    </PaperCardContainer>
  );
};

export default DetailPaperCard;
