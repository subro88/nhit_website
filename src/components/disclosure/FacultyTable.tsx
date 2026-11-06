'use client';

import { useMemo, useState } from 'react';
import { staff } from '@/data/mandatoryDisclosure';

/*
 * Staff-pattern table (AICTE disclosure item 15) with a lightweight department
 * filter — 58 rows are unwieldy to scan, so the reader can slice by department
 * while the full list still prints/renders for compliance.
 */

export default function FacultyTable() {
  const depts = useMemo(() => {
    const set = new Set(staff.map((r) => r.dept));
    return ['All Departments', ...Array.from(set)];
  }, []);

  const [dept, setDept] = useState('All Departments');

  const rows = dept === 'All Departments' ? staff : staff.filter((r) => r.dept === dept);

  return (
    <div>
      <div
        className="disc-chips"
        style={{ position: 'static', zIndex: 'auto', background: 'transparent', border: 0, padding: '0 0 12px', margin: 0, flexWrap: 'wrap' }}
      >
        {depts.map((d) => (
          <button
            key={d}
            type="button"
            className={`disc-chip${dept === d ? ' is-active' : ''}`}
            onClick={() => setDept(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="disc-scroll">
        <table className="disc-table disc-table--min">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Faculty Unique ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id}>
                <td className="ctr">{i + 1}</td>
                <td>{r.id}</td>
                <td className="row-strong">{r.name}</td>
                <td>{r.designation}</td>
                <td>{r.dept}</td>
                <td>{r.doj}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="disc-caption" style={{ marginTop: 8 }}>
        Showing {rows.length} of {staff.length} faculty members{dept !== 'All Departments' ? ` — ${dept}` : ''}.
      </p>
    </div>
  );
}
