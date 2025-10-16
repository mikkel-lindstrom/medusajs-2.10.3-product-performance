import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { Button, Heading } from "@medusajs/ui";

// The widget
const ProductDetailsWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const triggerUpdateProductWorkflow = async () => {
    await fetch(`/admin/performance/product/${data.id}`, {
      method: "POST",
    });
  };

  return (
    <>
      <Heading>Performance Test Widget</Heading>
      <Button onClick={triggerUpdateProductWorkflow}>
        Trigger UpdateProductWorkflow
      </Button>
    </>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
});
export default ProductDetailsWidget;
