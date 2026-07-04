import CategoriesClient from "./categories-client";
import { getCategories } from "@/app/actions/category-actions";

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <CategoriesClient initialCategories={categories} />
  );
}

