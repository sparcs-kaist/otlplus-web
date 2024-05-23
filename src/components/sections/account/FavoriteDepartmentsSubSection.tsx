import { FormEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import SearchFilter from '@/components/SearchFilter';
import {
  useDepartmentOptions,
  useSessionInfo,
  useUpdateFavoriteDepartments,
} from '@/queries/account';

const FavoriteDepartmentsSubSection = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set([]));

  const { t } = useTranslation();
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

    updateFavoriteDepartments({
      selectedDepartments: Array.from(selectedDepartments).filter((d) => d !== 'ALL'),
    });
  };

  if (!user || !departmentOptions) {
    return null;
  }

  const hasChange =
    new Set(user.favorite_departments.map((d) => d.id.toString())).size !==
      selectedDepartments.size ||
    [...new Set(user.favorite_departments.map((d) => d.id.toString()))].some(
      (d) => !selectedDepartments.has(d),
    );

  return (
    <div className={classNames('subsection', 'subsection--favorite-department')}>
      <div className={classNames('title')}>{t('ui.title.settings')}</div>
      {departmentOptions.length !== 0 && (
        <form onSubmit={handleSubmit}>
          <SearchFilter
            updateCheckedValues={(checkedValues: Set<string>) =>
              setSelectedDepartments(checkedValues)
            }
            inputName="department"
            titleName={t('ui.search.favoriteDepartment')}
            options={departmentOptions}
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
      )}
    </div>
  );
};

export default FavoriteDepartmentsSubSection;
