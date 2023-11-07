import * as Icons from '@consolelabs/icons'

export default {
  title: 'Icons',
}

export function Default() {
  return (
    <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
      {Object.keys(Icons)
        .filter((key) => key.startsWith('Icon'))
        .map((key) => {
          const Component = Icons[
            key as keyof typeof Icons
          ] as React.ComponentType

          return (
            <span className="text-2xl">
              <Component />
            </span>
          )
        })}
    </div>
  )
}

Default.story = {
  name: 'All icons',
}
