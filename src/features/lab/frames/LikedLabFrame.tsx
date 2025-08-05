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
  flex-wrap: wrap;
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
  const likedLabsIndexList = Array.from(
    { length: Math.ceil(likedLabsLength / 2) },
    (_, i) => i * 2,
  );
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
        <CardsWrapper>
          {likedLabsIndexList.map((number, index) => (
            <DoubleCardsWrapper key={index}>
              {likedLabs[number] && (
                <LabCard
                  key={index}
                  name={likedLabs[number].name}
                  department={likedLabs[number].department}
                  professor={likedLabs[number].professor}
                  summary={likedLabs[number].summary}
                  fieldList={likedLabs[number].fieldList}
                  onClick={(number: number) => navigate(`/lab/${number}`)}
                />
              )}
              {likedLabs[number + 1] && (
                <LabCard
                  key={index + 1}
                  name={likedLabs[number + 1].name}
                  department={likedLabs[number + 1].department}
                  professor={likedLabs[number + 1].professor}
                  summary={likedLabs[number + 1].summary}
                  fieldList={likedLabs[number + 1].fieldList}
                  onClick={(number: number) => navigate(`/lab/${number}`)}
                />
              )}
            </DoubleCardsWrapper>
          ))}
        </CardsWrapper>
      </MainInnerWrapper>
    </MainWrapper>
  );
};
