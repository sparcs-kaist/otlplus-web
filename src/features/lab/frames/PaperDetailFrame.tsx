import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import PaperCard from '@/features/lab/components/PaperCard';
import ReviewCard from '@/features/lab/components/ReviewCard';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import { mockReview } from '@/features/lab/mock/mockReview';
import Image from 'next/image';
import logoImage from '@/static/favicon-64.png';

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
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  min-width: 0;
  flex: 1 1 0;
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

const ClickWebsiteButton = styled.button`
  display: flex;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;
`;

const LabInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
`;

const InfoWrapper = styled.div`
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

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const TagWrapper = styled.div`
  display: flex;
  height: 32px;
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

const RightButtonWrapper = styled.div`
  display: flex;
  padding-left: 10px;
  align-items: center;
  gap: 13px;
`;

const PaperContentTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const PaperContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const TitleAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypographyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaperDetailFrame = () => {
  const navigate = useNavigate();
  const paperList = mockPaperList();
  // const reviewList = mockReview();
  // const [liked, setLiked] = useState(false);
  return (
    <MainWrapper>
      <MainInnerWrapper>
        <TotalHeaderWrapper>
          <HeaderWrapper>
            <BackIconWrapper>
              <Icon
                type="ChevronLeft"
                size={24}
                color="#aaa"
                onClick={() => navigate('/lab')} // chacha: 임시
              />
            </BackIconWrapper>
            <TitleWrapper>
              <Typography type="BiggerBold" style={{ wordBreak: 'break-word' }}>
                여기에 논문 제목이 들어갑니다. 논문 제목은 보통 길기 때문에 두 줄이나 세 줄 정도는
                될 수 있을 것 같습니다. 여기에 논문 제목이 들어갑니다. 논문 제목은 보통 길기 때문에
                두 줄이나 세 줄 정도는 될 수 있을 것 같습니다.
              </Typography>
            </TitleWrapper>
          </HeaderWrapper>
          <LabInfoWrapper>
            <InfoWrapper>
              <SubHeadingAndText>
                <Typography type="NormalBold">자료 유형</Typography>
                <Typography type="Normal">학술 저널</Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">저자</Typography>
                <Typography type="Normal">저자명</Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">저널 정보</Typography>
                <Typography type="Normal">
                  저널 정보{'>'}저널 정보{'>'}저널 정보
                </Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">발행 연도</Typography>
                <Typography type="Normal">2000.12</Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">수록면</Typography>
                <Typography type="Normal">67 - 80 (14page)</Typography>
              </SubHeadingAndText>
              <SubHeadingAndText>
                <Typography type="NormalBold">DOI</Typography>
                <Typography type="Normal">10.00000/sparcs.2000.00.0.00</Typography>
              </SubHeadingAndText>
            </InfoWrapper>
            <TagContainer>
              <TagWrapper>
                <TagBlock>
                  <Typography type={'Normal'} color={'Text.lighter'}>
                    # 주제
                  </Typography>
                </TagBlock>
                <TagBlock>
                  <Typography type={'Normal'} color={'Text.lighter'}>
                    # 주제
                  </Typography>
                </TagBlock>
                <TagBlock>
                  <Typography type={'Normal'} color={'Text.lighter'}>
                    # 주제
                  </Typography>
                </TagBlock>
              </TagWrapper>
              <RightButtonWrapper>
                <ClickWebsiteButton onClick={() => navigate('/lab')}>
                  <Icon type="ExitToApp" size={18} color="#888" />
                  <Typography type="Normal" color="Text.lighter">
                    발행 연구실로 이동
                  </Typography>
                </ClickWebsiteButton>
                <ClickWebsiteButton onClick={() => navigate('/lab')}>
                  <Icon type="ExitToApp" size={18} color="#888" />
                  <Typography type="Normal" color="Text.lighter">
                    원문 보기
                  </Typography>
                </ClickWebsiteButton>
              </RightButtonWrapper>
            </TagContainer>
          </LabInfoWrapper>
        </TotalHeaderWrapper>
        <Divider />
        <PaperContentTotalWrapper>
          <PaperContentWrapper>
            <TitleAndIconWrapper>
              <img src={logoImage} alt={'OTL Logo'} width={20} height={20} />
              <Typography type={'BiggerBold'} color={'Highlight.default'}>
                AI 요약
              </Typography>
            </TitleAndIconWrapper>
            <TypographyWrapper>
              <Typography type={'NormalBold'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은
                여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다.
                AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은
                여기에 들어갑니다.{' '}
              </Typography>
              <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                - AI요약 내용은 여기에 들어갑니다.
              </Typography>
              <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                - AI요약 내용은 여기에 들어갑니다.
              </Typography>
              <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은
                여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다.
              </Typography>
              <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은
                여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다.
              </Typography>
              <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
                AI요약 내용은 여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다. AI요약 내용은
                여기에 들어갑니다. AI요약 내용은 여기에 들어갑니다.
              </Typography>
            </TypographyWrapper>
          </PaperContentWrapper>
          <PaperContentWrapper>
            <TitleAndIconWrapper>
              <Typography type={'BiggerBold'} color={'Highlight.default'}>
                Abstract
              </Typography>
            </TitleAndIconWrapper>
            <Typography type={'Normal'} color={'Text.default'} style={{ lineHeight: 1.5 }}>
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다. Abstract 요약 내용은 여기에 들어갑니다.
              Abstract 요약 내용은 여기에 들어갑니다.
            </Typography>
          </PaperContentWrapper>
        </PaperContentTotalWrapper>
        <Divider />
        <HorizontalScrollListSection>
          <RecentPaperListTitle>
            <Typography type="BiggerBold">연구실 최근 발행 논문</Typography>
            <ClickWebsiteButton onClick={() => navigate('/lab')}>
              <Icon type="FormatListBulleted" size={18} color="#888" />
              <Typography type="Normal" color="Text.lighter">
                연구실 논문 전체보기
              </Typography>
            </ClickWebsiteButton>
          </RecentPaperListTitle>
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
        </HorizontalScrollListSection>
      </MainInnerWrapper>
    </MainWrapper>
  );
};
