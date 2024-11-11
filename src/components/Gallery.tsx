import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from './Dialog'
import Carousel from './Carousel'
import { cdn } from '../utils'

const data = {
  message: 'Gallery Files',
  data: [
    {
      id: 'PxbbJ7nwCSJ9EwvL',
      name: '_DSF5601 1.jpg',
      format: 'jpg',
      size: 25482571,
      dimension: {
        height: 11238,
        width: 8428,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:17.203Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF5601 1.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF5601 1.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF5601 1.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF5601 1.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF5601 1.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF5601 1.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF5601 1.jpg',
        },
      ],
    },
    {
      id: 'bLyd2QAzNE3Pat9o',
      name: '_DSF6181 1.jpg',
      format: 'jpg',
      size: 4288930,
      dimension: {
        height: 5124,
        width: 3843,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:21.718Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF6181 1.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF6181 1.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF6181 1.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF6181 1.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF6181 1.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF6181 1.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF6181 1.jpg',
        },
      ],
    },
    {
      id: 'csiu8Wk18qhccnjy',
      name: '_DSF6381.jpg',
      format: 'jpg',
      size: 10505613,
      dimension: {
        height: 6888,
        width: 9184,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:28.020Z',
      thumbnails: [
        {
          width: 600,
          height: 450,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x450__DSF6381.jpg',
        },
        {
          width: 800,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x600__DSF6381.jpg',
        },
        {
          width: 1200,
          height: 900,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x900__DSF6381.jpg',
        },
        {
          width: 1600,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1200__DSF6381.jpg',
        },
        {
          width: 2400,
          height: 1800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x1800__DSF6381.jpg',
        },
        {
          width: 3200,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x2400__DSF6381.jpg',
        },
        {
          width: 4000,
          height: 3000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x3000__DSF6381.jpg',
        },
      ],
    },
    {
      id: 'J18dF9juktX5eYZg',
      name: '_DSF6644.jpg',
      format: 'jpg',
      size: 9865185,
      dimension: {
        height: 5458,
        width: 7277,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:34.301Z',
      thumbnails: [
        {
          width: 600,
          height: 450,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x450__DSF6644.jpg',
        },
        {
          width: 800,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x600__DSF6644.jpg',
        },
        {
          width: 1200,
          height: 900,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x900__DSF6644.jpg',
        },
        {
          width: 1600,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1200__DSF6644.jpg',
        },
        {
          width: 2400,
          height: 1800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x1800__DSF6644.jpg',
        },
        {
          width: 3200,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x2400__DSF6644.jpg',
        },
        {
          width: 4000,
          height: 3000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x3000__DSF6644.jpg',
        },
      ],
    },
    {
      id: '9X9zcnCMvZP2Kevq',
      name: '_DSF7942.jpg',
      format: 'jpg',
      size: 15881983,
      dimension: {
        height: 10655,
        width: 7991,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:41.618Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF7942.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF7942.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF7942.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF7942.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF7942.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF7942.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF7942.jpg',
        },
      ],
    },
    {
      id: 'cAMwzh2qLmBTAEZq',
      name: '_DSF8057.jpg',
      format: 'jpg',
      size: 17122443,
      dimension: {
        height: 10844,
        width: 8133,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:49.396Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF8057.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF8057.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF8057.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF8057.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF8057.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF8057.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF8057.jpg',
        },
      ],
    },
    {
      id: 'm74VL6jKHoGu1UXR',
      name: '_DSF8230.jpg',
      format: 'jpg',
      size: 25749223,
      dimension: {
        height: 11648,
        width: 8736,
      },
      is_completed: true,
      created_at: '2024-11-09T21:51:59.290Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF8230.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF8230.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF8230.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF8230.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF8230.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF8230.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF8230.jpg',
        },
      ],
    },
    {
      id: 'VnUrYFbjA8cVY3pK',
      name: '_DSF8442.jpg',
      format: 'jpg',
      size: 22276549,
      dimension: {
        height: 11648,
        width: 8736,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:08.461Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF8442.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF8442.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF8442.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF8442.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF8442.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF8442.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF8442.jpg',
        },
      ],
    },
    {
      id: 'ZshQcE2cUq8ccYWo',
      name: '_DSF8691.jpg',
      format: 'jpg',
      size: 25738559,
      dimension: {
        height: 11648,
        width: 8736,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:20.618Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF8691.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF8691.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF8691.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF8691.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF8691.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF8691.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF8691.jpg',
        },
      ],
    },
    {
      id: 'qCqMTTJLgwJyiqaR',
      name: '_DSF8875.jpg',
      format: 'jpg',
      size: 22063740,
      dimension: {
        height: 9538,
        width: 7153,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:29.705Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600__DSF8875.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800__DSF8875.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200__DSF8875.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600__DSF8875.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400__DSF8875.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200__DSF8875.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000__DSF8875.jpg',
        },
      ],
    },
    {
      id: 'FpWnBYk5Pz2uj1t4',
      name: '2.Before.jpg',
      format: 'jpg',
      size: 3444544,
      dimension: {
        height: 2848,
        width: 3952,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:33.989Z',
      thumbnails: [
        {
          width: 600,
          height: 432,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x432_2.Before.jpg',
        },
        {
          width: 800,
          height: 577,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x577_2.Before.jpg',
        },
        {
          width: 1200,
          height: 865,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x865_2.Before.jpg',
        },
        {
          width: 1600,
          height: 1153,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1153_2.Before.jpg',
        },
        {
          width: 2400,
          height: 1730,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x1730_2.Before.jpg',
        },
        {
          width: 3200,
          height: 2306,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x2306_2.Before.jpg',
        },
      ],
    },
    {
      id: 'qPvoqKAD6FWzxaK8',
      name: '5.After.jpg',
      format: 'jpg',
      size: 2985747,
      dimension: {
        height: 3284,
        width: 2189,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:39.439Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600_5.After.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800_5.After.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200_5.After.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600_5.After.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400_5.After.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200_5.After.jpg',
        },
      ],
    },
    {
      id: 'BTSe2P3HATcP5N46',
      name: 'Freies Shooting_46936.jpg',
      format: 'jpg',
      size: 23792726,
      dimension: {
        height: 11648,
        width: 8736,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:49.186Z',
      thumbnails: [
        {
          width: 600,
          height: 600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x600_Freies Shooting_46936.jpg',
        },
        {
          width: 800,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x800_Freies Shooting_46936.jpg',
        },
        {
          width: 1200,
          height: 1200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x1200_Freies Shooting_46936.jpg',
        },
        {
          width: 1600,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1600_Freies Shooting_46936.jpg',
        },
        {
          width: 2400,
          height: 2400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x2400_Freies Shooting_46936.jpg',
        },
        {
          width: 3200,
          height: 3200,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x3200_Freies Shooting_46936.jpg',
        },
        {
          width: 4000,
          height: 4000,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x4000_Freies Shooting_46936.jpg',
        },
      ],
    },
    {
      id: 'HdA5XnyaKibLN9pM',
      name: 'MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
      format: 'jpeg',
      size: 15311536,
      dimension: {
        height: 3221,
        width: 4832,
      },
      is_completed: true,
      created_at: '2024-11-09T21:52:56.656Z',
      thumbnails: [
        {
          width: 600,
          height: 400,
          url: 'Development/wpRpMvTzUCioj6j5/Images/600x400_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 800,
          height: 533,
          url: 'Development/wpRpMvTzUCioj6j5/Images/800x533_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 1200,
          height: 800,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1200x800_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 1600,
          height: 1067,
          url: 'Development/wpRpMvTzUCioj6j5/Images/1600x1067_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 2400,
          height: 1600,
          url: 'Development/wpRpMvTzUCioj6j5/Images/2400x1600_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 3200,
          height: 2133,
          url: 'Development/wpRpMvTzUCioj6j5/Images/3200x2133_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
        {
          width: 4000,
          height: 2666,
          url: 'Development/wpRpMvTzUCioj6j5/Images/4000x2666_MSFC_20240821_CS2_LVSArollout_UAS14~orig.jpeg',
        },
      ],
    },
  ],
}

export default function Gallery({}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  function onClick(index: number) {
    setOpen(true)
    setIndex(index)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AlertDialog open={open}>
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogContent className="max-w-full p-0 border-0">
          <Carousel images={data.data} index={index} onClose={setOpen} />
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((image, index) => (
          <div key={image.id} className="relative overflow-hidden rounded-lg shadow-md group">
            <img
              src={`${cdn}${image.thumbnails[0].url}`}
              alt="User uploaded"
              width={image.thumbnails[0].width}
              height={image.thumbnails[0].height}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
              onClick={() => onClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
