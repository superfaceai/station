function CreateCustomer({ input, parameters, services }) {
  const createCustomerResult = createCustomer(input, services, parameters);

  return createCustomerResult;
}

function createCustomer(input, services, parameters) {
  const url = `${services.default}/admin/api/${parameters.api_version}/customers.json`;
  const options = {
    method: 'POST',
    body: input.customer,
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status !== 201) {
    throw new std.unstable.MapError({
      errors: [
        {
          message: 'Failed to create customer',
          code: response.status.toString(),
        },
      ],
    });
  }

  const result = {
    customer: {
      id: body.customer?.id,
      email: body.customer?.email,
      accepts_marketing: body.customer?.accepts_marketing,
      created_at: body.customer?.created_at,
      updated_at: body.customer?.updated_at,
      first_name: body.customer?.first_name,
      last_name: body.customer?.last_name,
      orders_count: body.customer?.orders_count,
      state: body.customer?.state,
      total_spent: body.customer?.total_spent,
      last_order_id: body.customer?.last_order_id,
      note: body.customer?.note,
      verified_email: body.customer?.verified_email,
      multipass_identifier: body.customer?.multipass_identifier,
      tax_exempt: body.customer?.tax_exempt,
      tags: body.customer?.tags,
      last_order_name: body.customer?.last_order_name,
      currency: body.customer?.currency,
      phone: body.customer?.phone,
      addresses: body.customer?.addresses,
      accepts_marketing_updated_at: body.customer?.accepts_marketing_updated_at,
      marketing_opt_in_level: body.customer?.marketing_opt_in_level,
      tax_exemptions: body.customer?.tax_exemptions,
      email_marketing_consent: body.customer?.email_marketing_consent,
      sms_marketing_consent: body.customer?.sms_marketing_consent,
      admin_graphql_api_id: body.customer?.admin_graphql_api_id,
      default_address: body.customer?.default_address,
    },
  };

  return result;
}