import moment from "moment";

export const eventMapper = (eventsBunch) => {
  const HOURS = 24;
  const rowHours = new Map([...Array(HOURS)].map((_,i) => ([i,new Map()])));
  eventsBunch
    .sort((a,b) => b.duration - a.duration)
    .forEach(e => {
      const date = +moment.unix(+e.date).format('H')
      const rowHourItem = rowHours.get(date);
      rowHourItem.set(e.id, e);
    });

  // console.log("rowHours",rowHours);

  let i = 0;
  let rowNumber = 0;
  let columnNumber = 0;
  const columnsEventsGroups = new Map();
  columnsEventsGroups.set(columnNumber, new Map());
  let emptyRowsCount = 0;
  while (true) {

    if (rowHours.size === emptyRowsCount) {
      columnsEventsGroups.delete(columnNumber);
      break;
    }

    if(rowNumber > rowHours.size - 1) {
      rowNumber = 0;
      columnNumber++;
      columnsEventsGroups.set(columnNumber, new Map());
      emptyRowsCount = 0;
    }

    const rowAsHourData = rowHours.get(rowNumber);

    if(rowAsHourData.size === 0) {
      rowNumber++;
      emptyRowsCount++;
      continue;
    }

    const iterator = rowAsHourData.keys();
    const key = iterator.next().value;
    const firstEventInRowAsHourData = rowAsHourData.get(key);

    rowAsHourData.delete(key);
    (columnsEventsGroups.get(columnNumber)).set(key, firstEventInRowAsHourData);
    rowNumber = rowNumber + firstEventInRowAsHourData.duration;
  }

  console.log("columnsEventsGroups", columnsEventsGroups);

  return columnsEventsGroups;
}
