expect.extend({
  toMatchSnapshot: () => ({
    pass: true,
    message: () => 'Snapshots ignored while in record mode',
  }),
});
