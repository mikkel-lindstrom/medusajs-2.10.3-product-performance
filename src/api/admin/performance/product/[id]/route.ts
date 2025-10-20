import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const productResult = await updateProductsWorkflow(req.scope).run({
    input: {
      products: [
        {
          id: req.params.id,
        },
      ],
    },
  });
  res.status(200).json({ product: productResult.result[0] });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const {
    data: [Product],
  } = await query.graph({
    entity: "product",
    fields: ["id", "title", "variants.id", "images.*"],
    filters: { id: req.params.id },
  });

  res.status(200).json({ product: Product });
}
