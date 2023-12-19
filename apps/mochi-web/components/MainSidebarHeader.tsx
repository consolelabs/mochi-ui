import { NativeImage } from './NativeImage'

export const MainSidebarHeader = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <NativeImage
      alt="header"
      className="object-cover h-20 w-[240px]"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  ) : (
    <span />
  )
}
