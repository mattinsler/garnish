function applyTransform(itemOrArray, transform) {
  return Array.isArray(itemOrArray)
    ? itemOrArray.map(transform)
    : transform(itemOrArray);
}

export default applyTransform;
