import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/sections/product-card";
import type { Product } from "@/lib/data/products";
import { STAGGER_STEP } from "@/lib/motion";

type ProductsGridProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  products: Product[];
};

export function ProductsGrid({
  eyebrow,
  heading,
  description,
  products,
}: ProductsGridProps) {
  return (
    <section
      aria-labelledby="produtos-titulo"
      className="border-b border-hairline bg-bg-subtle"
    >
      <Container className="py-20 md:py-24">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="produtos-titulo"
            className="font-display text-3xl font-medium text-ink md:text-4xl"
          >
            {heading}
          </h2>
          {description ? (
            <p className="text-ink-soft text-pretty">{description}</p>
          ) : null}
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <li key={product.slug} className="h-full">
              <Reveal delay={index * STAGGER_STEP} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
