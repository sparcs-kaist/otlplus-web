import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { range, sortBy, sum, sumBy } from 'lodash';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';
import { PLANNER_DEFAULT_CREDIT } from '../../../../common/constants';

import { setItemFocus, clearItemFocus } from '../../../../redux/actions/planner/itemFocus';
import {
  addItemToPlanner,
  removeItemFromPlanner,
  updateCellSize,
  updateItemInPlanner,
} from '../../../../redux/actions/planner/planner';

import { ItemFocusFrom } from '@/shapes/enum';

import userShape from '../../../../shapes/model/session/UserShape';
import plannerShape from '../../../../shapes/model/planner/PlannerShape';

import {
  getCourseOfItem,
  getCreditOfItem,
  getAuOfItem,
  getCreditAndAuOfItem,
} from '../../../../utils/itemUtils';
import { getCategoryOfItem, getColorOfItem } from '../../../../utils/itemCategoryUtils';
import { isDimmedItem, isFocusedItem, isTableClickedItem } from '../../../../utils/itemFocusUtils';
import PlannerTile from '@/components/tiles/PlannerTile';
import { getSemesterName } from '../../../../utils/semesterUtils';
import PlannerOverlay from '../../../PlannerOverlay';

import {
  performAddArbitraryToPlanner,
  performAddToPlanner,
} from '../../../../common/commonOperations';
import semesterShape from '../../../../shapes/model/subject/SemesterShape';
import itemFocusShape from '../../../../shapes/state/planner/ItemFocusShape';

class PlannerSubSection extends Component {
  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  _getItemsForSemester = (planner, year, semester) => {
    if (!planner) {
      return [];
    }

    return sortBy(
      [
        ...planner.taken_items.filter(
          (i) => i.lecture.year === year && i.lecture.semester === semester,
        ),
        ...planner.future_items.filter((i) => i.year === year && i.semester === semester),
        ...planner.arbitrary_items.filter((i) => i.year === year && i.semester === semester),
      ],
      (i) => {
        const category = getCategoryOfItem(planner, i);
        return i.is_excluded
          ? 100 ** 4
          : 0 +
              category[0] * 100 ** 3 +
              category[1] * 100 ** 2 +
              category[2] * 100 +
              (100 - getCreditAndAuOfItem(i));
      },
    );
  };

  resize = () => {
    const { updateCellSizeDispatch } = this.props;

    const cell = document
      .getElementsByClassName(classNames('subsection--planner__table__body__cell'))[0]
      .getBoundingClientRect();
    updateCellSizeDispatch(cell.width, cell.height + 1);
  };

  _getFromOfItem = (item) => {
    if (item.item_type === 'TAKEN') {
      return ItemFocusFrom.TABLE_TAKEN;
    }
    if (item.item_type === 'FUTURE') {
      return ItemFocusFrom.TABLE_FUTURE;
    }
    if (item.item_type === 'ARBITRARY') {
      return ItemFocusFrom.TABLE_ARBITRARY;
    }
    return '';
  };

  _getTileSizeOfItem = (item) => {
    return getCreditAndAuOfItem(item);
  };

  focusItemWithHover = (item) => {
    const { itemFocus, isDragging, setItemFocusDispatch } = this.props;

    if (!itemFocus.clicked && !isDragging) {
      setItemFocusDispatch(item, getCourseOfItem(item), this._getFromOfItem(item), false);
    }
  };

  unfocusItemWithHover = (item) => {
    const { itemFocus, clearItemFocusDispatch } = this.props;

    if (!itemFocus.clicked) {
      clearItemFocusDispatch();
    }
  };

  focusItemWithClick = (item) => {
    const { itemFocus, setItemFocusDispatch } = this.props;

    if (isTableClickedItem(item, itemFocus)) {
      setItemFocusDispatch(item, getCourseOfItem(item), this._getFromOfItem(item), false);
    } else {
      setItemFocusDispatch(item, getCourseOfItem(item), this._getFromOfItem(item), true);
    }
  };

  addCourseToPlanner = (course, year, semester) => {
    const {
      user,
      selectedPlanner,
      addItemToPlannerDispatch,
      setItemFocusDispatch,
      updateItemInPlannerDispatch,
    } = this.props;

    const beforeRequest = () => {};
    const afterResponse = (item, duplicateTakenItems) => {
      addItemToPlannerDispatch(item);
      setItemFocusDispatch(item, course, ItemFocusFrom.TABLE_FUTURE, true);
      duplicateTakenItems.forEach((ti) => {
        if (!user) {
          const newItem = {
            ...ti,
            is_excluded: true,
          };
          updateItemInPlannerDispatch(newItem);
        } else {
          axios
            .post(`/api/users/${user.id}/planners/${selectedPlanner.id}/update-item`, {
              item: ti.id,
              item_type: ti.item_type,
              is_excluded: true,
            })
            .then((response) => {
              const newProps = this.props;
              if (!newProps.selectedPlanner || newProps.selectedPlanner.id !== selectedPlanner.id) {
                return;
              }
              updateItemInPlannerDispatch(response.data);
            })
            .catch((error) => {});
        }
      });
    };
    performAddToPlanner(
      course,
      year,
      semester,
      selectedPlanner,
      user,
      '',
      beforeRequest,
      afterResponse,
    );
  };

  addArbitraryCourseToPlanner = (course, year, semester) => {
    const { user, selectedPlanner, addItemToPlannerDispatch, setItemFocusDispatch } = this.props;

    const beforeRequest = () => {};
    const afterResponse = (item) => {
      const newProps = this.props;
      if (!newProps.selectedPlanner || newProps.selectedPlanner.id !== selectedPlanner.id) {
        return;
      }
      addItemToPlannerDispatch(item);
      setItemFocusDispatch(item, course, ItemFocusFrom.TABLE_ARBITRARY, true);
    };
    performAddArbitraryToPlanner(
      course,
      year,
      semester,
      selectedPlanner,
      user,
      '',
      beforeRequest,
      afterResponse,
    );
  };

  deleteItemFromPlanner = (item) => {
    const { selectedPlanner, user, removeItemFromPlannerDispatch, clearItemFocusDispatch } =
      this.props;

    if (!selectedPlanner) {
      return;
    }

    if (!user) {
      removeItemFromPlannerDispatch(item);
      clearItemFocusDispatch();
    } else {
      axios
        .post(
          `/api/users/${user.id}/planners/${selectedPlanner.id}/remove-item`,
          {
            item: item.id,
            item_type: item.item_type,
          },
          {
            metadata: {
              gaCategory: 'Planner',
              gaVariable: 'POST Update / Instance',
            },
          },
        )
        .then((response) => {
          const newProps = this.props;
          if (!newProps.selectedPlanner || newProps.selectedPlanner.id !== selectedPlanner.id) {
            return;
          }
          removeItemFromPlannerDispatch(item);
          clearItemFocusDispatch();
        })
        .catch((error) => {});
    }
  };

  cancelAddCourseToPlanner = () => {
    const { clearItemFocusDispatch } = this.props;

    clearItemFocusDispatch();
  };

  render() {
    const {
      t,
      selectedPlanner,
      itemFocus,
      cellWidth,
      cellHeight,
      semesters,
      // isLectureListOpenOnMobile,
    } = this.props;

    const isLectureListOpenOnMobile = false;

    const currentYear = new Date().getFullYear();
    const plannerStartYear = selectedPlanner ? selectedPlanner.start_year : currentYear;
    const plannerEndYear = selectedPlanner ? selectedPlanner.end_year : currentYear + 3;
    const plannerYears = range(plannerStartYear, plannerEndYear + 1);

    const tableSize = Math.max(
      ...plannerYears
        .map((y) =>
          [1, 3].map((s) => {
            const regularItems = this._getItemsForSemester(selectedPlanner, y, s);
            const seasonalItems = this._getItemsForSemester(selectedPlanner, y, s + 1);
            const requiredSize =
              sumBy(regularItems, (i) => this._getTileSizeOfItem(i)) +
              sumBy(seasonalItems, (i) => this._getTileSizeOfItem(i));
            return Math.floor(requiredSize / 3) * 3;
          }),
        )
        .flat(),
      PLANNER_DEFAULT_CREDIT,
    );
    const hasSummerSemester = plannerYears
      .map((y) => this._getItemsForSemester(selectedPlanner, y, 2).length)
      .some((l) => l > 0);
    const hasWinterSemester = plannerYears
      .map((y) => this._getItemsForSemester(selectedPlanner, y, 4).length)
      .some((l) => l > 0);

    const getTitleForSemester = (year, semester) => {
      const items = this._getItemsForSemester(selectedPlanner, year, semester);
      const credit = sumBy(items, (i) => getCreditOfItem(i));
      const au = sumBy(items, (i) => getAuOfItem(i));

      if (semester % 2 === 0 && credit === 0 && au === 0) {
        return null;
      }

      return (
        <>
          <span>{`${year} ${getSemesterName(semester)}`}</span>
          <span>
            {au === 0
              ? `${t('ui.others.creditCount', { count: credit })}`
              : `${t('ui.others.creditCount', { count: credit })} ${t('ui.others.auCount', {
                  count: au,
                })}`}
          </span>
        </>
      );
    };

    const plannerCreditunits = range(0, tableSize / 3);
    const getHeadColumn = () => {
      const springArea = [
        hasSummerSemester && (
          <div
            className={classNames('subsection--planner__table__label__toptitle')}
            key="title:summer"
          />
        ),
        <div
          className={classNames('subsection--planner__table__label__toptitle')}
          key="title:spring"
        />,
        <div
          className={classNames('subsection--planner__table__label__line')}
          key={`line:${tableSize}`}>
          <strong>{tableSize}</strong>
        </div>,
        ...plannerCreditunits
          .slice()
          .reverse()
          .map((c) => {
            const CreditTag = (3 * c) % 12 === 0 && c !== 0 ? 'strong' : 'span';
            return [
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 3}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c}`}>
                <CreditTag>{3 * c}</CreditTag>
              </div>,
            ];
          })
          .flat(1),
      ];
      const fallArea = [
        ...plannerCreditunits
          .map((c) => {
            const CreditTag = (3 * c) % 12 === 0 && c !== 0 ? 'strong' : 'span';
            return [
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c}`}>
                <CreditTag>{3 * c}</CreditTag>
              </div>,
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__line')}
                key={`line:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__label__cell')}
                key={`cell:${3 * c + 3}`}
              />,
            ];
          })
          .flat(1),
        <div
          className={classNames('subsection--planner__table__label__line')}
          key={`line:${tableSize}`}>
          <strong>{tableSize}</strong>
        </div>,
        <div
          className={classNames('subsection--planner__table__label__bottomtitle')}
          key="title:fall"
        />,
        hasWinterSemester && (
          <div
            className={classNames('subsection--planner__table__label__bottomtitle')}
            key="title:winter"
          />
        ),
      ];
      return (
        <div className={classNames('subsection--planner__table__label')}>
          {springArea}
          <div className={classNames('subsection--planner__table__label__cell')} />
          <div className={classNames('subsection--planner__table__label__year')} />
          <div className={classNames('subsection--planner__table__label__cell')} />
          {fallArea}
        </div>
      );
    };
    const getYearColumn = (year) => {
      const springArea = [
        hasSummerSemester && (
          <div
            className={classNames('subsection--planner__table__body__toptitle')}
            key="title:summer">
            {getTitleForSemester(year, 2)}
          </div>
        ),
        <div
          className={classNames('subsection--planner__table__body__toptitle')}
          key="title:spring">
          {getTitleForSemester(year, 1)}
        </div>,
        <div
          className={classNames(
            'subsection--planner__table__body__line',
            'subsection--planner__table__body__line--bold',
          )}
          key={`line:${tableSize}`}
        />,
        ...plannerCreditunits
          .slice()
          .reverse()
          .map((c) => {
            return [
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 3}`}
              />,
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  'subsection--planner__table__body__line--dashed',
                  isLectureListOpenOnMobile
                    ? 'subsection--planner__table__body__line--mobile-noline'
                    : null,
                )}
                key={`line:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 2}`}
              />,
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  'subsection--planner__table__body__line--dashed',
                  isLectureListOpenOnMobile
                    ? 'subsection--planner__table__body__line--mobile-noline'
                    : null,
                )}
                key={`line:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 1}`}
              />,
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  (3 * c) % 12 === 0 && c !== 0
                    ? 'subsection--planner__table__body__line--bold'
                    : null,
                )}
                key={`line:${3 * c}`}
              />,
            ];
          })
          .flat(1),
      ];
      const fallArea = [
        ...plannerCreditunits
          .map((c) => {
            return [
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  (3 * c) % 12 === 0 && c !== 0
                    ? 'subsection--planner__table__body__line--bold'
                    : null,
                )}
                key={`line:${3 * c}`}
              />,
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 1}`}
              />,
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  'subsection--planner__table__body__line--dashed',
                  isLectureListOpenOnMobile
                    ? 'subsection--planner__table__body__line--mobile-noline'
                    : null,
                )}
                key={`line:${3 * c + 1}`}
              />,
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 2}`}
              />,
              <div
                className={classNames(
                  'subsection--planner__table__body__line',
                  'subsection--planner__table__body__line--dashed',
                  isLectureListOpenOnMobile
                    ? 'subsection--planner__table__body__line--mobile-noline'
                    : null,
                )}
                key={`line:${3 * c + 2}`}
              />,
              <div
                className={classNames('subsection--planner__table__body__cell')}
                key={`cell:${3 * c + 3}`}
              />,
            ];
          })
          .flat(1),
        <div
          className={classNames(
            'subsection--planner__table__body__line',
            'subsection--planner__table__body__line--bold',
          )}
          key={`line:${tableSize}`}
        />,
        <div
          className={classNames('subsection--planner__table__body__bottomtitle')}
          key="title:fall">
          {getTitleForSemester(year, 3)}
        </div>,
        hasWinterSemester && (
          <div
            className={classNames('subsection--planner__table__body__bottomtitle')}
            key="title:winter">
            {getTitleForSemester(year, 4)}
          </div>
        ),
      ];
      return (
        <div className={classNames('subsection--planner__table__body')} key={year}>
          {springArea}
          <div className={classNames('subsection--planner__table__body__cell')} />
          <div className={classNames('subsection--planner__table__body__year')}>
            <strong>{year}</strong>
          </div>
          <div className={classNames('subsection--planner__table__body__cell')} />
          {fallArea}
        </div>
      );
    };

    const getTiles = (year, semester, shouldIncludeSeasonal) => {
      const items = [
        ...this._getItemsForSemester(selectedPlanner, year, semester),
        ...(shouldIncludeSeasonal
          ? this._getItemsForSemester(selectedPlanner, year, semester + 1)
          : []),
      ];
      const sizes = items.map((i) => this._getTileSizeOfItem(i));
      return items.map((i, index) => (
        <PlannerTile
          item={i}
          yearIndex={year - plannerStartYear}
          semesterIndex={semester <= 2 ? 0 : 1}
          beginIndex={sum(sizes.slice(0, index))}
          endIndex={sum(sizes.slice(0, index)) + sizes[index]}
          color={getColorOfItem(selectedPlanner, i)}
          tableSize={tableSize}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          isPlannerWithSummer={hasSummerSemester}
          isPlannerWithWinter={hasWinterSemester}
          isDuplicate={
            i.item_type !== 'ARBITRARY' &&
            !i.is_excluded &&
            [...selectedPlanner.taken_items, ...selectedPlanner.future_items].filter(
              (i2) => getCourseOfItem(i2).id === getCourseOfItem(i).id && !i2.is_excluded,
            ).length > 1
          }
          isRaised={isTableClickedItem(i, itemFocus)}
          isHighlighted={isFocusedItem(i, itemFocus, selectedPlanner)}
          isDimmed={isDimmedItem(i, itemFocus)}
          isSimple={false} // TODO: Implement this
          onMouseOver={this.focusItemWithHover}
          onMouseOut={this.unfocusItemWithHover}
          onClick={this.focusItemWithClick}
          deleteLecture={this.deleteItemFromPlanner}
          key={`Tile:${year}-${semester}-${i.item_type}-${i.id}`}
        />
      ));
    };

    const getOverlay = (year, semester) => {
      const semesterData = semesters.find((s) => s.year === year && s.semester === semester);
      // TODO: Add seasonal semester data and utilize them in addition of regular ones
      return (
        <PlannerOverlay
          yearIndex={year - plannerStartYear}
          semesterIndex={semester <= 2 ? 0 : 1}
          tableSize={tableSize}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          isPlannerWithSummer={hasSummerSemester}
          isPlannerWithWinter={hasWinterSemester}
          options={[
            {
              label: `+ ${t('ui.button.addToSemester', { semester: getSemesterName(semester) })}`,
              onClick: !itemFocus.course.isArbitrary
                ? () => this.addCourseToPlanner(itemFocus.course, year, semester)
                : () => this.addArbitraryCourseToPlanner(itemFocus.course, year, semester),
              isDisabled:
                semesterData &&
                semesterData.courseAddDropPeriodEnd &&
                new Date(semesterData.courseAddDropPeriodEnd) < Date.now(),
            },
            {
              label: `+ ${t('ui.button.addToSemester', {
                semester: getSemesterName(semester + 1),
              })}`,
              onClick: !itemFocus.course.isArbitrary
                ? () => this.addCourseToPlanner(itemFocus.course, year, semester + 1)
                : () => this.addArbitraryCourseToPlanner(itemFocus.course, year, semester + 1),
              isSmall: true,
              isDisabled:
                semesterData &&
                Date.now() - new Date(semesterData.end) >
                  1000 * 60 * 60 * 24 * (semester < 3 ? 12 : 5),
            },
          ]}
          key={`overlay:${year}:${semester}`}
        />
      );
    };

    return (
      <div className={classNames('subsection', 'subsection--planner')}>
        <div className={classNames('subsection--planner__table')}>
          {getHeadColumn()}
          {plannerYears.map((y) => getYearColumn(y))}
          {plannerYears.map((y) => [1, 3].map((s) => getTiles(y, s, true)))}
          {itemFocus.from === ItemFocusFrom.ADDING &&
            plannerYears.map((y) => [1, 3].map((s) => getOverlay(y, s)))}
          {itemFocus.from === ItemFocusFrom.ADDING && (
            <PlannerOverlay
              yearIndex={-1}
              semesterIndex={-1}
              tableSize={tableSize}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              isPlannerWithSummer={hasSummerSemester}
              isPlannerWithWinter={hasWinterSemester}
              options={[
                {
                  label: t('ui.button.cancel'),
                  onClick: () => this.cancelAddCourseToPlanner(),
                  isSmall: true,
                  isDisabled: false,
                },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.common.user.user,
  selectedPlanner: state.planner.planner.selectedPlanner,
  itemFocus: state.planner.itemFocus,
  cellWidth: state.planner.planner.cellWidth,
  cellHeight: state.planner.planner.cellHeight,
  isDragging: state.planner.planner.isDragging,
  semesters: state.common.semester.semesters,
  // isLectureListOpenOnMobile: state.planner.list.isLectureListOpenOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  updateCellSizeDispatch: (width, height) => {
    dispatch(updateCellSize(width, height));
  },
  addItemToPlannerDispatch: (item) => {
    dispatch(addItemToPlanner(item));
  },
  setItemFocusDispatch: (item, course, from, clicked) => {
    dispatch(setItemFocus(item, course, from, clicked));
  },
  updateItemInPlannerDispatch: (item) => {
    dispatch(updateItemInPlanner(item));
  },
  clearItemFocusDispatch: () => {
    dispatch(clearItemFocus());
  },
  removeItemFromPlannerDispatch: (item) => {
    dispatch(removeItemFromPlanner(item));
  },
});

PlannerSubSection.propTypes = {
  user: userShape,
  selectedPlanner: plannerShape,
  itemFocus: itemFocusShape.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  semesters: PropTypes.arrayOf(semesterShape),
  // isLectureListOpenOnMobile: PropTypes.bool.isRequired,

  updateCellSizeDispatch: PropTypes.func.isRequired,
  addItemToPlannerDispatch: PropTypes.func.isRequired,
  setItemFocusDispatch: PropTypes.func.isRequired,
  updateItemInPlannerDispatch: PropTypes.func.isRequired,
  clearItemFocusDispatch: PropTypes.func.isRequired,
  removeItemFromPlannerDispatch: PropTypes.func.isRequired,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(PlannerSubSection));
