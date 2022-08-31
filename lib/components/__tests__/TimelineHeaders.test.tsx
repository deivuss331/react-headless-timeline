import type { CSSProperties } from 'react';
import React from 'react';
import { render } from '@testing-library/react';
import { set } from 'date-fns';
import { ContextProvider } from 'lib/testUtils';
import TimelineHeaders from '../TimelineHeaders';

const STYLES_CONSUMER_TEST_ID = 'styles-consumer';
const CELLS_CONSUMER_TEST_ID = 'cells-consumer';

const CURRENT_DATE = new Date();
const TODAY_START = set(CURRENT_DATE, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const TODAY_END = set(CURRENT_DATE, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59

const EXAMPLE_EVENT = {
  startDate: set(CURRENT_DATE, { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(CURRENT_DATE, { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

describe('TimelineHeaders', () => {
  it('Returns correct CSS props for horizontal timeline', () => {
    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="horizontal">
        <TimelineHeaders
          render={({ getHeaderStyles }) => (
            <StylesConsumer styles={getHeaderStyles(EXAMPLE_EVENT.startDate)} />
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
        <TimelineHeaders
          render={({ getHeaderStyles }) => (
            <StylesConsumer styles={getHeaderStyles(EXAMPLE_EVENT.startDate)} />
          )}
        />
      </ContextProvider>,
    );

    const stylesConsumerEl = getByTestId(STYLES_CONSUMER_TEST_ID);
    const { top } = stylesConsumerEl.style;

    expect(Boolean(top)).toBeTruthy();
  });

  it('Returns correct amount of headers', () => {
    const CELLS_QTY = 10;

    const { getByTestId } = render(
      <ContextProvider startDate={TODAY_START} endDate={TODAY_END} direction="vertical">
        <TimelineHeaders cells={CELLS_QTY} render={({ headers }) => <CellsConsumer headers={headers} />} />
      </ContextProvider>,
    );

    const cellsConsumerEl = getByTestId(CELLS_CONSUMER_TEST_ID);
    const { cellsQty } = cellsConsumerEl.dataset;

    expect(Number(cellsQty)).toEqual(CELLS_QTY);
  });
});

function StylesConsumer({ styles }: { styles: CSSProperties }) {
  return <span style={styles} data-testid={STYLES_CONSUMER_TEST_ID} />;
}

function CellsConsumer({ headers }: { headers: Date[] }) {
  return <span data-cells-qty={headers.length} data-testid={CELLS_CONSUMER_TEST_ID} />;
}
