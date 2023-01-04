/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
import * as React from 'react';
import type { Survey } from '../data';
declare type Props = {
    survey: Survey;
    pageIndex: number;
    onPrevPage: () => void;
    onNextPage: () => void;
};
declare const _default: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export default _default;
