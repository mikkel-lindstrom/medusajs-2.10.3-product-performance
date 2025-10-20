<h1 align="center">
  Medusa - Performance
</h1>

<h4>I tried to make a test on a previous version (2.8.3) and it seems its also an issue there, so dont take the version too much into account</h4>

## Setup

<div>
<p>setup a database with</p>

<p>npx medusa db:create --db [name]</p>
<p>npx medusa db:setup --db [name]</p>
<p>npx medusa user -e [email] -p [password]</p>
</div>

<p>run the seed "yarn seed" command to populate store with products and variants with different image and variants amounts</p>

<p>start the server with "yarn dev" and navigate to a product with many variants and press the save button for the product or the organize widget/contianer</p>
<p>Try to trigger update workflow directly with the custom widget</p>
