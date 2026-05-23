import { notFound } from 'next/navigation';
import ProductDetail from '../../components/ProductDetail';
import { getProductBySlug, PRODUCTS, PLANTS } from '../../data/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...PRODUCTS, ...PLANTS].map(p => ({ slug: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail slug={slug}/>;
}
