import { createSelector } from 'reselect';

export const selectGlobal = (state: any) => state.get('global');

export const selectLang = createSelector(
  selectGlobal,
  (subState) => subState.get('lang'),
);
