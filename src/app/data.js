import { DateTime } from '@grapecity/wijmo';

const productNames = [
  '果汁100%オレンジ',
  '果汁100%グレープ',
  '果汁100%レモン',
  '果汁100%ピーチ',
  'コーヒーマイルド',
  'コーヒービター',
  'コーヒーミルク',
  'ピリピリビール',
  'オタル白ラベル',
  'バードワイン',
];
function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomDate() {
  const date = new Date(new Date().getFullYear() - 5, 3, 1);
  return DateTime.addDays(date, random(365 * 5));
}
export function getData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      No: i,
      商品名: productNames[random(productNames.length)],
      受注日: randomDate(),
      金額: random(99, 1) * 100,
      値引: random(3) == 0,
      //added to show in grid's added columns
      value: random(3),
      cnt: random(99)
    });
  }
  return data;
}
