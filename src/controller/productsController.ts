import { Request, Response } from 'express';
import { getAllProducts, getProduct } from '../services/productsServices';


export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json(products)
  } catch (error) {
    console.error('Get products data error', error);
  
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Ошибка получения товаров',
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const id = Number(productId);

        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Некорректный идентификатор товара' });
            return;
        }
    
        const product = await getProduct(id);

        if (!product) {
            return res.status(404).json({
              message: 'Товар не найден',
            });
          }

        res.status(200).json(product);

    } catch( error ) {
        console.error('Get product data error', error);
  
        return res.status(500).json({
        message:
            error instanceof Error
            ? error.message
            : 'Ошибка получения товара',
        });
    }
};