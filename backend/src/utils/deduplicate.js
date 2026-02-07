export function deduplicate(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = (item.title + item.deadline).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
