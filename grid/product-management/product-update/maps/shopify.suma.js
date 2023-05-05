function UpdateProduct({ input, parameters, services }) {
  const updateProductResult = updateProduct(input, services, parameters);

  return updateProductResult;
}

function updateProduct(input, services, parameters) {
  const url = `${services.default}/admin/api/${parameters.api_version}/products/${input.product.id}.json`;
  const options = {
    method: 'PUT',
    body: {
      product: input.product,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status !== 200) {
    throw new std.unstable.MapError({
      code: response.status,
      message: 'HTTP call failed',
    });
  }

  const result = {
    product: body.product,
  };

  return result;
}