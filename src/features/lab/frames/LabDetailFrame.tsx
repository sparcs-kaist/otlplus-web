import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';
import PaperCard from '@/features/lab/components/PaperCard';
import ReviewCard from '@/features/lab/components/ReviewCard';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import { mockReview } from '@/features/lab/mock/mockReview';
import { ViewMorePaperFrame } from '@/features/lab/frames/ViewMorePaperFrame';
import { ViewMoreReviewFrame } from '@/features/lab/frames/ViewMoreReviewFrame';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  padding: 24px;
  box-sizing: border-box;
`;

const MainInnerWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TotalHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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

const TagWrapper = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 8px;
`;

const TagBlock = styled.div`
  display: flex;
  height: 32px;
  padding: 8px 10px;
  align-items: center;
  gap: 6px;
  border-radius: 16px;
  background-color: #f5f5f5;
`;

const HeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const ApplyButton = styled.button`
  display: flex;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background-color: #e54c65;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const LabInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
`;

const ProfWithDepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  width: 100%;
`;

const LabIntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  width: 100%;
`;

const SubHeadingAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  border-top: 1px solid #edd1dc;
  width: 100%;
`;

const HorizontalScrollListSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

const RecentPaperListTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const RecentPaperScrollWrapper = styled.div`
  overflow: scroll;
  width: 100%;
`;

const RecentPaperScroll = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: max-content;
  flex-shrink: 0;
`;

const NoListProvidedWrapper = styled.div`
  display: flex;
  height: 299px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
`;

const SlidersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
`;

const SlideWrapper = styled.div<{ maxheight: number; open: boolean }>`
  overflow: hidden;
  background: white;
  transition: max-height 0.5s ease;
  max-height: ${({ open, maxheight }) => (open ? `${maxheight}px` : '0px')};
  //display: ${({ open }) => (open ? `` : 'none')};
`;

// const SlideWrapper = styled.div<{ open: boolean }>`
//   overflow: hidden;
//   transition: max-height 0.5s ease-in-out;
//
//   position: ${({ open }) => (open ? 'static' : 'absolute')};
//   left: 0;
//   right: 0;
//   visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
//   pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
//
//   max-height: 0;
// `;

const IconWrapper = styled.div`
  transform: rotate(-90deg);
`;

export const LabDetailFrame = () => {
  const navigate = useNavigate();
  const paperList = mockPaperList();
  const reviewList = mockReview();
  const [viewMorePaper, setViewMorePaper] = useState(false); // 연구실의 전체 논문 보러 간 상태
  const [viewMoreReview, setViewMoreReview] = useState(false); // 연구실의 전체 리뷰 보러 간 상태
  const [liked, setLiked] = useState(false);
  const [maxPaperHeight, setMaxPaperHeight] = useState(0);
  const [maxReviewHeight, setMaxReviewHeight] = useState(0);
  const paperRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMorePaper && paperRef.current) {
      setMaxPaperHeight(paperRef.current.scrollHeight);
    }
  }, [viewMorePaper]);

  useEffect(() => {
    if (viewMoreReview && reviewRef.current) {
      setMaxReviewHeight(reviewRef.current.scrollHeight);
    }
  }, [viewMoreReview]);

  // useEffect(() => {
  //   const paperElement = paperRef.current;
  //   if (!paperElement) return;
  //
  //   if (viewMorePaper) {
  //     paperElement.style.maxHeight = `${paperElement.scrollHeight}px`;
  //   } else {
  //     paperElement.style.maxHeight = `${paperElement.scrollHeight}px`;
  //     requestAnimationFrame(() => {
  //       paperElement.style.maxHeight = '0px';
  //     });
  //   }
  // }, [viewMorePaper]);

  // useEffect(() => {
  //   const reviewElement = reviewRef.current;
  //   if (!reviewElement) return;
  //
  //   if (viewMoreReview) {
  //     reviewElement.style.maxHeight = `${reviewElement.scrollHeight}px`;
  //   } else {
  //     reviewElement.style.maxHeight = `${reviewElement.scrollHeight}px`;
  //     requestAnimationFrame(() => {
  //       reviewElement.style.maxHeight = '0px';
  //     });
  //   }
  // }, [viewMoreReview]);

  return (
    <MainWrapper>
      <MainInnerWrapper>
        <TotalHeaderWrapper>
          <HeaderWrapper>
            <HeaderLeftWrapper>
              <BackIconWrapper>
                <Icon
                  type="ChevronLeft"
                  size={24}
                  color="#aaa"
                  onClick={() => navigate('/lab')} // chacha: 임시
                />
              </BackIconWrapper>
              <TitleWithTagWrapper>
                <Typography type="BiggerBold">연구실명</Typography>
                <TagWrapper>
                  <TagBlock>
                    <Typography type="Normal" color="Text.lighter">
                      # 주제
                    </Typography>
                  </TagBlock>
                  <TagBlock>
                    <Typography type="Normal" color="Text.lighter">
                      # 주제
                    </Typography>
                  </TagBlock>
                  <TagBlock>
                    <Typography type="Normal" color="Text.lighter">
                      # 주제
                    </Typography>
                  </TagBlock>
                </TagWrapper>
              </TitleWithTagWrapper>
            </HeaderLeftWrapper>
            <HeaderRightWrapper>
              <ClickWebsiteButton onClick={() => navigate('/lab')}>
                <Icon type="ExitToApp" size={18} color="#888" />
                <Typography type="Normal" color="Text.lighter">
                  홈페이지 바로가기
                </Typography>
              </ClickWebsiteButton>
              <ApplyButton>
                <Icon type="Drafts" size={18} color="#F9F0F0" />
                <Typography type="Normal" color="Line.default">
                  지원하기
                </Typography>
              </ApplyButton>
              <LikeIconWrapper>
                {liked ? (
                  <Icon type="Favorite" size={20} color="#e54c65" onClick={() => setLiked(false)} />
                ) : (
                  <Icon
                    type="FavoriteBorder"
                    size={20}
                    color="#aaa"
                    onClick={() => setLiked(true)}
                  />
                )}
              </LikeIconWrapper>
            </HeaderRightWrapper>
          </HeaderWrapper>
          <LabInfoWrapper>
            <ProfWithDepWrapper>
              <SubHeadingAndText>
                <Typography type="NormalBold">학과</Typography>
                <Typography type="Normal">학과명</Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">교수</Typography>
                <Typography type="Normal">교수명</Typography>
              </SubHeadingAndText>
            </ProfWithDepWrapper>
            <LabIntroWrapper>
              <Typography type="NormalBold">연구실 소개</Typography>
              <Typography type="Normal">
                해당 연구실에 관한 설명이 들어갑니다. 주로 연구하는 분야 등의 정보가 들어갑니다.
                해당 연구실에 관한 설명이 들어갑니다. 주로 연구하는 분야 등의 정보가 들어갑니다.해당
                연구실에 관한 설명이 들어갑니다. 주로 연구하는 분야 등의 정보가 들어갑니다. 해당
                연구실에 관한 설명이 들어갑니다. 주로 연구하는 분야 등의 정보가 들어갑니다.
              </Typography>
            </LabIntroWrapper>
          </LabInfoWrapper>
        </TotalHeaderWrapper>
        <Divider />
        <SlidersWrapper>
          <SlideWrapper
            ref={paperRef}
            maxheight={maxPaperHeight}
            open={viewMorePaper && !viewMoreReview}>
            <ViewMorePaperFrame setViewMorePaper={setViewMorePaper} />
          </SlideWrapper>
          <SlideWrapper
            ref={reviewRef}
            maxheight={maxReviewHeight}
            open={viewMoreReview && !viewMorePaper}>
            <ViewMoreReviewFrame setViewMoreReview={setViewMoreReview} />
          </SlideWrapper>
          {!viewMorePaper && !viewMoreReview && (
            <ContentWrapper>
              <HorizontalScrollListSection>
                <RecentPaperListTitle>
                  <Typography type="BigBold">최근 발행 논문</Typography>
                  <ClickWebsiteButton onClick={() => setViewMorePaper(true)}>
                    <IconWrapper>
                      <Icon type="ChevronLeft" size={18} color="#888" />
                    </IconWrapper>
                    <Typography type="Normal" color="Text.lighter">
                      연구실 논문 전체보기
                    </Typography>
                  </ClickWebsiteButton>
                </RecentPaperListTitle>
                {paperList.length !== 0 ? (
                  <RecentPaperScrollWrapper>
                    <RecentPaperScroll>
                      {paperList.map((item, index) => (
                        <PaperCard
                          key={index}
                          title={item.title}
                          fieldList={item.fieldList}
                          summary={item.summary}
                        />
                      ))}
                    </RecentPaperScroll>
                  </RecentPaperScrollWrapper>
                ) : (
                  <NoListProvidedWrapper>
                    <Typography type={'Normal'} color={'Text.placeholder'}>
                      발행 논문이 없습니다.
                    </Typography>{' '}
                  </NoListProvidedWrapper>
                )}
              </HorizontalScrollListSection>
              <HorizontalScrollListSection>
                <RecentPaperListTitle>
                  <Typography type="BigBold">연구 후기</Typography>
                  <ClickWebsiteButton onClick={() => setViewMoreReview(true)}>
                    <IconWrapper>
                      <Icon type="ChevronLeft" size={18} color="#888" />
                    </IconWrapper>
                    <Typography type="Normal" color="Text.lighter">
                      개별연구 후기 전체보기
                    </Typography>
                  </ClickWebsiteButton>
                </RecentPaperListTitle>
                <RecentPaperScrollWrapper>
                  {reviewList.length !== 0 ? (
                    <RecentPaperScroll>
                      {reviewList.map((item, index) => (
                        <ReviewCard
                          key={index}
                          professor={item.professor}
                          content={item.content}
                          like={item.like}
                          grade={item.grade}
                          load={item.load}
                          lecture={item.lecture}
                        />
                      ))}
                    </RecentPaperScroll>
                  ) : (
                    <NoListProvidedWrapper>
                      <Typography type={'Normal'} color={'Text.placeholder'}>
                        발행 논문이 없습니다.
                      </Typography>{' '}
                    </NoListProvidedWrapper>
                  )}
                </RecentPaperScrollWrapper>
              </HorizontalScrollListSection>
            </ContentWrapper>
          )}
        </SlidersWrapper>
      </MainInnerWrapper>
    </MainWrapper>
  );
};
