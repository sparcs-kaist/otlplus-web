'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';

export interface DepartmentChipProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}

interface ChipProps {
  isSelected: boolean;
}

const ChipWrapper = styled.div<ChipProps>`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.Background.Page.default : '#f5f5f5'};
  border-radius: 16px;
  cursor: pointer;
`;

const DepartmentChip: React.FC<DepartmentChipProps> = ({ text, selected, onClick }) => {
  return selected ? (
    <ChipWrapper isSelected onClick={onClick}>
      <Typography type="Normal" color="Highlight.default">
        {text}
      </Typography>
      <Icon type="Check" color="#E54C65" size={13} />
    </ChipWrapper>
  ) : (
    <ChipWrapper isSelected={false} onClick={onClick}>
      <Typography type="Normal" color="Text.lighter">
        {text}
      </Typography>
      <Icon type="Add" color="#555555" size={13} />
    </ChipWrapper>
  );
};

export default DepartmentChip;
