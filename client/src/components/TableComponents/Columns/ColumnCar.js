import { format } from 'date-fns'

export const COLUMNS = [
    {
      Header: 'Car brand',
      accessor: 'car_brand',
      sticky: 'left'
    },
    {
      Header: 'Model',
      accessor: 'model'
    },
    {
      Header: 'Number registration',
      accessor: 'registration'
    },
    {
        Header: 'Number vin',
        accessor: 'vin'
    },
    {
        Header: 'Insurance',
        accessor: 'insurance'
    },
    {
        Header: 'End of insurance(date)',
        accessor: 'end_insurance'
    },
    {
        Header: 'Overview',
        accessor: 'overview'
    },
    {
        Header: 'End of overview(date)',
        accessor: 'end_overview'
    }

  ]
  