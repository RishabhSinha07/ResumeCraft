/**
 * PDF Export - Production-ready implementation
 * Uses browser's native print dialog for perfect 1:1 rendering
 * No scaling, no canvas conversion, no devicePixelRatio issues
 */

export async function exportToPDF() {
  const previewElement = document.querySelector('[data-resume-preview]') as HTMLElement

  if (!previewElement) {
    alert('Resume preview not found. Please try again.')
    return
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  
  if (!printWindow) {
    alert('Please allow popups to export your resume.')
    return
  }

  // Clone the resume element with all styles
  const clonedElement = previewElement.cloneNode(true) as HTMLElement
  
  // Inline critical styles for print reliability
  clonedElement.style.width = '210mm'
  clonedElement.style.minHeight = '297mm'
  clonedElement.style.padding = '15mm'
  clonedElement.style.margin = '0'
  clonedElement.style.transform = 'none'
  clonedElement.style.zoom = '1'
  clonedElement.style.background = 'white'
  clonedElement.style.fontFamily = "'Inter', 'Arial', 'Helvetica Neue', sans-serif"
  
  // Write the print document with A4-specific styles
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume</title>
        <meta charset="UTF-8">
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Arial', 'Helvetica Neue', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000000;
          }
          
          .resume-a4-container {
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            padding: 15mm !important;
            margin: 0 !important;
            transform: none !important;
            zoom: 1 !important;
            scale: 1 !important;
            background: white !important;
            font-family: 'Inter', 'Arial', 'Helvetica Neue', sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.5 !important;
            color: #000000 !important;
          }
          
          .resume-header h1 {
            font-size: 24pt !important;
            line-height: 1.2 !important;
            margin-bottom: 6pt !important;
            font-weight: 600 !important;
            color: #000000 !important;
          }
          
          .resume-contact {
            font-size: 9pt !important;
            line-height: 1.4 !important;
            color: #000000 !important;
          }
          
          .section-heading {
            font-size: 12pt !important;
            line-height: 1.3 !important;
            font-weight: 600 !important;
            margin-bottom: 8pt !important;
            padding-bottom: 3pt !important;
            color: #000000 !important;
            border-bottom: 1pt solid #000000 !important;
            page-break-after: avoid !important;
          }
          
          .resume-section {
            margin-bottom: 12pt !important;
            page-break-inside: avoid !important;
          }
          
          .resume-section h3 {
            font-size: 11pt !important;
            line-height: 1.4 !important;
            font-weight: 600 !important;
            margin-bottom: 3pt !important;
            color: #000000 !important;
            page-break-after: avoid !important;
          }
          
          .resume-section p,
          .resume-section li {
            font-size: 10pt !important;
            line-height: 1.5 !important;
            color: #000000 !important;
            margin-bottom: 2pt !important;
          }
          
          .resume-section ul {
            margin-left: 8mm !important;
            padding-left: 0 !important;
          }
          
          .resume-section > div {
            page-break-inside: avoid !important;
            margin-bottom: 8pt !important;
          }
        </style>
      </head>
      <body>
        ${clonedElement.outerHTML}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
          window.onafterprint = function() {
            window.close();
          };
        </script>
      </body>
    </html>
  `)
  
  printWindow.document.close()
}
