/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (
  filters: Record<string, any> = {},
): Promise<TProduct[]> => {
  let query: Record<string, any> = {};

  if(!query.productQuantity){
    query.productQuantity = {$gt: 0}
  }

  // Filter by Price:
  if (filters.minPrice || filters.maxPrice) {
    query.productPrice = {
      $gte: filters.minPrice || 0,
      $lte: filters.maxPrice || Infinity,
    };
  }

// Filter by Release Date:
if (filters.releaseDate) {
  const startDate = new Date(filters.releaseDate);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(filters.releaseDate);
  endDate.setUTCHours(23, 59, 59, 999);

  query.releaseDate = {
    $gte: startDate,
    $lt: endDate,
  };
}




  // Filter by Brand:
  if (filters.brand) {
    query.brand = new RegExp(filters.brand, 'i');
  }

  // Filter by Model:
  if (filters.model) {
    query.model = new RegExp(filters.model, 'i');
  }

  // Filter by Operating System:
  if (filters.operatingSystem) {
    query.operatingSystem = new RegExp(filters.operatingSystem, 'i'); 
  }

  // Filter by Storage Capacity:
  if (filters.storageCapacity) {
    query.storageCapacity = filters.storageCapacity;
  }

  // Filter by Screen Size:
  if (filters.screenSize) {
    query.screenSize = filters.screenSize;
  }

  // Additional Relevant Filter Parameters:
  const customFilters: Record<string, any> = {};

  Object.keys(filters).forEach((key) => {
    if (
      ![
        'minPrice',
        'maxPrice',
        'releaseDate',
        'brand',
        'model',
        'operatingSystem',
        'storageCapacity',
        'screenSize',
      ].includes(key)
    ) {
      customFilters[key] = filters[key];
    }
  });

  query = {
    ...query,
    ...customFilters,
  };
  const result = await Product.find(query);
  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });


  return result;
};

const deleteProductFromDB = async (ids: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: ids } });
  return result;
};


export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductFromDB,
  deleteProductFromDB
};
