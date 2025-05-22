import jsPDF from "jspdf";
import { autoTable } from 'jspdf-autotable';

export const exportToPdf = (data, title, column) => {
    const doc = new jsPDF()

    doc.text(title, 14, 10)
    const tableColumn = column
    const tableRow = []

    data.forEach(item => {
        const valuesOnly = Object.values(item);
        tableRow.push(valuesOnly);
    })

    autoTable(doc,{
        head: [tableColumn],
        body: tableRow,
        startY: 20
    })

    doc.save(`${title}.pdf`)
}