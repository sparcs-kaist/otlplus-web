'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

export interface ReviewCardProps {
  professor: string; // 교수
  content: string; // 내용
  like: number; // 좋아요
  grade: string; // 성적
  load: string; // 널널
  lecture: string; // 강의
}

const ReviewCardContainer = styled.div`
  display: flex;
  width: 330px;
  height: 275px;
  padding: 8px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background-color: #fafafa;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const Content = styled.div`
  height: 197px;
  flex-shrink: 0;
  align-self: stretch;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ReviewCard: React.FC<ReviewCardProps> = ({
  professor,
  content,
  like,
  grade,
  load,
  lecture,
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <ReviewCardContainer>
      <Header>
        <Typography type="NormalBold">개별연구</Typography>
        <Typography type="Normal" color="Text.lighter">
          {professor}
        </Typography>
      </Header>
      <Content>
        <Typography type="Normal" color="Text.default">
          {content}
        </Typography>
      </Content>
      <BottomWrapper>
        <InfoWrapper>
          <Typography type="Normal" color="Text.lighter">
            좋아요 {like}
          </Typography>
          <Typography type="Normal" color="Text.lighter">
            성적 {grade}
          </Typography>
          <Typography type="Normal" color="Text.lighter">
            널널 {load}
          </Typography>
          <Typography type="Normal" color="Text.lighter">
            강의 {lecture}
          </Typography>
        </InfoWrapper>
        <LikeWrapper>
          <Typography type="NormalBold" color="Highlight.default">
            좋아요
          </Typography>
          <LikeIconWrapper>
            {liked ? (
              <Icon type="Favorite" size={16} color="#e54c65" onClick={() => setLiked(false)} />
            ) : (
              <Icon
                type="FavoriteBorder"
                size={16}
                color="#e54c65"
                onClick={() => setLiked(true)}
              />
            )}
          </LikeIconWrapper>
        </LikeWrapper>
      </BottomWrapper>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
