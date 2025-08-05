import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React from 'react';
import { mockMajorLabs } from '@/features/lab/mock/mockMajorLabs';
import LabCard from '@/features/lab/components/LabCard';

interface ViewMoreRecommendedLabFrameProps {
  setRecommendedLabMode: (value: boolean) => void;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0 0 0;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  justify-content: space-between;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const BackIconWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const TitleWithTagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px;
  flex: 1 0 0;
  align-self: stretch;
  height: fit-content;
`;

const DoubleCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ViewMoreRecommendedLabFrame: React.FC<ViewMoreRecommendedLabFrameProps> = ({
  setRecommendedLabMode,
}) => {
  const labList = mockMajorLabs;
  const navigate = useNavigate();

  const evenIndexLabs = labList.filter((_, index) => index % 2 === 0);
  const oddIndexLabs = labList.filter((_, index) => index % 2 === 1);

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderLeftWrapper>
          <BackIconWrapper>
            <Icon
              type="ChevronLeft"
              size={24}
              color="#aaa"
              onClick={() => setRecommendedLabMode(false)}
            />
          </BackIconWrapper>
          <TitleWithTagWrapper>
            <Typography type="BiggerBold">추천 연구실 모아보기</Typography>
          </TitleWithTagWrapper>
        </HeaderLeftWrapper>
      </HeaderContainer>
      <DoubleCardsWrapper>
        <CardsWrapper>
          {evenIndexLabs.map((lab, index) => (
            <LabCard
              key={index}
              name={lab.name}
              department={lab.department}
              professor={lab.professor}
              summary={lab.summary}
              fieldList={lab.fieldList}
              onClick={() => navigate(`/lab/${index}`)}
            />
          ))}
        </CardsWrapper>
        <CardsWrapper>
          {oddIndexLabs.map((lab, index) => (
            <LabCard
              key={index}
              name={lab.name}
              department={lab.department}
              professor={lab.professor}
              summary={lab.summary}
              fieldList={lab.fieldList}
              onClick={() => navigate(`/lab/${index}`)}
            />
          ))}
        </CardsWrapper>
      </DoubleCardsWrapper>
    </MainContainer>
  );
};
