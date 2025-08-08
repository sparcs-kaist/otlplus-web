import React from 'react';
import styled from 'styled-components';
import DetailPaperCard from '@/features/lab/components/DetailPaperCard';
import { mockDetailPaperCard } from '@/features/lab/mock/mockDetailPaperCard';
import Typography from '@/common/daily-tf/Typography';
import Icon from '@/common/daily-tf/Icon';

interface RecommendedPaperFrameProps {
  setRecommendedPaperMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const BackIconWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const CardsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  align-items: stretch;
`;

export const RecommendedPaperFrame: React.FC<RecommendedPaperFrameProps> = ({
  setRecommendedPaperMode,
}) => {
  return (
    <MainContainer>
      <HeaderWrapper>
        <HeaderLeftWrapper>
          <BackIconWrapper onClick={() => setRecommendedPaperMode(false)}>
            <Icon type="ChevronLeft" size={24} color="#aaa" />
          </BackIconWrapper>
          <Typography type="BiggerBold">최신 논문 모아보기</Typography>
        </HeaderLeftWrapper>
      </HeaderWrapper>

      <CardsGridWrapper>
        {mockDetailPaperCard.map((paper, idx) => (
          <DetailPaperCard
            key={idx}
            title={paper.title}
            summary={paper.summary}
            tags={paper.tags}
          />
        ))}
      </CardsGridWrapper>
    </MainContainer>
  );
};
