export const imgData = [
  {
    width: 3200,
    height: 4000,
    url: 'https://public.picdrop.com/t/nhzFR2vQ2PgPWXNZfSIW.jpg',
  },
  {
    width: 2560,
    height: 3200,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PgPWXNZfSIW_3200.jpg',
  },
  {
    width: 1920,
    height: 2400,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PgPWXNZfSIW_2400.jpg',
  },
  {
    width: 1280,
    height: 1600,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PgPWXNZfSIW_1600.jpg',
  },
  {
    width: 960,
    height: 1200,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PgPWXNZfSIW_1200.jpg',
  },
  {
    width: 640,
    height: 800,
    url: 'https://public.picdrop.com/t/nhzFR2vQ2PmADVYiSAU1.jpg',
  },
  {
    width: 480,
    height: 600,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PmADVYiSAU1_600.jpg',
  },
  {
    width: 320,
    height: 400,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PmADVYiSAU1_400.jpg',
  },
  {
    width: 160,
    height: 200,
    url: 'https://public.picdrop.com/preview/t/nhzFR2vQ2PmADVYiSAU1_200.jpg',
  },
]

export const findNearestLargerWidth = (targetWidth: number) => {
  return imgData.sort((a, b) => a.width - b.width).find(image => image.width >= targetWidth)
}
