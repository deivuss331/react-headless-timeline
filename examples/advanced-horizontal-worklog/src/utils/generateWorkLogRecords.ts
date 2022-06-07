import faker from 'faker';
import { set, add } from 'date-fns';
import {
  MAX_EMPLOYEES,
  BREAK_EVENT_MAX_DURATION,
  WORK_EVENT_MAX_DURATION,
  MAX_TASKS_PER_DAY_PER_EMPLOYEE,
  WORK_START_TIME,
} from 'config/constants';
import type { Employee, WorkLogRecord, WorkLogEvent, WorkLogEventType } from '../types';

faker.seed(123);

const employees: Employee[] = new Array(faker.datatype.number(MAX_EMPLOYEES)).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

export default (activeDate: Date): WorkLogRecord[] =>
  employees.map((employee) => ({
    id: faker.datatype.uuid(),
    employee,
    events: generateEvents(activeDate),
  }));

function generateEvents(date: Date): WorkLogEvent[] {
  const workStartDate: Date = set(date, WORK_START_TIME);

  return new Array(faker.datatype.number(MAX_TASKS_PER_DAY_PER_EMPLOYEE))
    .fill(null)
    .reduce<WorkLogEvent[]>((events, _, index) => {
      const startDate: Date = index ? new Date(events[index - 1].endDate) : workStartDate;
      const type: WorkLogEventType = index % 2 ? 'break' : 'work';

      const isWorkEvent: boolean = type === 'work';
      const endDateMaxDuration = isWorkEvent ? WORK_EVENT_MAX_DURATION : BREAK_EVENT_MAX_DURATION;

      events.push({
        id: faker.datatype.uuid(),
        startDate,
        endDate: add(startDate, {
          hours: faker.datatype.number(endDateMaxDuration.hours),
          minutes: endDateMaxDuration.minutes,
        }),
        type,
      });

      return events;
    }, []);
}
