interface ItemProps {
  item: any
  onSelect?: (item: any) => void
}

export const ChainItem: React.FC<ItemProps> = ({ item, onSelect }) => {
  const Icon = item.icon

  return (
    <li key={item.id}>
      <button
        className="outline-none flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
        onClick={() => onSelect?.(item)}
      >
        <Icon className="w-6 h-6" />
        <div className="flex flex-col flex-1 items-start">
          <h3 className="text-sm">{item.name}</h3>
        </div>
      </button>
    </li>
  )
}
