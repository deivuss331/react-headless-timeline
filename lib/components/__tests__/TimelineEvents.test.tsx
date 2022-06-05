import React from 'react';
import { render } from '@testing-library/react';
import { set } from 'date-fns';
import { ContextProvider } from '../../testUtils';
import TimelineEvents from '../TimelineEvents';

const STYLES_CONSUMER_TEST_ID: string = 'styles-consumer';
const CURRENT_DATE: Date = new Date();
const TODAY_START: Date = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END: Date = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

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

interface StylesConsumerProps {
  styles: React.CSSProperties;
}

function StylesConsumer({ styles }: StylesConsumerProps): JSX.Element {
  return <span style={styles} data-testid={STYLES_CONSUMER_TEST_ID} />;
}
