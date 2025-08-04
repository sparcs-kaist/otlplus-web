'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { ChevronLeft, ShoppingBag } from '@mui/icons-material';
import TextInput from '@/features/lab/components/TextInput';
import { Mode } from '@/features/lab/enum/Mode';
import DepartmentChip from './DepartmentChip';
import { useNavigate } from 'react-router-dom';

export interface MainSearchProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  lab: boolean;
  setLab: (open: boolean) => void;
  selectedDepartments: string[];
  setSelectedDepartments: React.Dispatch<React.SetStateAction<string[]>>;
  setRecentSearch: (string: string) => void;
}

interface ChipProps {
  isLab: boolean;
}

interface ModeProps {
  mode: Mode;
}

const MainSearchWrapper = styled.div<ModeProps>`
  display: flex;
  align-items: flex-end;

  gap: 8px;
  flex: 0;
  flex-direction: column;

  border: 1px solid ${({ theme }) => theme.colors.Line.divider};
  ${({ mode }) =>
    mode === Mode.none
      ? `
    border-radius: 6px`
      : 'border-radius: 6px 6px 0 0'};
  background: #fff;
  position: relative;
`;

const MainSearchBottom = styled.div`
  display: flex;
  padding: 24px 16px 16px 16px;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  align-self: stretch;
  border-left: 1px solid ${({ theme }) => theme.colors.Line.divider};
  border-bottom: 1px solid ${({ theme }) => theme.colors.Line.divider};
  border-right: 1px solid ${({ theme }) => theme.colors.Line.divider};
  border-radius: 0 0 6px 6px;

  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
`;

const MainSearchLabOrPaperBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const ChipContainer = styled.div<ChipProps>`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  border-radius: 16px;
  background: ${({ isLab, theme }) =>
    isLab ? theme.colors.Background.Page.default : theme.colors.Background.Button.default};
  color: ${({ isLab, theme }) =>
    isLab ? theme.colors.Background.Tile.highlight : theme.colors.Text.light};
  cursor: pointer;
`;

const MainSearchLabOrPaperTopButton = styled.div<ModeProps>`
  display: flex;
  width: 100px;
  height: 48px;
  max-width: 195px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.Line.divider};

  ${({ mode, theme }) =>
    mode === Mode.department
      ? `
    border-bottom: 1px solid ${theme.colors.Line.divider}`
      : ''};
  overflow: hidden;
`;

const MainSearchDepartmentTopButton = styled.div<ModeProps>`
  display: flex;
  height: 48px;
  max-width: 195px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  border-right: 1px solid ${({ theme }) => theme.colors.Line.divider};

  ${({ mode, theme }) =>
    mode === Mode.labOrPaper
      ? `
    border-bottom: 1px solid ${theme.colors.Line.divider}`
      : ''};
  overflow: hidden;
`;

const MainSearchTop = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  align-self: stretch;
`;

const DepartmentTagWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const IconDownWrapper = styled.div`
  transform: rotate(-90deg);
`;

const IconUpWrapper = styled.div`
  transform: rotate(90deg);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const InputWrapper = styled.div<ModeProps>`
  display: flex;
  min-width: 157px;
  padding: 0 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;

  ${({ mode, theme }) =>
    mode !== Mode.none
      ? `
    border-bottom: 1px solid ${theme.colors.Line.divider}`
      : ''};
`;

const MainSearch: React.FC<MainSearchProps> = ({
  mode,
  setMode,
  lab,
  setLab,
  selectedDepartments,
  setSelectedDepartments,
  setRecentSearch,
}) => {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  const departmentList = [
    '전체',
    '인문',
    '건환',
    '기경',
    '기계',
    '뇌인지',
    '물리',
    '바공',
    '반시공',
    '산공',
    '산디',
    '생명',
    '생화공',
    '수리',
    '신소재',
    '원양',
    '융인',
    '전산',
    '전자',
    '항공',
    '화학',
    '기타',
  ];

  const realDepartments = departmentList.filter((d) => d !== '전체');

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev: string[]) => {
      const isAll = dept === '전체';

      if (isAll) {
        const isAllSelected = realDepartments.every((d) => prev.includes(d));
        return isAllSelected ? [] : [...realDepartments];
      } else {
        const newSet = prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept];

        return newSet;
      }
    });
  };

  const queryDepartment = '&department=' + selectedDepartments.join('&department=');

  return (
    <MainSearchWrapper mode={mode}>
      <MainSearchTop>
        <MainSearchDepartmentTopButton
          mode={mode}
          onClick={() => {
            if (mode === Mode.department) {
              setMode(Mode.none);
            } else {
              setMode(Mode.department);
            }
          }}>
          {selectedDepartments.length > 0 ? (
            <IconAndText>
              <Icon type="ShoppingBag" size={20} color="#E54C65" />
              <Typography
                type="Big"
                color="Highlight.default"
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                학과 ({selectedDepartments.length}) {selectedDepartments.join(', ')}
              </Typography>
            </IconAndText>
          ) : (
            <IconAndText>
              <Icon type="ShoppingBag" size={20} color="#AAAAAA" />
              <Typography type="Big" color="Text.placeholder">
                학과
              </Typography>
            </IconAndText>
          )}

          {mode === Mode.department ? (
            <IconUpWrapper>
              <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
            </IconUpWrapper>
          ) : (
            <IconDownWrapper>
              <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
            </IconDownWrapper>
          )}
        </MainSearchDepartmentTopButton>
        {lab ? (
          <MainSearchLabOrPaperTopButton
            mode={mode}
            onClick={() => {
              if (mode === Mode.labOrPaper) {
                setMode(Mode.none);
              } else {
                setMode(Mode.labOrPaper);
              }
            }}>
            <Typography type="Big" color="Highlight.default">
              연구실
            </Typography>
            {mode === Mode.labOrPaper ? (
              <IconUpWrapper>
                <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
              </IconUpWrapper>
            ) : (
              <IconDownWrapper>
                <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
              </IconDownWrapper>
            )}
          </MainSearchLabOrPaperTopButton>
        ) : (
          <MainSearchLabOrPaperTopButton
            mode={mode}
            onClick={() => {
              if (mode === Mode.labOrPaper) {
                setMode(Mode.none);
              } else {
                setMode(Mode.labOrPaper);
              }
            }}>
            <Typography type="Big" color="Highlight.default">
              논문
            </Typography>
            {mode === Mode.labOrPaper ? (
              <IconUpWrapper>
                <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
              </IconUpWrapper>
            ) : (
              <IconDownWrapper>
                <Icon type="ChevronLeft" size={20} color="#AAAAAA" />
              </IconDownWrapper>
            )}
          </MainSearchLabOrPaperTopButton>
        )}

        <InputWrapper mode={mode}>
          <TextInput
            placeholder="검색어를 입력하세요"
            value={text}
            handleChange={setText}
            mode={mode}
            setRecentSearch={setRecentSearch}
          />
          {text !== '' && (
            <IconWrapper>
              <Icon
                type="Cancel"
                color="#ED8C9C"
                size={20}
                onClick={() => {
                  setText('');
                  navigate('/lab');
                }}
              />
            </IconWrapper>
          )}
          <IconWrapper>
            <Icon
              type="Search"
              color="#E54C65"
              size={20}
              onClick={() => {
                if (text.trim() === '') navigate('/lab');
                setRecentSearch(text);
                // setText('');
                navigate(
                  '/lab?keyword=' +
                    encodeURIComponent(text.trim()) +
                    '&type=' +
                    encodeURIComponent(lab ? 'lab' : 'paper') +
                    queryDepartment,
                );
              }}
            />
          </IconWrapper>
        </InputWrapper>
      </MainSearchTop>
      {mode === Mode.labOrPaper && (
        <MainSearchBottom>
          <MainSearchLabOrPaperBottomWrapper>
            <ChipContainer isLab={lab} onClick={() => setLab(true)}>
              <Typography type="Normal">연구실</Typography>
            </ChipContainer>
            <ChipContainer isLab={!lab} onClick={() => setLab(false)}>
              <Typography type="Normal">논문</Typography>
            </ChipContainer>
          </MainSearchLabOrPaperBottomWrapper>
        </MainSearchBottom>
      )}
      {mode === Mode.department && (
        <MainSearchBottom>
          <DepartmentTagWrapper>
            <DepartmentChip
              key="전체"
              text="전체"
              selected={realDepartments.every((d) => selectedDepartments.includes(d))}
              onClick={() => toggleDepartment('전체')}
            />
            {realDepartments.map((dept) => (
              <DepartmentChip
                key={dept}
                text={dept}
                selected={selectedDepartments.includes(dept)}
                onClick={() => toggleDepartment(dept)}
              />
            ))}
          </DepartmentTagWrapper>
        </MainSearchBottom>
      )}
    </MainSearchWrapper>
  );
};

export default MainSearch;
