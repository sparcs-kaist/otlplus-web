import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React, { useMemo } from 'react';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import SmallPaperCard from '@/features/lab/components/SmallPaperCard';
import TextInput from '@/common/daily-tf/search/TextInput';
import { canBeChoseong, getChoseong } from 'es-hangul';

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

const ClickWebsiteButton = styled.button`
  display: flex;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background-color: #eee;
`;

const IconWrapper = styled.div`
  transform: rotate(90deg);
`;

export const ViewMorePaperFrame: React.FC<ViewMorePaperFrameProps> = ({ setViewMorePaper }) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const originalPaperList = mockPaperList();
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

  const paperList = useMemo(() => {
    if (searchText === '') return originalPaperList;
    if (canBeChoseong(searchText)) {
      return originalPaperList.filter((item) =>
        item.fieldList.some((field) => getChoseong(field).includes(getChoseong(searchText))),
      );
    }

    return originalPaperList.filter((item) =>
      item.fieldList.some(
        (field) =>
          field.includes(searchText.toLowerCase()) ||
          item.fieldList.some((field) => field.includes(searchText.toUpperCase())),
      ),
    );
  }, [searchText]);

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderLeftWrapper>
          <SearchComponentContainer>
            <SearchIconWrapper>
              <Icon type="Search" size={16} color="#E54C65" />
            </SearchIconWrapper>
            <TextInput
              placeholder="연구실 내 논문을 검색해보세요"
              value={searchText}
              handleChange={setSearchText}
            />
          </SearchComponentContainer>
        </HeaderLeftWrapper>
        <HeaderRightWrapper>
          <ClickWebsiteButton onClick={() => setViewMorePaper(false)}>
            <IconWrapper>
              <Icon type="ChevronLeft" size={18} color="#888" />
            </IconWrapper>
            <Typography type="Normal" color="Text.lighter">
              연구실 논문 접기
            </Typography>
          </ClickWebsiteButton>
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
