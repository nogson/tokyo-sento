export const isOpen = (time: string, holiday: string) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const nowTime = `${hour}:${minute}`;
  const [openTime, closeTime] = time.split(",");
  // 曜日を取得
  const day = now.getDay();
  let isHoliday = false;
  const [offDay] = holiday.split(",");

  // 0: 日曜日, 1: 月曜日, 2: 火曜日, 3: 水曜日, 4: 木曜日, 5: 金曜日, 6: 土曜日
  switch (offDay) {
    case "日曜":
      isHoliday = day === 0;
      break;
    case "月曜":
      isHoliday = day === 1;
      break;
    case "火曜":
      isHoliday = day === 2;
      break;
    case "水曜":
      isHoliday = day === 3;
      break;
    case "木曜":
      isHoliday = day === 4;
      break;
    case "金曜":
      isHoliday = day === 5;
      break;
    case "土曜":
      isHoliday = day === 6;
      break;
  }
  console.log(
    "openTime",
    openTime,
    openTime <= nowTime,
    "closeTime",
    closeTime,
    nowTime <= closeTime
  );
  return openTime <= nowTime && nowTime <= closeTime && !isHoliday;
};
