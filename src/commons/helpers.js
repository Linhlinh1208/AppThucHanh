export const getWeatherMeta = (code) => {
  switch (code) {
    case 0:
      return { label: 'Trời quang đãng', icon: 'sun' };
    case 1:
    case 2:
    case 3:
      return { label: 'Có mây rải rác', icon: 'cloud' };
    case 45:
    case 48:
      return { label: 'Sương mù', icon: 'cloud-drizzle' };
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return { label: 'Có mưa', icon: 'cloud-rain' };
    case 80:
    case 81:
    case 82:
      return { label: 'Mưa rào', icon: 'cloud-rain' };
    case 95:
    case 96:
    case 99:
      return { label: 'Giông bão sấm sét', icon: 'cloud-lightning' };
    default:
      return { label: 'Thời tiết ổn định', icon: 'cloud' };
  }
};

export const formatTimeHour = (timeStr) => {
  if (!timeStr) return '';
  return timeStr.split('T')[1]?.slice(0, 5) || timeStr;
};

export const formatDayLabel = (dateStr, index) => {
  if (index === 0) return 'Hôm nay';
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}`;
};