export const getPercentageOff = (orignalPrice, price) => {
  const discount = orignalPrice - price;

  const discountPercentage = (discount / orignalPrice) * 100;

  return Math.floor(discountPercentage);
};
