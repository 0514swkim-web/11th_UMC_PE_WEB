// 주소의 ?page= 값을 1 이상의 정수로 바꿈 (없거나 이상하면 1)
export function parsePage(value: string | string[] | undefined) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
