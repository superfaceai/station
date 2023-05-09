function UpdateProduct({ input, parameters, services }) {
  const url = `${services.default}/admin/api/2023-04/products/${input.product.id}.json`;
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
      errors: [
        {
          code: response.status.toString(),
          message: 'HTTP call failed',
        },
      ],
    });
  }

  const result = {
    product: body.product,
  };

  return result;
}