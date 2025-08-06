// src/features/lab/pages/LabPage.tsx

import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { UilSearch, UilSuitcase } from '@iconscout/react-unicons';

import LabSidebar from '@/features/lab/components/LabSidebar';
import PlaceholderComponent from '@/common/daily-tf/Placeholder';
import LabModal from '@/features/lab/components/LabModal';
import { LikedLabFrame } from '@/features/lab/frames/LikedLabFrame';
import { MajorLabFrame } from '@/features/lab/frames/MajorLabFrame';
import { MinorLabFrame } from '@/features/lab/frames/MinorLabFrame';
import { mockLikedLabs } from '@/features/lab/mock/mockLikedLabs';
import { mockMajorLabs } from '@/features/lab/mock/mockMajorLabs';
import { mockMinorLabs } from '@/features/lab/mock/mockMinorLabs';

// ─── Layout Wrappers ─────────────────────────────────────────────────────
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

const CenterMainWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const MainWrapper = styled.div`
  flex: 1;
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  padding: 24px 12px 16px;
  box-sizing: border-box;
  width: 100%;
`;

// ─── Center Search Bar ─────────────────────────────────────────────────────
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

// ─── Right Sidebar (추천 연구실) ──────────────────────────────────────────
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

const LabPage: React.FC = () => {
  const [likedLabMode, setLikedLabMode] = useState(false);
  const [majorLabMode, setMajorLabMode] = useState(false);
  const [minorLabMode, setMinorLabMode] = useState(false);
  const [centralKeyword, setCentralKeyword] = useState('');
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && <LabModal onClose={() => setShowModal(false)} />}
      <PageWrapper>
        <ContentsContainer>
          <LabSidebar
            setLikedLabMode={setLikedLabMode}
            setMajorLabMode={setMajorLabMode}
            setMinorLabMode={setMinorLabMode}
          />

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
            <CenterMainWrapper>
              <MainWrapper>
                <CentralSearchBar>
                  <DepartmentSelect>
                    <DeptLeft>
                      <UilSuitcase width={16} height={16} />
                      학과
                    </DeptLeft>
                  </DepartmentSelect>
                  <CentralSearchInput
                    placeholder="키워드, 교수명 등으로 검색해보세요"
                    value={centralKeyword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCentralKeyword(e.target.value)
                    }
                  />
                  <CentralSearchIcon />
                </CentralSearchBar>

                <CustomScItem>
                  <PlaceholderComponent />
                </CustomScItem>
              </MainWrapper>
            </CenterMainWrapper>
          )}

          <RightSection>
            <RightTitle>
              함께 보는 <span>AI추천 연구실</span>
            </RightTitle>
            {[1, 2, 3, 4].map((i) => (
              <ResearchCard key={i}>
                <ResearchHeader>
                  <ResearchTitle>연구실명</ResearchTitle>
                </ResearchHeader>
                <div style={{ padding: '0 16px' }}>
                  <ResearchProf>담당교수</ResearchProf>
                  <ResearchTags>#분야 #분야 #분야</ResearchTags>
                </div>
              </ResearchCard>
            ))}
          </RightSection>
        </ContentsContainer>
      </PageWrapper>
    </>
  );
};

export default LabPage;
