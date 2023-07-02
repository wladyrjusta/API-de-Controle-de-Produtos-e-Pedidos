import { Request, Response } from 'express';

import mapStatusHTTP from '../utils/mapStatusHTTP';
import productService from '../services/product.service';

async function create(req: Request, res: Response) {
  const newProduct = await productService.createProduct(req.body);

  if (newProduct.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(newProduct.status)).json(newProduct.data);
  }

  return res.status(201).json(newProduct.data);
}

async function listAll(req: Request, res: Response) {
  const serviceResponse = await productService.listAllProducts();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(200).json(serviceResponse.data);
}

export default {
  create,
  listAll,
};
