import ProductsClient from "./products-client";
import { getProducts } from "@/app/actions/product-actions";
import { getCategories } from "@/app/actions/category-actions";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <ProductsClient initialProducts={products} categories={categories} />
  );
}
