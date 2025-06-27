import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';
import { useTranslation } from 'react-i18next';

interface AttributeEntry {
  name: string;
  info: string | React.ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onInfoClick?: () => void;
  isInfoClickDisabled?: boolean;
}

interface AttributesProps {
  entries: AttributeEntry[];
  fixedWidthName?: boolean;
  longName?: boolean;
  longInfo?: boolean;
}

const Attributes = ({
  entries,
  fixedWidthName = false,
  longName = false,
  longInfo = false,
}: AttributesProps) => {
  const { t } = useTranslation();

  return (
    <div>
      {entries.map((e) => (
        <div
          className={classNames(
            'attribute',
            longName ? 'attribute--long-name' : '',
            longInfo ? 'attribute--long-info' : '',
          )}
          onMouseOver={e.onMouseOver}
          onMouseOut={e.onMouseOut}
          key={e.name}>
          <div className={classNames(fixedWidthName ? t('jsx.className.fixedByLang') : '')}>
            {e.name}
          </div>
          {e.onInfoClick ? (
            <div
              className={classNames(
                'text-button',
                e.isInfoClickDisabled ? 'text-button--disabled' : '',
              )}
              onClick={e.onInfoClick}>
              {e.info}
            </div>
          ) : (
            <div>{e.info}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Attributes;
