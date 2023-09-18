import express from 'express';
import { createDocument } from '../controllers/documents/createDocument.js';
import { getDocument } from '../controllers/documents/getDocument.js';

const DocumentRouter = express.Router();

DocumentRouter.post('/documents/create', createDocument);
DocumentRouter.get('/documents/:id', getDocument);


export default DocumentRouter; 