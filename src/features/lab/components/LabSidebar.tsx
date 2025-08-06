// src/features/lab/components/LabSidebar.tsx

import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { UilHeart, UilSuitcase, UilSearch, UilCheck } from '@iconscout/react-unicons';

// ─── Props 타입 정의 ─────────────────────────────────────────────────────
interface LabSidebarProps {
  setLikedLabMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setMajorLabMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setMinorLabMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

// ─── Styled Components ───────────────────────────────────────────────────
const SidebarWrapper = styled.div`
  width: 246px;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  box-sizing: border-box;
  align-self: flex-start;
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #333;
  cursor: pointer;
`;

const SidebarDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #edd1dc;
`;

const SidebarInterestTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #333;
`;

const SidebarInterest = styled.div<{ edit?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  ${({ edit }) =>
    edit
      ? `
    align-items: flex-start;
  `
      : `
    align-items: center;
    justify-content: center;
    height: 184px;
  `}
`;

const Description = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #999;
  text-align: center;
`;

const InterestStartButton = styled.button`
  width: 96px;
  height: 36px;
  padding: 6px 24px;
  gap: 6px;
  border-radius: 6px;
  background-color: #e54c65;
  color: #fff;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 125%;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: -80px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const EditButton = styled.button`
  width: 90px;
  height: 36px;
  padding: 4px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(EditButton)`
  background-color: #f4f4f4;
  color: #333;
`;

const SaveButton = styled(EditButton)`
  background-color: #e54c65;
  color: #fff;
`;

const LeftSearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const LeftSearchBar = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(237, 209, 220, 1);
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const LeftSearchIcon = styled(UilSearch)`
  width: 16px;
  height: 16px;
  color: #eb809c;
  margin-right: 8px;
`;

const LeftSearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #333;
  &::placeholder {
    color: #aaaaaa;
  }
`;

const SelectedTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: rgba(229, 76, 101, 0.1);
  color: #e54c65;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const TrendingLabel = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #e54c65;
  width: 100%;
  margin-top: 4px;
`;

const TrendingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const TrendingTag = styled.div`
  padding: 6px 12px;
  border-radius: 16px;
  background-color: #f4f4f4;
  color: #999;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

// ─── LabSidebar 컴포넌트 ──────────────────────────────────────────────────
const LabSidebar: React.FC<LabSidebarProps> = ({
  setLikedLabMode,
  setMajorLabMode,
  setMinorLabMode,
}) => {
  const [interestMode, setInterestMode] = useState(false);
  const [interestKeyword, setInterestKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const trending = ['AI', 'UX 디자인', '뇌과학', '로보틱스', '데이터사이언스'];

  return (
    <SidebarWrapper>
      <SidebarOption
        onClick={() => {
          setLikedLabMode?.(true);
          setMajorLabMode?.(false);
          setMinorLabMode?.(false);
        }}>
        <UilHeart width="16" height="16" /> 찜한 연구실
      </SidebarOption>

      <SidebarOption
        onClick={() => {
          setLikedLabMode?.(false);
          setMajorLabMode?.(true);
          setMinorLabMode?.(false);
        }}>
        <UilSuitcase width="16" height="16" /> 전공 학과 연구실
      </SidebarOption>

      <SidebarOption
        onClick={() => {
          setLikedLabMode?.(false);
          setMajorLabMode?.(false);
          setMinorLabMode?.(true);
        }}>
        <UilSuitcase width="16" height="16" /> 부전공 학과 연구실
      </SidebarOption>

      <SidebarDivider />

      <SidebarInterestTitle>관심 분야</SidebarInterestTitle>

      {!interestMode ? (
        <SidebarInterest>
          <Description>관심 분야를 설정하고 연구실 추천을 받아보세요</Description>
          <InterestStartButton onClick={() => setInterestMode(true)}>시작하기</InterestStartButton>
        </SidebarInterest>
      ) : (
        <SidebarInterest edit>
          <LeftSearchBarWrapper>
            <LeftSearchBar>
              <LeftSearchIcon />
              <LeftSearchInput
                placeholder="키워드로 검색해보세요"
                value={interestKeyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInterestKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && interestKeyword.trim()) {
                    if (!selectedTags.includes(interestKeyword.trim())) {
                      setSelectedTags([...selectedTags, interestKeyword.trim()]);
                    }
                    setInterestKeyword('');
                  }
                }}
              />
            </LeftSearchBar>
          </LeftSearchBarWrapper>

          <SelectedTagsRow>
            {selectedTags.map((tag) => (
              <TagItem
                key={tag}
                onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                {tag}
                <UilCheck width="14" height="14" color="#e54c65" />
              </TagItem>
            ))}
          </SelectedTagsRow>

          <SidebarDivider />

          <TrendingLabel>인기 검색어</TrendingLabel>
          <TrendingTags>
            {trending.map((tag) => (
              <TrendingTag
                key={tag}
                onClick={() => {
                  if (!selectedTags.includes(tag)) {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}>
                {tag} +
              </TrendingTag>
            ))}
          </TrendingTags>

          <FlexRow>
            <CancelButton onClick={() => setInterestMode(false)}>취소</CancelButton>
            <SaveButton onClick={() => setInterestMode(false)}>저장</SaveButton>
          </FlexRow>
        </SidebarInterest>
      )}
    </SidebarWrapper>
  );
};

export default LabSidebar;
