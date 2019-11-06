import { createSelector } from 'reselect';

function autoInitSelectors<T>(namespace: string, fields: Array<keyof T>) {
  try {
    const selectorsObj: { [key: string]: (state: any) => any } = {};

    selectorsObj[namespace] = (state: any) => state.get(namespace);

    fields.forEach((field) => {
      selectorsObj[field as string] = (state: any) => selectorsObj[namespace](state).get(field);
      // tslint:disable-next-line: max-line-length
      const selectField = `select${(field as string).substring(0, 1).toLocaleUpperCase()}${(field as string).substring(1)}`;
      if (selectorsObj[field as string]) {
        selectorsObj[selectField] = createSelector(
          selectorsObj[field as string],
          (subState: any): any => (subState && subState.toJS) ? subState.toJS() : subState,
        );
      }
    });

    return selectorsObj;
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log('Select Error:', error);
    return {};
  }
}

export default autoInitSelectors;
