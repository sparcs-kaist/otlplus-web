import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import LabModal from '@/features/lab/components/LabModal';
import { LikedLabFrame } from '@/features/lab/frames/LikedLabFrame';
import { MajorLabFrame } from '@/features/lab/frames/MajorLabFrame';
import { MinorLabFrame } from '@/features/lab/frames/MinorLabFrame';
import { mockLikedLabs } from '@/features/lab/mock/mockLikedLabs';
import { mockMajorLabs } from '@/features/lab/mock/mockMajorLabs';
import { mockMinorLabs } from '@/features/lab/mock/mockMinorLabs';
import Icon from '@/common/daily-tf/Icon';
import { MainFrameWithNoInterest } from '@/features/lab/frames/MainFrameWithNoInterest';
import { MainFrameWithInterest } from '@/features/lab/frames/MainFrameWithInterest';

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 55px 0 20px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.Background.Page.default};
  overflow: hidden;
`;

const ContentsContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 100px;
  width: 100%;
  height: 100%;

  @media (max-width: 1439px) {
    padding: 0 20px;
    gap: 0;
  }
`;

const MobileIconRail = styled.div`
  display: none;

  @media (max-width: 1439px) {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: auto;
    height: 100%;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
  }
`;

interface RailIconButtonProps {
  isActive?: boolean;
}

const RailIconButton = styled.button<RailIconButtonProps>`
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.Background.Section.default : theme.colors.Background.Block.darker};

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.Background.Section.default : theme.colors.Background.Tab.darker};
  }
`;

const MobileContentFrame = styled.div`
  display: none;

  @media (max-width: 1439px) {
    display: flex;
    flex: 1;
    min-width: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.Background.Section.default};
    border-radius: 0 6px 6px 0;
    box-shadow: 0px 6px 3px -3px ${({ theme }) => theme.colors.Line.divider}cc;
    overflow: hidden;
  }
`;

const MobileContentArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const SidebarWrapper = styled.div`
  width: 246px;
  background-color: ${({ theme }) => theme.colors.Background.Section.default};
  box-shadow: 0px 6px 3px -3px ${({ theme }) => theme.colors.Line.divider}cc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 12px 12px 15px;
  box-sizing: border-box;
  align-self: flex-start;
  flex-shrink: 0;
  max-height: calc(100vh - 55px - 20px);
  overflow-y: auto;

  @media (max-width: 1439px) {
    display: none;
  }
`;

const CentralContentWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  height: 100%;

  @media (max-width: 1439px) {
    display: none;
  }
`;

const RightSection = styled.div`
  width: 246px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;

  @media (max-width: 1439px) {
    display: none;
  }
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
  color: ${({ theme }) => theme.colors.Text.default};
  cursor: pointer;
`;

const SidebarDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.Line.default};
`;

const SidebarInterestTitle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 125%;
  letter-spacing: 0;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.Text.default};
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
  color: ${({ theme }) => theme.colors.Text.subtle};
  text-align: center;
`;

const InterestStartButton = styled.button`
  width: 96px;
  height: 36px;
  padding: 6px 24px;
  gap: 6px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Highlight.default};
  color: ${({ theme }) => theme.colors.Background.Section.default};
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
  background-color: ${({ theme }) => theme.colors.Background.Block.default};
  color: ${({ theme }) => theme.colors.Text.default};
`;

const SaveButton = styled(EditButton)`
  background-color: ${({ theme }) => theme.colors.Highlight.default};
  color: ${({ theme }) => theme.colors.Background.Section.default};
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
  border: 1px solid ${({ theme }) => theme.colors.Line.divider};
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const LeftSearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 125%;
  color: ${({ theme }) => theme.colors.Text.default};
  &::placeholder {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 125%;
    letter-spacing: 0;
    color: ${({ theme }) => theme.colors.Text.placeholder};
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
  background-color: ${({ theme }) => theme.colors.Highlight.background};
  color: ${({ theme }) => theme.colors.Highlight.default};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const TrendingLabel = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.Highlight.default};
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
  background-color: ${({ theme }) => theme.colors.Background.Block.default};
  color: ${({ theme }) => theme.colors.Text.subtle};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const RightTitle = styled.div`
  width: 100%;
  height: 21px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 125%;
  color: ${({ theme }) => theme.colors.Text.dark};
  span {
    color: ${({ theme }) => theme.colors.Highlight.default};
  }
`;

const ResearchCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.Background.Section.default};
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
  color: ${({ theme }) => theme.colors.Text.default};
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
  color: ${({ theme }) => theme.colors.Text.subtle};
`;

const ResearchTags = styled.div`
  display: flex;
  gap: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 125%;
  color: ${({ theme }) => theme.colors.Text.subtle};
`;

const LabPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [interestMode, setInterestMode] = useState(false);
  const [likedLabMode, setLikedLabMode] = useState(false);
  const [majorLabMode, setMajorLabMode] = useState(false);
  const [minorLabMode, setMinorLabMode] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [interestKeyword, setInterestKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  //TODO: 실제 데이터 연동 후 연구 분야 태그로 대체
  const trending = [
    'AI',
    t('ui.lab.keywordUXDesign'),
    t('ui.lab.keywordNeuroscience'),
    t('ui.lab.keywordRobotics'),
    t('ui.lab.keywordDataScience'),
  ];
  const noInterest = false;
  const [activeTab, setActiveTab] = useState<string>('search');

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'search':
        return <MainFrameWithInterest />;
      case 'favorite':
        return <LikedLabFrame setLikedLabMode={setLikedLabMode} likedLabs={mockLikedLabs} />;
      case 'major':
        return <MajorLabFrame setMajorLabMode={setMajorLabMode} majorLabs={mockMajorLabs} />;
      case 'minor':
        return <MinorLabFrame setMinorLabMode={setMinorLabMode} minorLabs={mockMinorLabs} />;
      default:
        return <MainFrameWithInterest />;
    }
  };

  const renderDesktopContent = () => {
    if (likedLabMode)
      return <LikedLabFrame setLikedLabMode={setLikedLabMode} likedLabs={mockLikedLabs} />;
    if (majorLabMode)
      return <MajorLabFrame setMajorLabMode={setMajorLabMode} majorLabs={mockMajorLabs} />;
    if (minorLabMode)
      return <MinorLabFrame setMinorLabMode={setMinorLabMode} minorLabs={mockMinorLabs} />;
    if (noInterest) return <MainFrameWithNoInterest />;
    return <MainFrameWithInterest />;
  };

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
              <Icon
                type="FavoriteBorder"
                size={theme.fonts.iconSize.medium}
                color={theme.colors.Text.dark}
              />
              {t('ui.lab.likedLabs')}
            </SidebarOption>
            <SidebarOption
              onClick={() => {
                setLikedLabMode(false);
                setMajorLabMode(true);
                setMinorLabMode(false);
              }}>
              <Icon
                type="ShoppingBag"
                size={theme.fonts.iconSize.medium}
                color={theme.colors.Text.dark}
              />
              {t('ui.lab.majorDepartmentLabs')}
            </SidebarOption>
            <SidebarOption
              onClick={() => {
                setLikedLabMode(false);
                setMajorLabMode(false);
                setMinorLabMode(true);
              }}>
              <Icon
                type="ShoppingBag"
                size={theme.fonts.iconSize.medium}
                color={theme.colors.Text.dark}
              />
              {t('ui.lab.minorDepartmentLabs')}
            </SidebarOption>
            <SidebarDivider />
            <SidebarInterestTitle>{t('ui.lab.interests')}</SidebarInterestTitle>
            {!interestMode ? (
              <SidebarInterest>
                <div style={{ height: '60px' }} />
                <Description>{t('ui.lab.interestsDescription')}</Description>
                <div style={{ height: '20px' }} />
                <InterestStartButton onClick={() => setInterestMode(true)}>
                  {t('ui.lab.getStarted')}
                </InterestStartButton>
              </SidebarInterest>
            ) : (
              <SidebarInterest edit={interestMode}>
                {interestMode ? (
                  <>
                    <LeftSearchBarWrapper>
                      <LeftSearchBar>
                        <Icon
                          type="Search"
                          color={theme.colors.Highlight.light}
                          size={theme.fonts.iconSize.medium}
                        />
                        <LeftSearchInput
                          placeholder={t('ui.lab.searchByKeywordPlaceholder')}
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
                          <Icon
                            type="Check"
                            size={theme.fonts.iconSize.base}
                            color={theme.colors.Highlight.default}
                          />
                        </TagItem>
                      ))}
                    </SelectedTagsRow>
                    <SidebarDivider />
                    <TrendingLabel>{t('ui.lab.trendingKeywords')}</TrendingLabel>
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
                      <CancelButton onClick={() => setInterestMode(false)}>
                        {t('ui.button.cancel')}
                      </CancelButton>
                      <SaveButton
                        onClick={() => {
                          setInterestMode(false);
                        }}>
                        {t('ui.button.save')}
                      </SaveButton>
                    </FlexRow>
                  </>
                ) : (
                  <>
                    <div style={{ height: '100px' }} />
                    <Description>{t('ui.lab.interestsDescription')}</Description>
                    <InterestStartButton onClick={() => setInterestMode(true)}>
                      {t('ui.lab.getStarted')}
                    </InterestStartButton>
                  </>
                )}
              </SidebarInterest>
            )}
          </SidebarWrapper>
          <CentralContentWrapper>{renderDesktopContent()}</CentralContentWrapper>
          <RightSection>
            <RightTitle>
              <Trans i18nKey="ui.lab.popularLabsTitle" components={{ span: <span /> }} />
            </RightTitle>
            {[1, 2, 3, 4].map((i) => (
              <ResearchCard key={i}>
                <ResearchHeader>
                  <ResearchTitle>{t('ui.lab.labName')}</ResearchTitle>
                  <Icon
                    type="FavoriteBorder"
                    size={theme.fonts.iconSize.medium}
                    color={theme.colors.Text.disable}
                  />
                </ResearchHeader>
                <ResearchBody>
                  <ResearchProf>{t('ui.lab.professor')}</ResearchProf>
                  {/* TODO: 실제 데이터 연동 후 연구 분야 태그로 대체 */}
                  <ResearchTags>#분야 #분야 #분야</ResearchTags>
                </ResearchBody>
              </ResearchCard>
            ))}
          </RightSection>

          <MobileIconRail>
            <RailIconButton
              isActive={activeTab === 'search'}
              onClick={() => setActiveTab('search')}>
              <Icon
                type="Search"
                size={theme.fonts.iconSize.small}
                color={activeTab === 'search' ? theme.colors.Text.default : theme.colors.Text.light}
              />
            </RailIconButton>
            <RailIconButton
              isActive={activeTab === 'favorite'}
              onClick={() => setActiveTab('favorite')}>
              <Icon
                type="FavoriteBorder"
                size={theme.fonts.iconSize.small}
                color={
                  activeTab === 'favorite' ? theme.colors.Text.default : theme.colors.Text.light
                }
              />
            </RailIconButton>
            <RailIconButton isActive={activeTab === 'major'} onClick={() => setActiveTab('major')}>
              <Icon
                type="BusinessCenter"
                size={theme.fonts.iconSize.small}
                color={activeTab === 'major' ? theme.colors.Text.default : theme.colors.Text.light}
              />
            </RailIconButton>
            <RailIconButton isActive={activeTab === 'minor'} onClick={() => setActiveTab('minor')}>
              <Icon
                type="BusinessCenter"
                size={theme.fonts.iconSize.small}
                color={activeTab === 'minor' ? theme.colors.Text.default : theme.colors.Text.light}
              />
            </RailIconButton>
          </MobileIconRail>
          <MobileContentFrame>
            <MobileContentArea>{renderMobileContent()}</MobileContentArea>
          </MobileContentFrame>
        </ContentsContainer>
      </PageWrapper>
    </>
  );
};

export default LabPage;
