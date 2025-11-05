// Typography scale and styles
export const fontSize = {
  h1: 24,
  h2: 20,
  h3: 18,
  body: 16,
  small: 14,
  tiny: 12,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Text styles for consistent typography
export const textStyles = {
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
  },
  body: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
  },
  bodyBold: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
  },
  small: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.regular,
  },
  tiny: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.regular,
  },
};
