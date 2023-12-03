import express from 'express';
import { createDocument } from '../controllers/documents/createDocument.js';
import { getDocument,getTemplate } from '../controllers/documents/getDocument.js';
import { getDocumentFields } from '../controllers/documents/getDocumentFields.js';

const DocumentRouter = express.Router();

DocumentRouter.post('/documents/create', createDocument);
DocumentRouter.get('/documents/:id', getDocument);
DocumentRouter.post('/documents/template', getTemplate);
DocumentRouter.get('/document/fields/:document', getDocumentFields);


export default DocumentRouter; 