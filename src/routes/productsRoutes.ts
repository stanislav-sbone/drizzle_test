import { Router } from 'express';
import { getProductById, getProducts } from '../controller/productsController';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProductById);

export default productsRouter;