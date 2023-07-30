import style from '../../sass/utils/_spacer.module.scss';

interface ISpacerProps {
  height: number;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Spacer: React.FC<ISpacerProps> = (props) => {
  return (
    <div className={style.spacer} style={{ height: `${props.height}px` }} onClick={props.onClick} />
  );
};

export default Spacer;
