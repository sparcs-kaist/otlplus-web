'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

export interface LabCardProps {
  name: string; // 연구실명
  department: string; // 학과명
  professor: string; // 교수님명
  summary: string; // 연구실 요약 설명
  fieldList: string[]; // 분야 해시태그
  onClick?: (val: number) => void;
}

const LabCardContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 16px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  min-width: 330px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const PlaceholderImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background-color: #eee;
`;
interface TitleWithImageProps {
  onClick: (val: number) => void;
}

const TitleWithImage = styled.div.attrs<TitleWithImageProps>((props) => ({
  onClick: props.onClick, // 여기서 0은 예시값
}))<TitleWithImageProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DepartmentWithProfessor = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: #888;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const SummaryWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: #555;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FieldTagWrapper = styled.div`
  display: flex;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  color: #888;
`;

const LabCard: React.FC<LabCardProps> = ({
  name,
  department,
  professor,
  summary,
  fieldList,
  onClick,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <LabCardContainer>
      <TopContainer>
        <TitleWithImage onClick={onClick ?? (() => {})}>
          <PlaceholderImage />
          <TitleWrapper>
            <Typography
              type="BigBold"
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}>
              {name}
            </Typography>
            <DepartmentWithProfessor>
              {department} {professor}
            </DepartmentWithProfessor>
          </TitleWrapper>
        </TitleWithImage>
        <LikeIconWrapper>
          {liked ? (
            <Icon type="Favorite" size={20} color="#e54c65" onClick={() => setLiked(false)} />
          ) : (
            <Icon type="FavoriteBorder" size={20} color="#aaa" onClick={() => setLiked(true)} />
          )}
        </LikeIconWrapper>
      </TopContainer>
      <SummaryWrapper>{summary}</SummaryWrapper>
      <FieldTagWrapper>
        {fieldList.map((item, i) => (
          <TagBlock key={i}># {item}</TagBlock>
        ))}
      </FieldTagWrapper>
    </LabCardContainer>
  );
};

export default LabCard;
