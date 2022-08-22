const reactColor2Hex = (c: any) => {
  if (c.hex === 'transparent') return c.hex;
  const alpha = c.rgb.a.toFixed(1);
  const finalString = `${c.hex}${
    alpha < 0.01 ? '00' : Math.round(255 * alpha).toString(16)
  }`;
  return { hexCode: finalString, origin: c, alpha };
};

export { reactColor2Hex };
