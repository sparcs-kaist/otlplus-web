import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { UilSearch, UilCheck } from '@iconscout/react-unicons';

interface LabModalProps {
  onClose: () => void;
  onSave?: (selectedTags: string[]) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto; /* or max-width: 708px; */
  max-width: 90vw;
  max-height: 90vh;

  background-color: #fff;
  border-radius: 6px;
  padding: 27px 35px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1001;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 150%;
  color: #000;
  margin: 0;
`;

const SectionLabel = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #333;
`;

const SearchBar = styled.div`
  width: 638px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #eb809c;
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const SearchIcon = styled(UilSearch)`
  width: 16px;
  height: 16px;
  color: #eb809c;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #333;
  &::placeholder {
    color: #aaaaaa;
  }
`;

const SelectedTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 638px;
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid var(--Color-Line-default, #e8e8e8);
`;

const TrendingLabel = styled(SectionLabel)`
  color: #e54c65;
`;

const TrendingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 150px;
`;

const TrendingTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #f4f4f4;
  color: #999;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`;

const ButtonBase = styled.button`
  width: 315px;
  height: 36px;
  padding: 4px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(ButtonBase)`
  background-color: #f4f4f4;
  color: #999;
`;

const SaveButton = styled(ButtonBase)`
  background-color: #e54c65;
  color: #fff;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: rgba(229, 76, 101, 0.1);
  color: #e54c65;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const LabModal: React.FC<LabModalProps> = ({ onClose, onSave }) => {
  const [keyword, setKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const trending = ['AI', 'Diffusion', 'UX 디자인', '컴퓨터비전', '뇌인지과학'];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim()) {
      if (!selectedTags.includes(keyword.trim())) {
        setSelectedTags([...selectedTags, keyword.trim()]);
      }
      setKeyword('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAddTrending = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    onSave?.(selectedTags);
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <Title>
          정확한 연구실 추천을 위해 <br />
          관심 분야를 추가해 주세요!
        </Title>

        <SectionLabel>관심 분야</SectionLabel>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            placeholder="키워드로 검색해 보세요"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </SearchBar>

        <SelectedTagsRow>
          {selectedTags.map((tag) => (
            <TagItem key={tag} onClick={() => handleRemoveTag(tag)}>
              {tag}
              <UilCheck width="14" height="14" color="#e54c65" />
            </TagItem>
          ))}
        </SelectedTagsRow>

        <Divider />

        <TrendingLabel>인기 검색어</TrendingLabel>
        <TrendingTags>
          {trending.map((tag) => (
            <TrendingTag key={tag} onClick={() => handleAddTrending(tag)}>
              {tag} +
            </TrendingTag>
          ))}
        </TrendingTags>

        <Buttons>
          <CancelButton onClick={onClose}>괜찮아요</CancelButton>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default LabModal;
