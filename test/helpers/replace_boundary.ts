import nock from 'nock';

export const replaceBoundaryInMultipartFormDataBody = (
  newBoundary: string,
  body?: nock.RequestBodyMatcher
): string | undefined => {

  if (typeof body !== 'string') {
    return undefined;
  }
  const bodyString = Buffer.from(body, 'hex').toString();

  return bodyString.replace(/^(-*[0-9]+)/gm, newBoundary);
};
