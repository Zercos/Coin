export default function dateFilter (value, format = 'date') {
  const options = {}
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = '2-digit'
    options.year = 'numeric'
  }
  if (format.includes('time')) {
    options.minute = '2-digit'
    options.hour = '2-digit'
    options.second = 'numeric'
  }
  return new Intl.DateTimeFormat('pl-PL', options).format(value)
}
