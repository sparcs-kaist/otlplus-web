import LabCard, { LabCardProps } from '@/features/lab/components/LabCard';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';

interface LikedLabFrameProps {
  setLikedLabMode: (likedLabMode: boolean) => void;
  likedLabs: LabCardProps[];
}

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
`;

const MainInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 48px;
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

export const LikedLabFrame: React.FC<LikedLabFrameProps> = ({ setLikedLabMode, likedLabs }) => {
  const likedLabsLength = likedLabs.length;
  const evenIndexLabs = likedLabs.filter((_, index) => index % 2 === 0);
  const oddIndexLabs = likedLabs.filter((_, index) => index % 2 === 1);

  const navigate = useNavigate();

  return (
    <MainWrapper>
      <MainInnerWrapper>
        <HeaderWrapper>
          <HeaderLeftWrapper>
            <BackIconWrapper>
              <Icon
                type="ChevronLeft"
                size={24}
                color="#aaa"
                onClick={() => setLikedLabMode(false)}
              />
            </BackIconWrapper>
            <Typography type="BiggerBold">찜한 연구실</Typography>
          </HeaderLeftWrapper>
        </HeaderWrapper>
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
      </MainInnerWrapper>
    </MainWrapper>
  );
};
