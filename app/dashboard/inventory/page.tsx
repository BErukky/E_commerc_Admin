import InventoryClient from "./inventory-client";
import { getProducts } from "@/app/actions/product-actions";

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  const products = await getProducts();

  return (
    <InventoryClient initialProducts={products} />
  );
}
