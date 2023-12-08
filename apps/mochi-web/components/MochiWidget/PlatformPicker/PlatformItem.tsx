import { Typography } from '@mochi-ui/core'
import { Platform } from './type'
import PlatformIcon from './PlatformIcon'

interface ItemProps {
  item: Platform
  onSelect?: (item: Platform) => void
}

export const PlatformItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full min-w-[230px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    role="presentation"
    onClick={() => onSelect?.(item)}
  >
    <PlatformIcon platform={item.platform} className="w-6 h-6" />
    <div className="flex flex-col flex-1">
      <Typography level="h8" className="capitalize">
        {item.platform}
      </Typography>
    </div>
  </li>
)
