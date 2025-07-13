import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React from 'react';
import PaperCard from '@/features/lab/components/PaperCard';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import SmallPaperCard from '@/features/lab/components/SmallPaperCard';

interface ViewMorePaperFrameProps {
  setViewMorePaper: (value: boolean) => void;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const SearchComponentContainer = styled.div`
  display: flex;
  width: 528px;
  height: 33px;
  padding: 0px 10px;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
  border: 1px solid #edd1dc;
  border-radius: 6px;
`; // 추후 컴포넌트로 빼서 구현 예정

const SearchIconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
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

const HeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  border-top: 1px solid #edd1dc;
  width: 100%;
`;

const ThreeColumnWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const OneColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

export const ViewMorePaperFrame: React.FC<ViewMorePaperFrameProps> = ({ setViewMorePaper }) => {
  const paperList = mockPaperList();
  const navigate = useNavigate();
  const papersLength = mockPaperList().length;
  const firstPapersIndexList = Array.from({ length: Math.ceil(papersLength / 3) }, (_, i) => i * 3);
  const secondPapersIndexList = Array.from(
    { length: Math.ceil(papersLength / 3) },
    (_, i) => i * 3 + 1,
  );
  const thirdPapersIndexList = Array.from(
    { length: Math.ceil(papersLength / 3) },
    (_, i) => i * 3 + 2,
  );

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderLeftWrapper>
          <BackIconWrapper>
            <Icon
              type="ChevronLeft"
              size={24}
              color="#aaa"
              onClick={() => setViewMorePaper(false)}
            />
          </BackIconWrapper>
          <TitleWithTagWrapper>
            <Typography type="BigBold">연구실 논문 전체보기</Typography>
          </TitleWithTagWrapper>
        </HeaderLeftWrapper>
        <HeaderRightWrapper>
          <SearchComponentContainer>
            <SearchIconWrapper>
              <Icon type="Search" size={16} color="#E54C65" />
            </SearchIconWrapper>
            <Typography type={'Normal'} color={'Text.placeholder'}>
              연구실 내 논문을 검색해보세요
            </Typography>
          </SearchComponentContainer>
        </HeaderRightWrapper>
      </HeaderContainer>
      <ThreeColumnWrapper>
        <OneColumnWrapper>
          {firstPapersIndexList.map(
            (item, i) =>
              paperList[item] && (
                <SmallPaperCard
                  key={item}
                  fieldList={paperList[item].fieldList}
                  title={paperList[item].title}
                  summary={paperList[item].summary}
                  onClick={() => navigate('/labs')}
                />
              ),
          )}
        </OneColumnWrapper>
        <OneColumnWrapper>
          {secondPapersIndexList.map(
            (item, i) =>
              paperList[item] && (
                <SmallPaperCard
                  key={item}
                  fieldList={paperList[item].fieldList}
                  title={paperList[item].title}
                  summary={paperList[item].summary}
                  onClick={() => navigate('/labs')}
                />
              ),
          )}
        </OneColumnWrapper>
        <OneColumnWrapper>
          {thirdPapersIndexList.map(
            (item, i) =>
              paperList[item] && (
                <SmallPaperCard
                  key={item}
                  fieldList={paperList[item].fieldList}
                  title={paperList[item].title}
                  summary={paperList[item].summary}
                  onClick={() => navigate('/labs')}
                />
              ),
          )}
        </OneColumnWrapper>
      </ThreeColumnWrapper>
    </MainContainer>
  );
};
