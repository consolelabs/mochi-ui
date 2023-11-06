import { ToggleButtonGroup, ToggleButton } from '.'

export default {
  title: 'ui/ToggleButton',
}

export function Default() {
  return (
    <div className="space-y-4">
      <ToggleButtonGroup type="single" defaultValue="1">
        <ToggleButton value="1">$1</ToggleButton>
        <ToggleButton value="2">$2</ToggleButton>
        <ToggleButton value="5" disabled>
          $5
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup type="multiple" defaultValue={['1']}>
        <ToggleButton value="1">$1</ToggleButton>
        <ToggleButton value="2">$2</ToggleButton>
        <ToggleButton value="5" disabled>
          $5
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

Default.story = {
  name: 'default',
}
