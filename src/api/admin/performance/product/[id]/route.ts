import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
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
  res.status(200).json({ product: productResult });
}
