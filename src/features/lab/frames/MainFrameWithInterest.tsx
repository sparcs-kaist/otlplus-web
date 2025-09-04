import styled, { useTheme } from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react';
import ReviewCard from '@/features/lab/components/ReviewCard';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import { mockReview } from '@/features/lab/mock/mockReview';
import MainSearch from '@/features/lab/components/MainSearch';
import { mockMajorLabs } from '@/features/lab/mock/mockMajorLabs';
import LabCard from '@/features/lab/components/LabCard';
import { Mode } from '@/features/lab/enum/Mode';
import LongPaperCard from '@/features/lab/components/LongPaperCard';
import { mockSearchLabs } from '@/features/lab/mock/mockSearchedLabs';
import { ViewMoreRecommendedLabFrame } from '@/features/lab/frames/ViewMoreRecommendedLabFrame';
import { RecommendedPaperFrame } from '@/features/lab/frames/RecommendedPaperFrame';
import { LatestPaperFrame } from '@/features/lab/frames/LatestPaperFrame';
import { useTranslation } from 'react-i18next';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.Background.Section.default};
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  gap: 10px;
  min-width: 0;
  border-radius: 6px;
  box-shadow: 0px 6px 3px -3px ${({ theme }) => theme.colors.Line.divider}cc;
  overflow-y: auto;
`;

const LabRecommendationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  align-self: stretch;
`;

const LabRecommendationTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ClickWebsiteButton = styled.button`
  display: flex;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Background.Block.dark};
`;

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  border-top: 1px solid ${({ theme }) => theme.colors.Line.divider};
  width: 100%;
`;

const HorizontalScrollWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
`;

const LabRecommendationScroll = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: max-content;
  flex-shrink: 0;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;
  align-self: stretch;
`;

const RecentPaperListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  flex: 1 0 0;
  width: 100%;
`;

const PaperTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

interface OrderProps {
  isLast?: boolean;
}

const PaperTitle = styled.div<OrderProps>`
  display: flex;
  padding: 8px 0 8px 14px;
  justify-content: center;
  gap: 22px;
  height: 54px;
  align-items: center;
  align-self: stretch;
  ${({ theme, isLast }) => !isLast && `border-bottom: 1px solid ${theme.colors.Line.default}`}
`;

const RecentSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const PaperRecommendationWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 1439px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const VerticalDivider = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.Line.divider};

  @media (max-width: 1439px) {
    display: none;
  }
`;

const EllipsisTwoLines = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  max-height: '38px';
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
  align-items: flex-start;
  justify-content: center;
  gap: 16px;

  @media (max-width: 1439px) {
    flex-direction: column;
  }
`;

const LabSearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
  width: 100%;
`;

const LabSearchResultTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NothingWrapper = styled.div`
  display: flex;
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const MainFrameWithInterest = () => {
  const theme = useTheme();
  const [mode, setMode] = useState<Mode>(Mode.none);
  const [lab, setLab] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [recentKeyword, setRecentKeyword] = useState<string[]>([]);
  const navigate = useNavigate();
  const reviewList = mockReview();
  const maxSearchKeyword = 15;
  const paperList = mockPaperList();
  const [recommendedLabMode, setRecommendedLabMode] = useState(false);
  const [recommendedPaperMode, setRecommendedPaperMode] = useState(false);
  const [latestPaperMode, setLatestPaperMode] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchKeyword = decodeURIComponent(query.get('keyword') ?? '').trim();
  const searchType = decodeURIComponent(query.get('type') ?? '').trim();
  const rawDepartments = query.getAll('department');
  const searchDepartment = rawDepartments.map((d) => decodeURIComponent(d));
  const isSearching =
    (searchKeyword && searchKeyword.trim() !== '') ||
    (searchType && searchType.trim() !== '') ||
    (searchDepartment && searchDepartment.length > 0);
  const labList = mockSearchLabs();

  const setRecentSearch = (value: string) => {
    setRecentKeyword((prev) => {
      const updated = [...prev.filter((v) => v !== value), value];
      if (updated.length > maxSearchKeyword) {
        return updated.slice(updated.length - maxSearchKeyword);
      }
      return updated;
    });
  };

  const getFilteredLabs = () => {
    return labList.filter((v) => {
      const departmentMatch =
        searchDepartment.length === 0 ||
        (searchDepartment.length === 1 && searchDepartment[0] === '') ||
        searchDepartment.includes(v.department);
      const keywordMatch =
        !searchKeyword || v.fieldList.some((field) => field.includes(searchKeyword.trim()));

      return departmentMatch && keywordMatch;
    });
  };

  const getFilteredPapers = () => {
    return paperList.filter((v) => {
      const departmentMatch =
        searchDepartment.length === 0 ||
        (searchDepartment.length === 1 && searchDepartment[0] === '') ||
        searchDepartment.includes(v.department);
      const keywordMatch =
        !searchKeyword || v.fieldList.some((field) => field.includes(searchKeyword.trim()));

      return departmentMatch && keywordMatch;
    });
  };

  const filteredLabs = getFilteredLabs();
  const filteredPapers = getFilteredPapers();
  const evenIndexLabs = filteredLabs.filter((_, index) => index % 2 === 0);
  const oddIndexLabs = filteredLabs.filter((_, index) => index % 2 === 1);

  return (
    <MainWrapper>
      <MainSearch
        mode={mode}
        setMode={setMode}
        lab={lab}
        setLab={setLab}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
        setRecentSearch={setRecentSearch}
      />
      <RecentSearchWrapper>
        <Typography type="SmallBold" color="Text.default">
          {t('ui.lab.latestSearch')}
        </Typography>
        {recentKeyword.toReversed().map((item, key) => (
          <Typography key={key} type="Small" color="Text.default">
            {item}
          </Typography>
        ))}
      </RecentSearchWrapper>
      <Divider />
      {latestPaperMode && !isSearching ? (
        <LatestPaperFrame setLatestPaperMode={setLatestPaperMode} />
      ) : recommendedPaperMode && !isSearching ? (
        <RecommendedPaperFrame setRecommendedPaperMode={setRecommendedPaperMode} />
      ) : recommendedLabMode && !isSearching ? (
        <ViewMoreRecommendedLabFrame setRecommendedLabMode={setRecommendedLabMode} />
      ) : (
        <>
          {isSearching && searchType === 'lab' && (
            <LabSearchResultWrapper>
              <LabSearchResultTitleWrapper>
                <Typography type="BiggerBold" color="Text.default">
                  {t('ui.lab.labSearchResult')}
                </Typography>
                <Typography type="BigBold" color="Text.default">
                  (총 {filteredLabs.length}건)
                </Typography>
              </LabSearchResultTitleWrapper>
              {filteredLabs.length > 0 && (
                <DoubleCardsWrapper>
                  <CardsWrapper>
                    {evenIndexLabs.map((lab, index) => (
                      //TODO: 실제 데이터 연동하기
                      <LabCard
                        key={index}
                        name={lab.name}
                        department={lab.department}
                        professor={lab.professor}
                        summary={lab.summary}
                        fieldList={lab.fieldList}
                        onClick={(number: number) => navigate(`/lab/${number}`)}
                      />
                    ))}
                  </CardsWrapper>
                  <CardsWrapper>
                    {oddIndexLabs.map((lab, index) => (
                      //TODO: 실제 데이터 연동하기
                      <LabCard
                        key={index}
                        name={lab.name}
                        department={lab.department}
                        professor={lab.professor}
                        summary={lab.summary}
                        fieldList={lab.fieldList}
                        onClick={(number: number) => navigate(`/lab/${number}`)}
                      />
                    ))}
                  </CardsWrapper>
                </DoubleCardsWrapper>
              )}
              {filteredLabs.length === 0 && (
                <NothingWrapper>
                  <Typography type="Normal" color="Text.placeholder">
                    {t('ui.lab.noLabResult')}
                  </Typography>
                </NothingWrapper>
              )}
            </LabSearchResultWrapper>
          )}
          {isSearching && searchType === 'paper' && (
            <LabSearchResultWrapper>
              <LabSearchResultTitleWrapper>
                <Typography type="BiggerBold" color="Text.default">
                  {t('ui.lab.labResult')}
                </Typography>
                <Typography type="BigBold" color="Text.default">
                  (총 {filteredPapers.length}건)
                </Typography>
              </LabSearchResultTitleWrapper>
              {filteredPapers.length > 0 && (
                <CardsWrapper>
                  {filteredPapers.map((paper, index) => (
                    <LongPaperCard
                      key={index}
                      title={paper.title}
                      summary={paper.summary}
                      fieldList={paper.fieldList}
                      onClick={(paperId) => navigate(`/paper/${paperId}`)}
                    />
                  ))}
                </CardsWrapper>
              )}
              {filteredPapers.length === 0 && (
                <NothingWrapper>
                  <Typography type="Normal" color="Text.placeholder">
                    {t('ui.lab.noPaperResult')}
                  </Typography>
                </NothingWrapper>
              )}
            </LabSearchResultWrapper>
          )}
          {!isSearching && (
            <MainContentWrapper>
              <LabRecommendationWrapper>
                <LabRecommendationTitleWrapper>
                  <Typography type="BiggerBold" color="Text.default">
                    {t('ui.lab.recommendLabs')}
                  </Typography>
                  <ClickWebsiteButton onClick={() => setRecommendedLabMode(true)}>
                    <Icon
                      type="FormatListBulleted"
                      size={theme.fonts.iconSize.medium}
                      color={theme.colors.Text.lighter}
                    />
                    <Typography type="Normal" color="Text.lighter">
                      {t('ui.lab.seeRecommendedLabs')}
                    </Typography>
                  </ClickWebsiteButton>
                </LabRecommendationTitleWrapper>
                <HorizontalScrollWrapper>
                  <LabRecommendationScroll>
                    {mockMajorLabs.map((item, index) => (
                      //TODO: 실제 데이터 연동하기
                      <LabCard
                        key={index}
                        name={item.name}
                        department={item.department}
                        professor={item.professor}
                        summary={item.summary}
                        fieldList={item.fieldList}
                        onClick={() => navigate(`/lab/${index + 1}`)}
                      />
                    ))}
                  </LabRecommendationScroll>
                </HorizontalScrollWrapper>
              </LabRecommendationWrapper>
              <PaperRecommendationWrapper>
                <RecentPaperListWrapper>
                  <LabRecommendationTitleWrapper>
                    <Typography type="BiggerBold" color="Text.default">
                      {t('ui.lab.recommendPapers')}
                    </Typography>
                    <ClickWebsiteButton onClick={() => setRecommendedPaperMode(true)}>
                      <Icon
                        type="FormatListBulleted"
                        size={theme.fonts.iconSize.medium}
                        color={theme.colors.Text.lighter}
                      />
                      <Typography type="Normal" color="Text.lighter">
                        {t('ui.lab.seeRecommendedPapers')}
                      </Typography>
                    </ClickWebsiteButton>
                  </LabRecommendationTitleWrapper>
                  <PaperTitleWrapper>
                    {paperList.slice(0, 5).map((item, index) => (
                      <PaperTitle key={index} isLast={index === 4}>
                        <Typography type="NormalBold" color="Highlight.default">
                          {index + 1}
                        </Typography>
                        <EllipsisTwoLines>
                          <Typography type="Normal" color="Text.default">
                            {item.title}
                          </Typography>
                        </EllipsisTwoLines>
                      </PaperTitle>
                    ))}
                  </PaperTitleWrapper>
                </RecentPaperListWrapper>
                <VerticalDivider />
                <RecentPaperListWrapper>
                  <LabRecommendationTitleWrapper>
                    <Typography type="BiggerBold" color="Text.default">
                      {t('ui.lab.latestPapers')}
                    </Typography>
                    <ClickWebsiteButton onClick={() => setLatestPaperMode(true)}>
                      <Icon
                        type="FormatListBulleted"
                        size={theme.fonts.iconSize.medium}
                        color={theme.colors.Text.lighter}
                      />
                      <Typography type="Normal" color="Text.lighter">
                        {t('ui.lab.seeLatestPapers')}
                      </Typography>
                    </ClickWebsiteButton>
                  </LabRecommendationTitleWrapper>
                  <PaperTitleWrapper>
                    {paperList.slice(0, 5).map((item, index) => (
                      <PaperTitle key={index} isLast={index === 4}>
                        <Typography type="NormalBold" color="Highlight.default">
                          {index + 1}
                        </Typography>
                        <EllipsisTwoLines>
                          <Typography type="Normal" color="Text.default">
                            {item.title}
                          </Typography>
                        </EllipsisTwoLines>
                      </PaperTitle>
                    ))}
                  </PaperTitleWrapper>
                </RecentPaperListWrapper>
              </PaperRecommendationWrapper>
              <LabRecommendationWrapper>
                <LabRecommendationTitleWrapper>
                  <Typography type="BiggerBold" color="Text.default">
                    {t('ui.lab.hotIndividualStudyReviews')}
                  </Typography>
                </LabRecommendationTitleWrapper>
                <HorizontalScrollWrapper>
                  <LabRecommendationScroll>
                    {reviewList.map((item, index) => (
                      <ReviewCard
                        key={index}
                        professor={item.professor}
                        content={item.content}
                        like={item.like}
                        load={item.load}
                        grade={item.grade}
                        lecture={item.lecture}
                      />
                    ))}
                  </LabRecommendationScroll>
                </HorizontalScrollWrapper>
              </LabRecommendationWrapper>
            </MainContentWrapper>
          )}
        </>
      )}
    </MainWrapper>
  );
};
