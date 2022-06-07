export type WorkLogEventType = 'work' | 'break';

export interface Employee {
  id: string;
  fullName: string;
}

export interface WorkLogEvent {
  id: string;
  startDate: Date;
  endDate: Date;
  type: WorkLogEventType;
}

export interface WorkLogRecord {
  id: string;
  employee: Employee;
  events: WorkLogEvent[];
}
