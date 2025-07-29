import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { UilHeart, UilSuitcase, UilAngleDown, UilSearch, UilCheck } from '@iconscout/react-unicons';
import PlaceholderComponenet from '@/common/daily-tf/Placeholder';
import LabModal from '@/features/lab/components/LabModal';

import { LikedLabFrame } from '@/features/lab/frames/LikedLabFrame';
import { MajorLabFrame } from '@/features/lab/frames/MajorLabFrame';
import { MinorLabFrame } from '@/features/lab/frames/MinorLabFrame';
import { mockLikedLabs } from '@/features/lab/mock/mockLikedLabs';
import { mockMajorLabs } from '@/features/lab/mock/mockMajorLabs';
import { mockMinorLabs } from '@/features/lab/mock/mockMinorLabs';
import MainSearch from '@/features/lab/components/MainSearch';

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 55px 0 20px;
  height: 100vh;
  background-color: #f9f2f2;
  overflow: auto;
`;

const ContentsContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 100px;
  width: 100%;
`;

// ─── LEFT SIDEBAR ─────────────────────────────────────────────────────────────
const SidebarWrapper = styled.div`
  width: 246px;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 12px 12px 15px;
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
  line-height: 125%;
  color: #333;
  cursor: pointer;
`;

const SidebarDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(232, 232, 232, 1);
`;

const SidebarInterestTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 125%;
  letter-spacing: 0;
  vertical-align: middle;
  color: #333;
`;

const SidebarInterest = styled.div<{ edit?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
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
  line-height: 150%;
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
  line-height: 125%;
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
  justify-content: flex-start;
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
  line-height: 125%;
  color: #333;
  &::placeholder {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 125%;
    letter-spacing: 0;
    color: #aaaaaa;
  }
`;
const SelectedTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
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
  text-align: left;
  width: 100%;
  padding-left: 2px;
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

// ─── CENTER CONTENT ───────────────────────────────────────────────────────────
const MainWrapper = styled.div`
  flex: 1;
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
`;

const CentralSearchBar = styled.div`
  width: 100%;
  max-width: 1072px;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #edd1dc;
  border-radius: 6px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const DepartmentSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 195px;
  height: 100%;
  padding: 0 16px;
  border-right: 1px solid #edd1dc;
  box-sizing: border-box;
`;

const DeptLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #aaaaaa;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const DeptIcon = styled(UilSuitcase)`
  width: 16px;
  height: 16px;
  color: #aaaaaa;
`;

const DeptArrow = styled(UilAngleDown)`
  width: 20px;
  height: 20px;
  color: #aaaaaa;
  cursor: default;
`;

const CentralSearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 125%;
  color: #333;
  &::placeholder {
    color: #aaaaaa;
  }
`;

const CentralSearchIcon = styled(UilSearch)`
  width: 16px;
  height: 16px;
  color: #eb809c;
  margin-right: 16px;
`;

const CustomScItem = styled.div.attrs({ className: 'sc-duJKf kHGnkC' })`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ─── RIGHT SIDEBAR ──────────────────────────────────────────────────────────
const RightSection = styled.div`
  width: 246px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightTitle = styled.div`
  width: 100%;
  height: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 125%;
  color: #000;
  span {
    color: #eb809c;
  }
`;

const ResearchCard = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 16px;
  gap: 4px;
  box-sizing: border-box;
`;

const ResearchHeader = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
`;

const ResearchTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 125%;
  color: #333;
`;

const HeartIcon = styled(UilHeart)`
  width: 16px;
  height: 16px;
  color: #aaaaaa;
`;

const ResearchBody = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  gap: 4px;
  box-sizing: border-box;
`;

const ResearchProf = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 125%;
  color: #999;
`;

const ResearchTags = styled.div`
  display: flex;
  gap: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 125%;
  color: #999;
`;

export enum Mode {
  'none',
  'department',
  'labOrPaper',
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────
const LabPage: React.FC = () => {
  const [interestMode, setInterestMode] = useState(false);
  const [likedLabMode, setLikedLabMode] = useState(false); // chacha: 찜한 연구실 탭으로 들어간 상태
  const [majorLabMode, setMajorLabMode] = useState(false); // oosoi: :)
  const [minorLabMode, setMinorLabMode] = useState(false);
  const [centralKeyword, setCentralKeyword] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [interestKeyword, setInterestKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const trending = ['AI', 'UX 디자인', '뇌과학', '로보틱스', '데이터사이언스'];

  // Main Search
  const [mode, setMode] = useState<Mode>(Mode.none);
  const [lab, setLab] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  return (
    <>
      {showModal && <LabModal onClose={() => setShowModal(false)} />}
      <PageWrapper>
        <ContentsContainer>
          <SidebarWrapper>
            <SidebarOption
              onClick={() => {
                setLikedLabMode(true);
                setMajorLabMode(false);
                setMinorLabMode(false);
              }}>
              <UilHeart width="16" height="16" /> 찜한 연구실
            </SidebarOption>

            <SidebarOption
              onClick={() => {
                setLikedLabMode(false);
                setMajorLabMode(true);
                setMinorLabMode(false);
              }}>
              <UilSuitcase width="16" height="16" /> 전공 학과 연구실
            </SidebarOption>

            <SidebarOption
              onClick={() => {
                setLikedLabMode(false);
                setMajorLabMode(false);
                setMinorLabMode(true);
              }}>
              <UilSuitcase width="16" height="16" /> 부전공 학과 연구실
            </SidebarOption>
            <SidebarDivider />
            <SidebarInterestTitle>관심 분야</SidebarInterestTitle>
            {!interestMode ? (
              <SidebarInterest>
                <div style={{ height: '60px' }} />
                <Description>관심 분야를 설정하고 연구실 추천을 받아보세요</Description>
                <div style={{ height: '20px' }} />
                <InterestStartButton onClick={() => setInterestMode(true)}>
                  시작하기
                </InterestStartButton>
              </SidebarInterest>
            ) : (
              <SidebarInterest edit={interestMode}>
                {interestMode ? (
                  <>
                    <LeftSearchBarWrapper>
                      <LeftSearchBar>
                        <LeftSearchIcon />
                        <LeftSearchInput
                          placeholder="키워드로 검색해보세요"
                          value={interestKeyword}
                          onChange={(e) => setInterestKeyword(e.target.value)}
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
                      <SaveButton
                        onClick={() => {
                          setInterestMode(false);
                        }}>
                        저장
                      </SaveButton>
                    </FlexRow>
                  </>
                ) : (
                  <>
                    <div style={{ height: '100px' }} />
                    <Description>관심 분야를 설정하고 연구실 추천을 받아보세요</Description>
                    <InterestStartButton onClick={() => setInterestMode(true)}>
                      시작하기
                    </InterestStartButton>
                  </>
                )}
              </SidebarInterest>
            )}
          </SidebarWrapper>
          {likedLabMode && (
            <LikedLabFrame setLikedLabMode={setLikedLabMode} likedLabs={mockLikedLabs} />
          )}
          {majorLabMode && (
            <MajorLabFrame setMajorLabMode={setMajorLabMode} majorLabs={mockMajorLabs} />
          )}
          {minorLabMode && (
            <MinorLabFrame setMinorLabMode={setMinorLabMode} minorLabs={mockMinorLabs} />
          )}

          {!likedLabMode && !majorLabMode && !minorLabMode && (
            <MainWrapper>
              {/*<CentralSearchBar>*/}
              {/*  <DepartmentSelect>*/}
              {/*    <DeptLeft>*/}
              {/*      <DeptIcon />*/}
              {/*      학과*/}
              {/*    </DeptLeft>*/}
              {/*    <DeptArrow />*/}
              {/*  </DepartmentSelect>*/}
              {/*  <CentralSearchInput*/}
              {/*    placeholder="키워드, 교수명 등으로 검색해보세요"*/}
              {/*    value={centralKeyword}*/}
              {/*    onChange={(e: ChangeEvent<HTMLInputElement>) => setCentralKeyword(e.target.value)}*/}
              {/*  />*/}
              {/*  <CentralSearchIcon />*/}
              {/*</CentralSearchBar>*/}
              <MainSearch
                mode={mode}
                setMode={setMode}
                lab={lab}
                setLab={setLab}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
              />
              <CustomScItem>
                <PlaceholderComponenet />
              </CustomScItem>
            </MainWrapper>
          )}

          <RightSection>
            <RightTitle>
              함께 보는 <span>AI추천 연구실</span>
            </RightTitle>
            {[1, 2, 3, 4].map((i) => (
              <ResearchCard key={i}>
                <ResearchHeader>
                  <ResearchTitle>연구실명</ResearchTitle>
                  <HeartIcon />
                </ResearchHeader>
                <ResearchBody>
                  <ResearchProf>담당교수</ResearchProf>
                  <ResearchTags>#분야 #분야 #분야</ResearchTags>
                </ResearchBody>
              </ResearchCard>
            ))}
          </RightSection>
        </ContentsContainer>
      </PageWrapper>
    </>
  );
};

export default LabPage;
