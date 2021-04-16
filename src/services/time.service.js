import { formatRelative, subDays } from 'date-fns'

const parseTime = (timestamp) => {
  return formatRelative(subDays(new Date(timestamp), 0), new Date())
}

export {
  parseTime
}