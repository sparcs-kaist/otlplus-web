import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';
import React from 'react';
import PaperCard from '@/features/lab/components/PaperCard';
import { mockPaperList } from '@/features/lab/mock/mockPaperList';
import SmallPaperCard from '@/features/lab/components/SmallPaperCard';
import { mockReview } from '@/features/lab/mock/mockReview';
import ReviewCard from '@/features/lab/components/ReviewCard';
import SmallReviewCard from '@/features/lab/components/SmallReviewCard';

interface ViewMoreReviewFrameProps {
  setViewMoreReview: (value: boolean) => void;
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
  gap: 20px;
  align-self: stretch;
`;

const OneColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

export const ViewMoreReviewFrame: React.FC<ViewMoreReviewFrameProps> = ({ setViewMoreReview }) => {
  const reviewList = mockReview();
  const navigate = useNavigate();
  const reviewLength = reviewList.length;
  const firstReviewsIndexList = Array.from(
    { length: Math.ceil(reviewLength / 2) },
    (_, i) => i * 2,
  );
  const secondReviewsIndexList = Array.from(
    { length: Math.ceil(reviewLength / 2) },
    (_, i) => i * 2 + 1,
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
              onClick={() => setViewMoreReview(false)}
            />
          </BackIconWrapper>
          <TitleWithTagWrapper>
            <Typography type="BigBold">연구실 후기 전체보기</Typography>
          </TitleWithTagWrapper>
        </HeaderLeftWrapper>
      </HeaderContainer>
      <ThreeColumnWrapper>
        <OneColumnWrapper>
          {firstReviewsIndexList.map(
            (item, i) =>
              reviewList[item] && (
                <SmallReviewCard
                  key={item}
                  content={reviewList[item].content}
                  lecture={reviewList[item].lecture}
                  like={reviewList[item].like}
                  load={reviewList[item].load}
                  grade={reviewList[item].grade}
                  professor={reviewList[item].professor}
                />
              ),
          )}
        </OneColumnWrapper>
        <OneColumnWrapper>
          {secondReviewsIndexList.map(
            (item, i) =>
              reviewList[item] && (
                <SmallReviewCard
                  key={item}
                  content={reviewList[item].content}
                  lecture={reviewList[item].lecture}
                  like={reviewList[item].like}
                  load={reviewList[item].load}
                  grade={reviewList[item].grade}
                  professor={reviewList[item].professor}
                />
              ),
          )}
        </OneColumnWrapper>
      </ThreeColumnWrapper>
    </MainContainer>
  );
};
