// src/utils/csv.js
export function toCsv(rows, headers) {
    // headers: [{ key: 'id', label: 'Payment Ref' }, ...]
    const escape = (v) => {
        if (v === null || v === undefined) return '';
        const s = String(v);
        // escape quotes by doubling them and wrap in quotes if needed
        if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
        return s;
    };

    const headerLine = headers.map(h => escape(h.label)).join(',');
    const lines = rows.map(r =>
        headers.map(h => escape(typeof h.format === 'function' ? h.format(r[h.key], r) : r[h.key])).join(',')
    );

    return [headerLine, ...lines].join('\n');
}

export function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
