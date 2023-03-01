import { format } from 'date-fns'

export const COLUMNS = [
    {
      Header: 'Full Name',
      accessor: 'name',
      sticky: 'left'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Date of Birth',
      accessor: 'date_of_birth',
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/MM/yyyy')
      }
    },
    {
      Header: 'Phone',
      accessor: 'tel'
    },
    {
        Header: 'Category',
        accessor: 'category'
      },

  ]
  