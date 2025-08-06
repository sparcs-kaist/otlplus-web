import React, { useState } from 'react';
import styled from 'styled-components';
import LabSidebar from '@/features/lab/components/LabSidebar';
import { UilHeart } from '@iconscout/react-unicons';
import { LikedLabFrame } from '@/features/lab/frames/LikedLabFrame';
import { mockLikedLabs } from '@/features/lab/mock/mockLikedLabs';
import { LabDetailFrame } from '@/features/lab/frames/LabDetailFrame';

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 55px 0 20px;
  height: 100vh;
  background-color: #f9f2f2;
  overflow: auto;
  width: 100vw;
`;

const ContentsContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 100px;
  width: 100%;
`;

const CenterMainWrapper = styled.div`
  flex: 1;
  min-width: 0; // chacha: ㅠㅠ 겨우 겨우 알아냄
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

// ─── COMPONENT ─────────────────────────────────────────────────────────────
const LabDetailPage: React.FC = () => {
  const [likedLabMode, setLikedLabMode] = useState(false);
  const [majorLabMode, setMajorLabMode] = useState(false);
  const [minorLabMode, setMinorLabMode] = useState(false);

  return (
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
        {!likedLabMode && (
          <CenterMainWrapper>
            <LabDetailFrame />
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
  );
};

export default LabDetailPage;
