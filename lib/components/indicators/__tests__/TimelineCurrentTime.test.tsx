import type { CSSProperties } from 'react';
import React from 'react';
import { render } from '@testing-library/react';
import { set } from 'date-fns';
import { ContextProvider } from 'lib/testUtils';
import TimelineCurrentTime from '../TimelineCurrentTime';

const STYLES_CONSUMER_TEST_ID = 'styles-consumer';

const CURRENT_DATE = new Date();
const TODAY_START = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

describe('TimelineCurrentTime', () => {
  it('Returns correct CSS props for horizontal timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="horizontal">
        <TimelineCurrentTime render={({ styles }) => <StylesConsumer styles={styles} />} />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { left } = stylesConsumerEl.style;

    expect(Boolean(left)).toBeTruthy();
  });

  it('Returns correct CSS props for vertical timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="vertical">
        <TimelineCurrentTime render={({ styles }) => <StylesConsumer styles={styles} />} />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { top } = stylesConsumerEl.style;

    expect(Boolean(top)).toBeTruthy();
  });
});

function StylesConsumer({ styles }: { styles: CSSProperties }) {
  return <span style={styles} data-testid={STYLES_CONSUMER_TEST_ID} />;
}
