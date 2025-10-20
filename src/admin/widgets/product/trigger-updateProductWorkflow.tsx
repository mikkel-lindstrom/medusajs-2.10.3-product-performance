import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Button, Container, Heading } from "@medusajs/ui";

// The widget
const ProductDetailsWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const triggerUpdateProductWorkflow = async () => {
    await fetch(`/admin/performance/product/${data.id}`, {
      method: "POST",
    });
  };
  const queryProductWithVariantsId = async () => {
    await fetch(`/admin/performance/product/${data.id}`, {
      method: "GET",
    });
  };

  return (
    <>
      <Container className="flex  flex-col gap-2">
        <Heading>Performance Test Widget</Heading>
        <Button onClick={triggerUpdateProductWorkflow}>
          Trigger UpdateProductWorkflow
        </Button>

        <Button onClick={queryProductWithVariantsId}>
          Perform Query with variants.id
        </Button>
      </Container>
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
});
export default ProductDetailsWidget;
