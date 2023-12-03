import { PDFName, PDFString, PDFDict, PDFArray } from 'pdf-lib';

const ensureDefaultAppearance = async (pdfDoc, fieldName) => {
  const acroForm = pdfDoc.context.lookup(pdfDoc.catalog.get(PDFName.of('AcroForm')));
  if (!acroForm) {
    throw new Error('The PDF does not contain an AcroForm entry');
  }

  let fields = acroForm.get(PDFName.of('Fields'));
  if (!(fields instanceof PDFArray)) {
    throw new Error('Fields are not in an array format');
  }
  fields = fields.array.map(f => pdfDoc.context.lookup(f));

  const field = fields.find(f => {
    const title = f.get(PDFName.of('T'));
    return title && title.asString() === fieldName;
  });

  if (field instanceof PDFDict) {
    let daEntry = field.get(PDFName.of('DA'));
    if (!daEntry) {
      daEntry = PDFString.of('/Helv 12 Tf 0 g');
      field.set(PDFName.of('DA'), daEntry);

      let drEntry = acroForm.get(PDFName.of('DR'));
      if (!drEntry) {
        drEntry = pdfDoc.context.obj({});
        acroForm.set(PDFName.of('DR'), drEntry);
      }

      let fontDict = drEntry.get(PDFName.of('Font'));
      if (!fontDict) {
        fontDict = pdfDoc.context.obj({});
        drEntry.set(PDFName.of('Font'), fontDict);
      }

      if (!fontDict.has(PDFName.of('Helv'))) {
        const helveticaFont = await pdfDoc.embedFont('Helvetica');
        fontDict.set(PDFName.of('Helv'), helveticaFont.ref);
      }
    }
  }
};

export default ensureDefaultAppearance;