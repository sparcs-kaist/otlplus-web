import LabCard, { LabCardProps } from '@/features/lab/components/LabCard';
import styled from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import Typography from '@/common/daily-tf/Typography';
import { useNavigate } from 'react-router';

interface MinorLabFrameProps {
  setMinorLabMode: (mode: boolean) => void;
  minorLabs: LabCardProps[];
}

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 6px 3px -3px #ed8c9ccc;
  border-radius: 6px;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
`;

const MainInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 48px;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
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

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px;
  flex: 1 0 0;
  align-self: stretch;
  flex-wrap: wrap;
`;

const DoubleCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const MinorLabFrame: React.FC<MinorLabFrameProps> = ({ setMinorLabMode, minorLabs }) => {
  const navigate = useNavigate();
  const indexList = Array.from({ length: Math.ceil(minorLabs.length / 2) }, (_, i) => i * 2);

  return (
    <MainWrapper>
      <MainInnerWrapper>
        <HeaderWrapper>
          <HeaderLeftWrapper>
            <BackIconWrapper>
              <Icon
                type="ChevronLeft"
                size={24}
                color="#aaa"
                onClick={() => setMinorLabMode(false)}
              />
            </BackIconWrapper>
            <Typography type="BiggerBold">부전공 학과 연구실</Typography>
          </HeaderLeftWrapper>
        </HeaderWrapper>

        <CardsWrapper>
          {indexList.map((idx, i) => (
            <DoubleCardsWrapper key={i}>
              <LabCard
                name={minorLabs[idx]?.name}
                department={minorLabs[idx]?.department}
                professor={minorLabs[idx]?.professor}
                summary={minorLabs[idx]?.summary}
                fieldList={minorLabs[idx]?.fieldList}
                onClick={() => navigate(`/lab/${idx}`)}
              />
              {minorLabs[idx + 1] && (
                <LabCard
                  name={minorLabs[idx + 1].name}
                  department={minorLabs[idx + 1].department}
                  professor={minorLabs[idx + 1].professor}
                  summary={minorLabs[idx + 1].summary}
                  fieldList={minorLabs[idx + 1].fieldList}
                  onClick={() => navigate(`/lab/${idx + 1}`)}
                />
              )}
            </DoubleCardsWrapper>
          ))}
        </CardsWrapper>
      </MainInnerWrapper>
    </MainWrapper>
  );
};
