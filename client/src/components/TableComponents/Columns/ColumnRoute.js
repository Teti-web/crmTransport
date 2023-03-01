import { format } from 'date-fns'

export const COLUMNS = [
    {
      Header: 'Name Route',
      accessor: 'name',
      sticky: 'left'
    },
    {
      Header: 'Start',
      accessor: 'start'
    },
    {
      Header: 'Start date',
      accessor: 'start_date',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy')
      }
    },
    {
      Header: 'Finish',
      accessor: 'finish'
    },
    {
      Header: 'Finish date',
      accessor: 'finish_date',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy')
      }
    },
    {
      Header: 'Price ($)',
      accessor: 'price'
    },
    {
        Header: 'Driver',
        accessor: 'driver'
    },
    {
        Header: 'Car',
        accessor: 'car'
    },
    {
        Header: 'Client',
        accessor: 'client'
    }

  ]
  