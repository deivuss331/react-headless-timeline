import React from 'react';
import { render } from '@testing-library/react';
import { set } from 'date-fns';
import { ContextProvider } from '../../../testUtils';
import TimelineTimeIndicator from '../TimelineTimeIndicator';

const STYLES_CONSUMER_TEST_ID: string = 'styles-consumer';
const CURRENT_DATE: Date = new Date();
const TODAY_START: Date = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END: Date = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59
const EXAMPLE_TIME_EVENT: Date = set(CURRENT_DATE, { hours: 21, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 21:00:00

describe('TimelineTimeIndicator', () => {
  it('Returns correct CSS props for horizontal timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="horizontal">
        <TimelineTimeIndicator
          render={({ getIndicatorStyles }) => (
            <StylesConsumer styles={getIndicatorStyles(EXAMPLE_TIME_EVENT)} />
          )}
        />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { left } = stylesConsumerEl.style;

    expect(Boolean(left)).toBeTruthy();
  });

  it('Returns correct CSS props for vertical timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="vertical">
        <TimelineTimeIndicator
          render={({ getIndicatorStyles }) => (
            <StylesConsumer styles={getIndicatorStyles(EXAMPLE_TIME_EVENT)} />
          )}
        />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { top } = stylesConsumerEl.style;

    expect(Boolean(top)).toBeTruthy();
  });
});

interface StylesConsumerProps {
  styles: React.CSSProperties;
}

function StylesConsumer({ styles }: StylesConsumerProps): JSX.Element {
  return <span style={styles} data-testid={STYLES_CONSUMER_TEST_ID} />;
}
