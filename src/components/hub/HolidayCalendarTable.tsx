import type { HolidayEntry } from '@/lib/content/types'

type HolidayCalendarTableProps = {
  entries: HolidayEntry[]
}

export function HolidayCalendarTable({ entries }: HolidayCalendarTableProps) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-b16 text-primary-blue/85">No calendar entries available.</p>
    )
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full border-collapse text-b14">
        <thead>
          <tr className="border-b border-dark-gray/15 bg-whitebg text-left">
            <th className="px-5 py-3 font-bold uppercase tracking-kicker text-dark-gray">Date</th>
            <th className="px-5 py-3 font-bold uppercase tracking-kicker text-dark-gray">Observance</th>
            <th className="px-5 py-3 font-bold uppercase tracking-kicker text-dark-gray">Type</th>
            <th className="px-5 py-3 font-bold uppercase tracking-kicker text-dark-gray">Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.date}-${entry.title}`} className="border-b border-dark-gray/15 last:border-b-0">
              <td className="px-5 py-4 font-semibold text-primary-blue">{entry.date}</td>
              <td className="px-5 py-4 font-semibold text-primary-blue">{entry.title}</td>
              <td className="px-5 py-4">
                <span className="chip">{entry.type}</span>
              </td>
              <td className="px-5 py-4 text-primary-blue/85">{entry.description || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
