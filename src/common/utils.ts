export function kebabToCamelCase(input: string): string {
  return input
    .split('-')
    .map((word: string, index: number) => {
      if (index > 0) {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length);
      }

      return word;
    })
    .join('');
}

export function kebabToPascalCase(input: string): string {
  return input
    .split('-')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.substring(1, word.length);
    })
    .join('');
}
