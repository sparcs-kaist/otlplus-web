import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { range } from 'lodash';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import itemFocusShape from '../../../../shapes/state/planner/ItemFocusShape';
import plannerShape from '../../../../shapes/model/planner/PlannerShape';

import CreditBar from '../../../CreditBar';
import CourseStatus from '../../../CourseStatus';
import Scroller from '../../../Scroller';

import { ItemFocusFrom } from '@/shapes/enum';

import { getCreditOfItem, getAuOfItem, getCreditAndAuOfItem } from '../../../../utils/itemUtils';
import {
  getSeparateMajorTracks,
  getCategoryOfItem,
  getCategoryOfType,
  getColorOfCategory,
  isIdenticalCategory,
} from '../../../../utils/itemCategoryUtils';
import { CategoryFirstIndex } from '@/shapes/enum';

import { setCategoryFocus, clearCategoryFocus } from '../../../../redux/actions/planner/itemFocus';

class SummarySubSection extends Component {
  setFocusOnCategory = (category) => {
    const { itemFocus, selectedPlanner, setCategoryFocusDispatch } = this.props;

    if (itemFocus.from !== ItemFocusFrom.NONE || !selectedPlanner) {
      return;
    }
    setCategoryFocusDispatch(category);
  };

  clearFocus = () => {
    const { itemFocus, clearCategoryFocusDispatch } = this.props;

    if (itemFocus.from !== ItemFocusFrom.CATEGORY) {
      return;
    }

    clearCategoryFocusDispatch();
  };

  render() {
    const { t, itemFocus, selectedPlanner } = this.props;

    const separateMajorTracks = selectedPlanner ? getSeparateMajorTracks(selectedPlanner) : [];
    const advancedMajorTrack = selectedPlanner
      ? selectedPlanner.additional_tracks.find((at) => at.type === 'ADVANCED')
      : undefined;

    const initializeCount = () => ({
      taken: 0,
      planned: 0,
      focused: 0,
      requirement: 0,
    });

    const totalCredit = initializeCount();
    const totalAu = initializeCount();
    const categoryCreditAndAus = {
      [CategoryFirstIndex.BASIC]: [[initializeCount(), initializeCount()]],
      [CategoryFirstIndex.MAJOR]: separateMajorTracks.map((smt) => [
        initializeCount(),
        initializeCount(),
      ]),
      [CategoryFirstIndex.RESEARCH]: [[initializeCount(), initializeCount()]],
      [CategoryFirstIndex.GENERAL_AND_HUMANITY]: [[initializeCount(), initializeCount()]],
      [CategoryFirstIndex.OTHERS]: [[initializeCount()]],
    };

    const categoryBigTitles = {
      [CategoryFirstIndex.BASIC]: [t('ui.type.basic')],
      [CategoryFirstIndex.MAJOR]: separateMajorTracks.map((smt, index) => {
        if (index === 0) {
          const majorName = advancedMajorTrack ? t('ui.type.advancedMajor') : t('ui.type.major');
          return `${majorName} - ${smt.department[t('js.property.name')]}`;
        }
        if (smt.type === 'DOUBLE') {
          return `${t('ui.type.doubleMajor')} - ${smt.department[t('js.property.name')]}`;
        }
        if (smt.type === 'MINOR') {
          return `${t('ui.type.minor')} - ${smt.department[t('js.property.name')]}`;
        }
        if (smt.type === 'INTERDISCIPLINARY') {
          return `${t('ui.type.interdisciplinaryMajor')}`;
        }
        return 'Unknown';
      }),
      [CategoryFirstIndex.RESEARCH]: [`${t('ui.type.research')}`],
      [CategoryFirstIndex.GENERAL_AND_HUMANITY]: [t('ui.type.general')],
      [CategoryFirstIndex.OTHERS]: [t('ui.type.etc')],
    };
    const categoryTitles = {
      [CategoryFirstIndex.BASIC]: [[t('ui.type.basicRequired'), t('ui.type.basicElective')]],
      [CategoryFirstIndex.MAJOR]: separateMajorTracks.map((smt) => [
        t('ui.type.majorRequired'),
        t('ui.type.majorElective'),
      ]),
      [CategoryFirstIndex.RESEARCH]: [[t('ui.type.thesisStudy'), t('ui.type.individualStudy')]],
      [CategoryFirstIndex.GENERAL_AND_HUMANITY]: [
        [t('ui.type.generalRequired'), t('ui.type.humanities')],
      ],
      [CategoryFirstIndex.OTHERS]: [[t('ui.type.otherElective')]],
    };

    if (selectedPlanner?.general_track) {
      // TODO: support unsigned user
      const hasDoublemajor =
        selectedPlanner.additional_tracks.filter((at) => at.type === 'DOUBLE').length !== 0;
      totalCredit.requirement = selectedPlanner.general_track.total_credit;
      totalAu.requirement = selectedPlanner.general_track.total_au;
      categoryCreditAndAus[CategoryFirstIndex.BASIC][0][0].requirement =
        selectedPlanner.general_track.basic_required;
      categoryCreditAndAus[CategoryFirstIndex.BASIC][0][1].requirement = hasDoublemajor
        ? selectedPlanner.major_track.basic_elective_doublemajor
        : selectedPlanner.general_track.basic_elective;
      categoryCreditAndAus[CategoryFirstIndex.RESEARCH][0][0].requirement = hasDoublemajor
        ? selectedPlanner.general_track.thesis_study_doublemajor
        : selectedPlanner.general_track.thesis_study;
      categoryCreditAndAus[CategoryFirstIndex.GENERAL_AND_HUMANITY][0][0].requirement =
        selectedPlanner.general_track.general_required_credit +
        selectedPlanner.general_track.general_required_au;
      categoryCreditAndAus[CategoryFirstIndex.GENERAL_AND_HUMANITY][0][1].requirement =
        hasDoublemajor
          ? selectedPlanner.general_track.humanities_doublemajor
          : selectedPlanner.general_track.humanities;
    }

    separateMajorTracks.forEach((smt, index) => {
      categoryCreditAndAus[CategoryFirstIndex.MAJOR][index][0].requirement = smt.major_required;
      categoryCreditAndAus[CategoryFirstIndex.MAJOR][index][1].requirement = smt.major_elective;
    });
    if (advancedMajorTrack) {
      categoryCreditAndAus[CategoryFirstIndex.MAJOR][0][0].requirement +=
        advancedMajorTrack.major_required;
      categoryCreditAndAus[CategoryFirstIndex.MAJOR][0][1].requirement +=
        advancedMajorTrack.major_elective;
    }

    if (selectedPlanner) {
      selectedPlanner.taken_items
        .filter((i) => !i.is_excluded)
        .forEach((i) => {
          const category = getCategoryOfItem(selectedPlanner, i);
          totalCredit.taken += getCreditOfItem(i);
          totalAu.taken += getAuOfItem(i);
          categoryCreditAndAus[category[0]][category[1]][category[2]].taken +=
            getCreditAndAuOfItem(i);
        });
      selectedPlanner.future_items
        .filter((i) => !i.is_excluded)
        .forEach((i) => {
          const category = getCategoryOfItem(selectedPlanner, i);
          totalCredit.planned += getCreditOfItem(i);
          totalAu.planned += getAuOfItem(i);
          categoryCreditAndAus[category[0]][category[1]][category[2]].planned +=
            getCreditAndAuOfItem(i);
        });
      selectedPlanner.arbitrary_items
        .filter((i) => !i.is_excluded)
        .forEach((i) => {
          const category = getCategoryOfItem(selectedPlanner, i);
          totalCredit.planned += getCreditOfItem(i);
          totalAu.planned += getAuOfItem(i);
          categoryCreditAndAus[category[0]][category[1]][category[2]].planned +=
            getCreditAndAuOfItem(i);
        });
    }

    if (itemFocus.from === ItemFocusFrom.LIST || itemFocus.from === ItemFocusFrom.ADDING) {
      const focusedCourse = itemFocus.course;
      const category = getCategoryOfType(
        selectedPlanner,
        focusedCourse.type_en,
        focusedCourse.department?.code,
      );
      totalCredit.focused += focusedCourse.credit;
      totalAu.focused += focusedCourse.credit_au;
      categoryCreditAndAus[category[0]][category[1]][category[2]].focused +=
        focusedCourse.credit + focusedCourse.credit_au;
    } else if (
      (itemFocus.from === ItemFocusFrom.TABLE_TAKEN ||
        itemFocus.from === ItemFocusFrom.TABLE_FUTURE ||
        itemFocus.from === ItemFocusFrom.TABLE_ARBITRARY) &&
      !itemFocus.item.is_excluded
    ) {
      const focusedItem = itemFocus.item;
      const category = getCategoryOfItem(selectedPlanner, focusedItem);
      totalCredit.focused += getCreditOfItem(focusedItem);
      totalAu.focused += getAuOfItem(focusedItem);
      categoryCreditAndAus[category[0]][category[1]][category[2]].focused +=
        getCreditAndAuOfItem(focusedItem);
    }

    separateMajorTracks.forEach((smt, index) => {
      const targetCount = categoryCreditAndAus[CategoryFirstIndex.MAJOR][index];
      if (targetCount[0].taken > targetCount[0].requirement) {
        const takenDiff = targetCount[0].taken - targetCount[0].requirement;
        targetCount[0].taken -= takenDiff;
        targetCount[1].taken += takenDiff;
      }
      if (targetCount[0].taken + targetCount[0].planned > targetCount[0].requirement) {
        const plannedDiff =
          targetCount[0].taken + targetCount[0].planned - targetCount[0].requirement;
        targetCount[0].planned -= plannedDiff;
        targetCount[1].planned += plannedDiff;
      }
      if (targetCount[0].requirement === 0) {
        targetCount[1].focused += targetCount[0].focused;
        targetCount[0].focused = 0;
      }
    });

    return (
      <>
        <div className={classNames('subsection', 'subsection--planner-summary', 'mobile-hidden')}>
          <Scroller expandTop={12}>
            <CourseStatus
              entries={[
                {
                  name: t('ui.type.total'),
                  info: [
                    {
                      name: t('ui.type.totalCredit'),
                      controller: (
                        <CreditBar
                          takenCredit={totalCredit.taken}
                          plannedCredit={totalCredit.planned}
                          focusedCredit={totalCredit.focused}
                          totalCredit={totalCredit.requirement}
                          colorIndex={18}
                          isCategoryFocused={
                            itemFocus.from === ItemFocusFrom.CATEGORY &&
                            isIdenticalCategory(
                              [CategoryFirstIndex.TOTAL, 0, 0],
                              itemFocus.category,
                            )
                          }
                          focusFrom={itemFocus.from}
                        />
                      ),
                      onMouseOver: () => this.setFocusOnCategory([CategoryFirstIndex.TOTAL, 0, 0]),
                      onMouseOut: () => this.clearFocus(),
                    },
                    {
                      name: t('ui.type.totalAu'),
                      controller: (
                        <CreditBar
                          takenCredit={totalAu.taken}
                          plannedCredit={totalAu.planned}
                          focusedCredit={totalAu.focused}
                          totalCredit={totalAu.requirement}
                          colorIndex={18}
                          isCategoryFocused={
                            itemFocus.from === ItemFocusFrom.CATEGORY &&
                            isIdenticalCategory(
                              [CategoryFirstIndex.TOTAL, 0, 1],
                              itemFocus.category,
                            )
                          }
                          focusFrom={itemFocus.from}
                        />
                      ),
                      onMouseOver: () => this.setFocusOnCategory([CategoryFirstIndex.TOTAL, 0, 1]),
                      onMouseOut: () => this.clearFocus(),
                    },
                  ],
                },
                ...range(0, 5)
                  .map((i) =>
                    range(0, categoryCreditAndAus[i].length).map((j) => ({
                      name: categoryBigTitles[i][j],
                      info: range(0, categoryCreditAndAus[i][j].length).map((k) => ({
                        name: categoryTitles[i][j][k],
                        controller: (
                          <CreditBar
                            takenCredit={categoryCreditAndAus[i][j][k].taken}
                            plannedCredit={categoryCreditAndAus[i][j][k].planned}
                            focusedCredit={categoryCreditAndAus[i][j][k].focused}
                            totalCredit={categoryCreditAndAus[i][j][k].requirement}
                            colorIndex={getColorOfCategory(selectedPlanner, [i, j, k])}
                            isCategoryFocused={
                              itemFocus.from === ItemFocusFrom.CATEGORY &&
                              isIdenticalCategory([i, j, k], itemFocus.category)
                            }
                            focusFrom={itemFocus.from}
                          />
                        ),
                        onMouseOver: () => this.setFocusOnCategory([i, j, k]),
                        onMouseOut: () => this.clearFocus(),
                      })),
                    })),
                  )
                  .flat(),
              ]}
            />
          </Scroller>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPlanner: state.planner.planner.selectedPlanner,
  itemFocus: state.planner.itemFocus,
});

const mapDispatchToProps = (dispatch) => ({
  setCategoryFocusDispatch: (multipleTitle, multipleDetails) => {
    dispatch(setCategoryFocus(multipleTitle, multipleDetails));
  },
  clearCategoryFocusDispatch: () => {
    dispatch(clearCategoryFocus());
  },
});

SummarySubSection.propTypes = {
  selectedPlanner: plannerShape,
  itemFocus: itemFocusShape.isRequired,

  setCategoryFocusDispatch: PropTypes.func.isRequired,
  clearCategoryFocusDispatch: PropTypes.func.isRequired,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SummarySubSection));
