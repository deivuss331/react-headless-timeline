import type { CSSProperties } from 'react';
import React from 'react';
import { render } from '@testing-library/react';
import { set } from 'date-fns';
import { ContextProvider } from 'lib/testUtils';
import TimelineEvents from '../TimelineEvents';

const STYLES_CONSUMER_TEST_ID = 'styles-consumer';

const CURRENT_DATE = new Date();
const TODAY_START = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

const EXAMPLE_EVENT = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

describe('TimelineEvents', () => {
  it('Returns correct CSS props for horizontal timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="horizontal">
        <TimelineEvents
          render={({ getEventStyles }) => <StylesConsumer styles={getEventStyles(EXAMPLE_EVENT)} />}
        />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { width, left } = stylesConsumerEl.style;

    expect(Boolean(width)).toBeTruthy();
    expect(Boolean(left)).toBeTruthy();
  });

  it('Returns correct CSS props for vertical timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="vertical">
        <TimelineEvents
          render={({ getEventStyles }) => <StylesConsumer styles={getEventStyles(EXAMPLE_EVENT)} />}
        />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { height, top } = stylesConsumerEl.style;

    expect(Boolean(height)).toBeTruthy();
    expect(Boolean(top)).toBeTruthy();
  });
});

function StylesConsumer({ styles }: { styles: CSSProperties }) {
  return <span style={styles} data-testid={STYLES_CONSUMER_TEST_ID} />;
}
