import { FormEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import SearchFilter from '@/components/SearchFilter';
import {
  useDepartmentOptions,
  useSessionInfo,
  useUpdateFavoriteDepartments,
} from '@/queries/account';
import { useTranslatedString } from '@/hooks/useTranslatedString';

const FavoriteDepartmentsSubSection = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set([]));

  const { t } = useTranslation();
  const translate = useTranslatedString();
  const { data: user } = useSessionInfo();
  const { data: departmentOptions } = useDepartmentOptions();
  const { mutate: updateFavoriteDepartments } = useUpdateFavoriteDepartments();

  useEffect(() => {
    if (user) {
      setSelectedDepartments(new Set(user.favorite_departments.map((d) => String(d.id))));
    }
  }, [user]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    updateFavoriteDepartments({ selectedDepartments });
  };

  if (!user) {
    return null;
  }

  // TODO: Change comparison logic
  const hasChange =
    user.favorite_departments.length !== selectedDepartments.size ||
    user.favorite_departments.some(({ id }) => !selectedDepartments.has(id.toString()));

  return (
    <div className={classNames('subsection', 'subsection--favorite-department')}>
      <div className={classNames('title')}>{t('ui.title.settings')}</div>
      {departmentOptions ? (
        <form onSubmit={handleSubmit}>
          <SearchFilter
            updateCheckedValues={(checkedValues: Set<string>) =>
              setSelectedDepartments(checkedValues)
            }
            inputName="department"
            titleName={t('ui.search.favoriteDepartment')}
            options={departmentOptions.map((d) => [
              String(d.id),
              `${translate(d, 'name')} (${d.code})`,
            ])}
            checkedValues={selectedDepartments}
          />
          <div className={classNames('buttons')}>
            <button
              type="submit"
              className={classNames('text-button', { 'text-button--disabled': !hasChange })}
              disabled={!hasChange}>
              {t('ui.button.save')}
            </button>
          </div>
        </form>
      ) : (
        <span>{t('ui.placeholder.loading')}</span>
      )}
    </div>
  );
};

export default FavoriteDepartmentsSubSection;
