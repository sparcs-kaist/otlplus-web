import React from 'react';
import styled, { useTheme } from 'styled-components';
import DetailPaperCard from '@/features/lab/components/DetailPaperCard';
import { mockDetailPaperCard } from '@/features/lab/mock/mockDetailPaperCard';
import Typography from '@/common/daily-tf/Typography';
import Icon from '@/common/daily-tf/Icon';
import { useTranslation } from 'react-i18next';

interface LatestPaperFrameProps {
  setLatestPaperMode: React.Dispatch<React.SetStateAction<boolean>>;
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

export const LatestPaperFrame: React.FC<LatestPaperFrameProps> = ({ setLatestPaperMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainContainer>
      <HeaderWrapper>
        <HeaderLeftWrapper>
          <BackIconWrapper onClick={() => setLatestPaperMode(false)}>
            <Icon
              type="ChevronLeft"
              size={theme.fonts.iconSize.xlarge}
              color={theme.colors.Text.disable}
            />
          </BackIconWrapper>
          <Typography type="BiggerBold">{t('ui.lab.seeLatestPapers')}</Typography>
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
