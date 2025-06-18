import LabCard, { LabCardProps } from '@/features/lab/components/LabCard';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

interface LikedLabFrameProps {
  setLikedLabMode: (likedLabMode: boolean) => void;
  likedLabs: LabCardProps[];
}

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0px 6px 6px 6px;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  background-color: #fff;
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

const SearchingBar = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  padding: 8px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid #edd1dc;
  background-color: #fff;
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

  return (
    <MainWrapper>
      <HeaderWrapper>
        <HeaderLeftWrapper>
          <BackIconWrapper>
            <Icon
              type="ChevronLeft"
              size={24}
              color="Text.light"
              onClick={() => setLikedLabMode(false)}
            />
          </BackIconWrapper>
          <Typography type="BiggerBold">찜한 연구실</Typography>
        </HeaderLeftWrapper>
        <SearchingBar>
          <Icon type="Search" color="#e54c65" size={16} />
          <Typography type="Normal" color="Text.placeholder">
            키워드로 검색해보세요
          </Typography>
        </SearchingBar>
      </HeaderWrapper>
      <CardsWrapper>
        {likedLabsIndexList.map((number, index) => (
          <DoubleCardsWrapper key={index}>
            <LabCard
              key={index}
              name={likedLabs[number].name}
              department={likedLabs[number].department}
              professor={likedLabs[number].professor}
              summary={likedLabs[number].summary}
              fieldList={likedLabs[number].fieldList}
            />
            <LabCard
              key={index + 1}
              name={likedLabs[number + 1].name}
              department={likedLabs[number + 1].department}
              professor={likedLabs[number + 1].professor}
              summary={likedLabs[number + 1].summary}
              fieldList={likedLabs[number + 1].fieldList}
            />
          </DoubleCardsWrapper>
        ))}
      </CardsWrapper>
    </MainWrapper>
  );
};
